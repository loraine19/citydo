import { create } from 'zustand';
import { AlertValues } from '../../domain/entities/Error';

interface alertStore {
    open: boolean;
    setOpen: (open: boolean) => void;
    alertValues: AlertValues;
    setAlertValues: (alertValues: Partial<AlertValues>) => void;
    handleApiError: (error: any, returnFunction?: () => void) => void;
    handleError: (error: any, returnFunction?: () => void) => void;
    reset: () => void;
}


export const useAlertStore = create<alertStore>((set) => {
    return {
        open: false,
        setOpen: (open: boolean) => set({ open: open }),
        alertValues: new AlertValues(),
        setAlertValues: (newAlertValues: Partial<AlertValues>) => set((state) => ({
            alertValues: { ...state.alertValues, ...newAlertValues }
        })),
        handleApiError: (error: any, returnFunction?: () => void) => {
            set({
                open: true,
                alertValues: new AlertValues({
                    title: 'Cette action n\'a pas pu être effectuée',
                    element: error?.message as string ?? 'Une erreur est survenue, veuillez réessayer plus tard.',
                    disableConfirm: false,
                    confirmString: 'Ok',
                    handleConfirm: () => {
                        set({ open: false })
                        returnFunction && returnFunction()
                    }
                })
            })
        },
        handleError: (error: any) => {
            if (error instanceof Error) {
                set({
                    open: true,
                    alertValues: new AlertValues({
                        title: 'Erreur',
                        element: error.message ?? 'Une erreur est survenue, veuillez réessayer plus tard.',
                        disableConfirm: false,
                        confirmString: 'Ok',
                        handleConfirm: () => set({ open: false })
                    })
                });

                throw new Error(error.message ?? 'Une erreur est survenue, veuillez réessayer plus tard.')
            }
            else throw new Error('test error')

        },
        reset: () => {
            set({ alertValues: new AlertValues() });
        }
    };
});
