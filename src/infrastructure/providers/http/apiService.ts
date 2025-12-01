import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

// Configuration URL
const baseURL = import.meta.env.PROD ? import.meta.env.VITE_FETCH_URL : import.meta.env.VITE_FETCH_URL_DEV;

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

class ApiError extends Error {
    constructor(public status: number | string, message: string) {
        super(message);
        this.status = status;
    }
}

export type ApiServiceI = {
    get(url: string): Promise<any>;
    delete(url: string): Promise<any>;
    put(url: string, data?: any): Promise<any>;
    post(url: string, data?: any, config?: any): Promise<any>;
    patch(url: string, data?: any, config?: any): Promise<any>;
    createFormData(element: any): FormData;
    getBaseUrl(): string;
}

export class ApiService implements ApiServiceI {
    private api: AxiosInstance;

    // Gestion de la concurrence (Queue)
    private isRefreshing = false;
    private failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: any) => void }> = [];

    constructor() {
        this.api = axios.create({ baseURL, withCredentials: true });

        this.api.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => this.handleResponseError(error)
        );
    }

    getBaseUrl = () => baseURL;

    // --- LOGIQUE DE FILE D'ATTENTE ---
    private processQueue = (error: any, tokenRefreshed: boolean = false) => {
        this.failedQueue.forEach((prom) => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(tokenRefreshed);
            }
        });
        this.failedQueue = [];
    };

    // --- GESTIONNAIRE D'ERREURS CENTRALISÉ ---
    private handleResponseError = async (error: any) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;
        const status = error.response?.status || 500;

        // 1. Nettoyage du message (Logique originale restaurée)
        let message = error.response?.data?.message || error.message || '';
        if (typeof message === 'string') {
            if (message.includes('msg:')) message = message.split('msg:')[1];
            if (message.includes('PRISMA ERROR')) message = ''; // Masquer les erreurs techniques DB
        }

        // 2. GESTION TOKEN EXPIRÉ (401)
        if (status === 401 && originalRequest && !originalRequest._retry && originalRequest.url !== '/auth/refresh') {

            if (this.isRefreshing) {
                // Mise en file d'attente
                return new Promise((resolve, reject) => {
                    this.failedQueue.push({ resolve, reject });
                }).then(() => {
                    return this.api(originalRequest);
                }).catch((err) => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            this.isRefreshing = true;

            try {
                const refreshed = await this.refreshAccess();
                if (refreshed) {
                    this.processQueue(null, true);
                    return this.api(originalRequest);
                } else {
                    // Échec refresh -> Erreur de session
                    throw new ApiError(401, 'Session expirée');
                }
            } catch (refreshError) {
                this.processQueue(refreshError, false);
                // On transforme l'erreur de refresh en ApiError propre
                return Promise.reject(new ApiError(401, 'Impossible de rafraîchir la session'));
            } finally {
                this.isRefreshing = false;
            }
        }

        // 3. GESTION DES AUTRES ERREURS (Switch case restauré)
        let customMessage = message;

        // Si le backend n'a pas renvoyé de message précis, on met des défauts
        if (!customMessage || customMessage.trim() === '') {
            switch (status) {
                case 400: customMessage = 'Mauvaise requête'; break;
                case 401: customMessage = 'Non autorisé'; break; // Cas hors refresh
                case 403: customMessage = 'Accès interdit'; break;
                case 404: customMessage = 'Ressource non trouvée'; break;
                case 409: customMessage = 'Conflit de ressources'; break;
                case 500: customMessage = 'Erreur interne du serveur'; break;
                default: customMessage = 'Une erreur est survenue';
            }
        }

        const finalError = new ApiError(status, customMessage);
        return Promise.reject(finalError);
    };

    // --- REFRESH ---
    refreshAccess = async (): Promise<boolean> => {
        try {
            const response = await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
            // Vérification souple (200 ou 201)
            if (response.status >= 200 && response.status < 300) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    // --- MÉTHODES PUBLIQUES ---
    public async get(url: string): Promise<any> {
        const response = await this.api.get(url);
        return response.data;
    }

    public async post(url: string, data: any, config?: any): Promise<any> {
        const response = await this.api.post(url, data, config);
        return response.data;
    }

    public async put(url: string, data?: any): Promise<any> {
        const response = await this.api.put(url, data);
        return response.data;
    }

    public async patch(url: string, data?: any, config?: any): Promise<any> {
        const response = await this.api.patch(url, data, config);
        return response.data;
    }

    public async delete(url: string): Promise<any> {
        const response = await this.api.delete(url);
        return response.data;
    }

    public createFormData = (element: any): FormData => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(element)) {
            if (value instanceof File) {
                formData.append(key, value);
            } else if (value !== undefined && value !== null) {
                (typeof value === 'object') ?
                    formData.append(key, JSON.stringify(value))
                    : formData.append(key, value.toString());
            }
        }
        return formData;
    };
}