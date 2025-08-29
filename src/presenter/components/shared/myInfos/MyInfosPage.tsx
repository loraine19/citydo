import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthHeader } from '../auth/auth.Comps/AuthHeader';
import { ProfileForm } from '../auth/auth.Comps/ProfileForm';
import { ProfileDTO, } from '../../../../domain/entities/Profile';
import DI from '../../../../di/ioc';
import { useUserStore } from '../../../../application/stores/user.store';
import { Skeleton } from '../../common/Skeleton';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';
import { LogOutButton } from '../../common/LogOutBtn';
import { Icon } from '../../common/IconComp';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { ProfileDiv } from '../../common/ProfilDiv';

export default function MyInfosPage() {
    const { setUser, user } = useUserStore()

    const { Profile, isLoading, error, user: userUpdated, refetch } = DI.resolve('meViewModel')();
    const navigate = useNavigate();
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
        const updated = await updateProfile(updateData, address)
        try {
            navigate("/");
            setOpen(false)
            setUser({ ...user, Profile: updated })
            refetch()
        } catch (error) {
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
            const image = values.blob ?? values.image
            setOpen(true)
            setAlertValues({
                close: () => setOpen(false),
                handleConfirm: async () => await updateFunction(),
                disableConfirm: false,
                confirmString: "Enregistrer les modifications",
                title: "Confimrer la modification : ",
                element: (
                    <div className='flex flex-col gap-8 max-h-[80vh] bg-gray-100 rounded-2xl p-5'>
                        <ProfileDiv
                            profile={{ ...user, Profile: { ...values, image } }}
                        />
                    </div>
                )
            })
        }
    })



    useEffect(() => { if (address) formik.values.Address = address }, [address])

    return (
        <>
            <header className="w-respLarge relative flex-col flex justify-between pt-2">
                <div className="flex absolute justify-between items-center top-4 z-50 w-full pr-4">
                    <LogOutButton />
                    <Icon
                        bg clear
                        fill
                        size='3xl'
                        icon='cancel'
                        title='fermer'
                        link='/' />

                </div>
                <AuthHeader />
            </header>
            {!Profile || isLoading || error ?
                <main><Skeleton /></main> :
                <ProfileForm
                    formik={formik}
                    setAssistance={setAssistance}
                    setAddress={setAddress}
                    setMailSub={setMailSub}
                />}
        </ >
    )
}