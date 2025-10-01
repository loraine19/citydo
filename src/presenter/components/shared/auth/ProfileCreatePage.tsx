import { useFormik } from 'formik';
import { array, object, string } from 'yup';
import { useState } from 'react';
import { ProfileForm } from '../auth/auth.Comps/ProfileForm';
import { ProfileDTO, } from '../../../../domain/entities/Profile';
import DI from '../../../../di/ioc';
import { useUserStore } from '../../../../application/stores/user.store';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { CardConfirmForm } from '../../common/CardConfirmForm';
import { GroupUser } from '../../../../domain/entities/GroupUser';
import { Group } from '../../../../domain/entities/Group';
import { GroupView } from '../../../views/viewsEntities/GroupViewEntity';
import { Skeleton } from '../../common/Skeleton';

export default function ProfileCreatePage() {
    const { setUser, user } = useUserStore()
    const Profile = {} as ProfileDTO
    const [assistance, setAssistance] = useState<string | undefined>(Profile?.assistance)
    const [mailSub, setMailSub] = useState<string | undefined>(Profile?.mailSub)
    const updateProfile = async (data: ProfileDTO, Address: AddressDTO) => await DI.resolve('updateProfileUseCase').execute(data, Address)

    const { groups, error, isLoading } = DI.resolve('groupViewModel')();

    const [initialValues] = useState<ProfileDTO & { Address?: AddressDTO } & { groups: any[] }>({
        groups: [] as any[],
        ...Profile,
        Address: {} as any
    })



    const formSchema = object({
        firstName: string().required("Le prémon est obligatoire").min(2, "minmum 2 lettres"),
        lastName: string().required("Le Nom est obligatoire").min(2, "minmum 2 lettres"),
        phone: string().required("Le Numéro est obligatoire").min(10, "minmum 2 caractères").max(14, "maxmum 14 caractères").matches(/^\+33/, "Le Numéro doit commencer par +33"),
        Address: object({ city: string().required("Ville est obligatoire"), zipcode: string().required("Code postal est obligatoire") }),
        mailSub: string(),
        assistance: string(),
        groups: array().required("1 groupe est obligatoire").min(1, "minmum 1 groupe"),
    })

    const { setOpen, setAlertValues, handleApiError } = useAlertStore(state => state)


    const updateFunction = async () => {
        const { ...rest } = formik.values;
        const updateData = new ProfileDTO({ assistance, ...rest })
        const updatedGroups: GroupUser[] =
            formik.values.groups.map((gId: string) => {
                return { groupId: parseInt(gId), userId: user?.id, Group: groups?.find((gr: Group) => gr.id === parseInt(gId)) as Group } as GroupUser
            })

        try {

            if (updatedGroups !== user?.GroupUser) {
                alert('Mise à jour des groupes en cours ...')
                updatedGroups.map(async g => {
                    if (!user?.GroupUser?.find(ug => ug.groupId === g.groupId)) {
                        const groupview = new GroupView(g.Group, user.id)
                        try { await groupview.toogleMember() }
                        catch (error) { handleApiError(error ?? 'Erreur lors de l\'ajout du groupe') }
                    }
                })
                user?.GroupUser?.map(async ug => {
                    if (!updatedGroups.find(ugr => ugr.groupId === ug.groupId)) {
                        const groupview = new GroupView(ug.Group, user.id)
                        try { await groupview.toogleMember() }
                        catch (error) { handleApiError(error ?? 'Erreur lors de la suppression du groupe') }
                    }
                })
            }
            const updated = await updateProfile(updateData, formik.values.Address as AddressDTO)
            setOpen(false);
            setUser({ ...user, GroupUser: updatedGroups, Profile: updated });
            window.location.replace("/")
        } catch (error) {
            console.error(error)
            handleApiError(error ?? 'Erreur lors de la mise à jour du profil')
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues as ProfileDTO & { Address?: AddressDTO } & { groups: any[] },
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


    return (
        <>

            {(!error && !isLoading && formik.values?.Address && formik.values?.groups && groups) ?
                <ProfileForm
                    groups={groups}
                    formik={formik}
                    setAssistance={setAssistance}
                    setMailSub={setMailSub}
                /> :
                <Skeleton />
            }
        </ >
    )
}