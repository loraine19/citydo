export class Error {
    message?: string;
    code?: number;

    constructor(data?: any) {
        this.message = data?.message || 'erreur inconnue';
        this.code = data?.code || 500;
    }
}

export class
    AlertValues {
    handleConfirm: () => void = () => { };
    title: string = 'Une erreur est survenue';
    element: string | Element | React.ReactNode = ''
    disableConfirm?: boolean = false;
    disableCancel?: boolean = false;
    confirmString?: string = 'Ok';
    button2?: { text: string, onClick: () => void } = undefined;
    isOpen?: boolean = false;
    close?: () => void = () => { };
    notif?: string = '';

    constructor(init?: Partial<AlertValues> | any) {
        this.element = init?.message || init?.element || '';
        this.notif = init?.error || init?.error?.message || init?.notif || '';
        if (init) {
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof AlertValues];
                }
            })
        }
    }
}