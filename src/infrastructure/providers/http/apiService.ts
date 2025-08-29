import axios, { AxiosInstance } from "axios";
//import { AuthService } from "../../services/authService";

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_FETCH_URL : import.meta.env.VITE_FETCH_URL_DEV;

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
    private countRefresh: number = 0;
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({ baseURL, withCredentials: true });
        this.api.interceptors.request.use(this.handleRequest);
        this.api.interceptors.response.use(
            response => this.handleResponse(response),
            error => this.handleResponseError(error)
        );
    }
    getBaseUrl = () => baseURL;

    private logWithTime = (message: string) => {
        const now = new Date().toLocaleTimeString();
        const milliseconds = new Date().getMilliseconds();
        console.error(`[${now}+${milliseconds}] ${message}`);
    };

    private requestPending: { config: any, status: boolean, inError: boolean, error: ApiError, count: number } = {
        config: {},
        status: false,
        inError: false,
        error: new ApiError(0, ''),
        count: 0
    }

    private handleRequest = (config: any) => {
        document.cookie = "user=; path=/; max-age=0";
        this.logWithTime('handleRequest: ')
        console.log("Request config:", config);
        if (config.url !== '/auth/refresh') {
            this.requestPending = {
                config: config,
                status: true,
                inError: false,
                error: new ApiError(0, ''),
                count: this.requestPending.count + 1
            }
        }
        return config
    }

    private handleResponse = async (response: any): Promise<any> => {
        if (response && response.data) {
            this.requestPending.status = false;
            this.requestPending.inError = false;
            this.requestPending.error = new ApiError(0, '');
            this.requestPending.config = {};
        }
        return response
    }

    private handleResponseError = async (error: any) => {
        if (this.requestPending.status) {
            this.requestPending.status = true;
            this.requestPending.inError = true;
        }
        const originalRequest = error.config || {};
        originalRequest._retry = originalRequest._retry || false;
        console.log('IS API ERROR??? ', error.response ?? typeof error)
        const status = error.status || error.response?.status || error.response?.data?.statuscode || 500
        let message = error.response?.data?.message || error.message || ''
        if (message.includes('msg')) message = message.split('msg:')[1] || ''
        if (message.includes('PRISMA ERROR')) message = ''
        let newError = new ApiError(status, error);
        switch (status) {
            case 401:
                this.logWithTime('token expired 401');
                this.countRefresh++;
                const refreshSuccess = await this.refreshAccess();
                if (refreshSuccess) {
                    this.logWithTime('token refreshed successfully');
                    return refreshSuccess
                }
                else newError = new ApiError(status, 'Session expirée');
                break;
        }
        if (newError.message) {
            switch (status) {
                case 400:
                    newError = new ApiError(status, message || 'mauvaise requête');
                    break;
                case 403:
                    newError = new ApiError(status, message || 'Accès interdit');
                    break;
                case 404:
                    newError = new ApiError(status, message || 'Ressource non trouvée');
                    break;
                case 409:
                    newError = new ApiError(status, message || 'Conflit de ressources');
                    break;
                case 500:
                    newError = new ApiError(status, message || 'Erreur interne du serveur');
                    break;
            }
        }

        if (
            this.requestPending.count < 1 &&
            this.requestPending.config &&
            this.requestPending.config.method !== 'get'
        ) {
            // Set request as pending and retry the request
            this.requestPending.status = true;
            this.requestPending.error = newError;
            this.requestPending.inError = false;
            this.requestPending.count = this.requestPending.count + 1;
            // Retry the original request
            console.error('RETRY', this.requestPending.config,
                'count:', this.requestPending.count);
            return this.api.request(this.requestPending.config);
        }
        throw new Error(newError.message);
        //  else return Promise.reject(newError);

    };

    //// REFRESH ACCESS
    refreshAccess = async (): Promise<boolean | any> => {
        const echec = () => {
            this.logWithTime('refreshAccess echec');
            if (this.countRefresh > 2) {
                setTimeout(() => {
                    //   window.location.href = `/signin?msg=Session expirée, veuillez vous reconnecter ${this.countRefresh}`;
                    this.countRefresh++
                    return false
                }, 5000);
            }

        }
        if (window.location.pathname.includes('/sign')) return echec();
        if (this.countRefresh > 2) return echec();
        if (this.countRefresh > 1) {
            this.logWithTime('refreshAccess already called, countRefresh: ' + this.countRefresh);
            return false;
        }
        const { data } = await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
        if (data?.message || data?.status === 201) {
            this.countRefresh = 0;
            this.logWithTime('refreshAccess message: ' + data.message);
            return true;
        }
        else if (data?.status === 401) return echec();
    }

    public async get(url: string): Promise<any> {
        try {
            const response = await this.api.get(url, { withCredentials: true });
            this.handleResponse(response)
            return response.data;
        } catch (error) {
            return this.handleResponseError(error);
        }
    }

    public async delete(url: string): Promise<any> {
        try {
            const response = await this.api.delete(url, { withCredentials: true });
            this.handleResponse(response)
            return response.data;
        } catch (error) {
            return this.handleResponseError(error);
        }
    }

    public async put(url: string, data?: any): Promise<any> {
        try {
            const response = await this.api.put(url, data, { withCredentials: true });
            this.handleResponse(response)
            return response.data;
        } catch (error) {
            return this.handleResponseError(error);
        }
    }

    public async post(url: string, data: any, config?: any): Promise<any> {
        try {
            const response = await this.api.post(url, data, { ...config, withCredentials: true });
            this.handleResponse(response)
            return response.data;
        } catch (error) {
            return this.handleResponseError(error);
        }
    }

    public async patch(url: string, data: any, config?: any): Promise<any> {
        try {
            const response = await this.api.patch(url, data, { ...config, withCredentials: true });
            this.handleResponse(response)
            return response.data;
        } catch (error) {
            return this.handleResponseError(error);
        }
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
