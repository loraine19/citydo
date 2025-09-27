import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useEffect, useState } from 'react';
import { ProfileForm } from '../auth/auth.Comps/ProfileForm';
import { ProfileDTO, } from '../../../../domain/entities/Profile';
import DI from '../../../../di/ioc';
import { useUserStore } from '../../../../application/stores/user.store';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { CardConfirmForm } from '../../common/CardConfirmForm';

export default function MyInfosPage() {
    const { setUser, user } = useUserStore()

    const { Profile, user: userUpdated } = DI.resolve('meViewModel')();
    const [assistance, setAssistance] = useState<string | undefined>(Profile?.assistance)
    const [mailSub, setMailSub] = useState<string | undefined>(Profile?.mailSub)
    const [address, setAddress] = useState<AddressDTO>(Profile?.Address)
    const updateProfile = async (data: ProfileDTO, Address: AddressDTO) => await DI.resolve('updateProfileUseCase').execute(data, Address)


    const formSchema = object({
        firstName: string().required("Le prémon est obligatoire").min(2, "minmum 2 lettres"),
        lastName: string().required("Le Nom est obligatoire").min(2, "minmum 2 lettres"),
        phone: string().required("Le Numéro est obligatoire").min(10, "minmum 2 caractères").max(14, "maxmum 14 caractères").matches(/^\+33/, "Le Numéro doit commencer par +33"),
        Address: object({ city: string().required("Ville est obligatoire"), zipcode: string().required("Code postal est obligatoire") }),
        mailSub: string()
    })

    const { setOpen, setAlertValues, handleApiError } = useAlertStore(state => state)
    useEffect(() => {
        if ((new Date(Profile?.updatedAt).getTime()) > (new Date(user?.Profile?.updatedAt).getTime())) {
            setUser({ ...user, Profile: Profile })

        }
    }, [userUpdated])

    const updateFunction = async () => {
        const { blob, ...rest } = formik.values;
        const updateData = new ProfileDTO({ assistance, ...rest })

        try {
            const updated = await updateProfile(updateData, address)

            setOpen(false);
            setUser({ ...user, Profile: updated });
            window.location.replace("/")
        } catch (error) {
            console.error(error)
            handleApiError(error ?? 'Erreur lors de la mise à jour du profil')
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: Profile as any,
        validationSchema: formSchema,
        onSubmit: async values => {
            values.assistance = assistance;
            values.mailSub = mailSub;
            setOpen(true)
            setAlertValues({
                close: () => setOpen(false),
                handleConfirm: async () => await updateFunction(),
                disableConfirm: false,
                confirmString: "Enregistrer les modifications",
                title: "Confimrer la modification : ",
                element: (
                    <CardConfirmForm
                        title={undefined}
                        content={<div>
                            Vous confirmez la modification de votre profil ?
                        </div>} />
                )
            })
        }
    })



    useEffect(() => { if (address) formik.values.Address = address }, [address])

    return (
        <>


            <ProfileForm
                formik={formik}
                setAssistance={setAssistance}
                setAddress={setAddress}
                setMailSub={setMailSub}
            />
        </ >
    )
}