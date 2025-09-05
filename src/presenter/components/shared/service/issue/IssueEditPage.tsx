import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { ServiceType } from '../../../../../domain/entities/Service';
import { ModalValues } from '../../../../../domain/entities/frontEntities';
import { ConfirmModal } from '../../../common/ConfirmModal';
import SubHeader from '../../../common/SubHeader';
import { IssueForm } from './IssueDetailCard';
import { useUserStore } from '../../../../../application/stores/user.store';
import { Skeleton } from '../../../common/Skeleton';
import { IssueView } from '../../../../views/viewsEntities/issueViewEntity';
import DI from '../../../../../di/ioc';
import { IssueDTO } from '../../../../../infrastructure/DTOs/IssueDTO';
import { Button } from '@material-tailwind/react';
import { Icon } from '../../../common/IconComp';

export default function IssueEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUserStore()
    const userId = user.id

    const [open, setOpen] = useState(false);
    const idS = id ? parseInt(id) : 0;
    const issueIdViewModelFactory = DI.resolve('issueIdViewModel')
    const { issue, isLoading, error } = issueIdViewModelFactory(idS);
    const updateIssue = async (id: number, data: IssueDTO) => await DI.resolve('updateIssueUseCase').execute(id, data)


    const redirectModal: ModalValues = {
        confirm: async () => { navigate(`/conciliation/${id}`); setOpen(false) },
        title: "Confirmer la redirection",
        element: "ce litige existe deja, Vous allez être redirigé vers la page de conciliation"
    }
    // const redirectServiceModal: ModalValues = {
    //     confirm: async () => { navigate(`/service/${id}`); setOpen(false) },
    //     title: "Confirmer la redirection",
    //     element: "Il n'y a aucun modérateur disponible pour le moment, Vous allez être redirigé vers la page de service"
    // }
    const [ModalValues, setModalValues] = useState<ModalValues>(redirectModal)



    const formSchema = object({
        description: string().required("Description est obligatoire"),
        date: string().required("Date est obligatoire"),
        userIdModo: string()
    })

    const formik = useFormik({
        initialValues: issue as IssueView,
        validationSchema: formSchema,
        onSubmit: values => {
            setModalValues(confirmPost)
            setOpen(true)
            formik.values = values
        }
    })

    const updateFunction = async () => {
        formik.values.date = new Date(formik.values.date).toISOString()
        const { ...rest } = formik.values;
        const data = new IssueDTO({ ...rest })
        return await updateIssue(idS, data)
    }

    const confirmPost: { confirm: () => Promise<void>, title: string, element: string } = {
        confirm: async () => {
            const ok = await updateFunction()
            if (ok) { navigate(`/conciliation/${ok.serviceId}`); setOpen(false) }
        }
        , title: "Confirmer la demande de conciliation",
        element: (JSON.stringify(formik.values, null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")
    }



    return (

        <form onSubmit={formik.handleSubmit} className='flex h-full flex-col'>
            <main>
                <ConfirmModal
                    open={open}
                    handleCancel={() => { setOpen(false) }}
                    handleConfirm={ModalValues.confirm}
                    title={ModalValues.title}
                    element={ModalValues.element} />

                <div className="px-4 sectionHeader">
                    <SubHeader
                        type={"Conciliation"}
                        place={` sur ${issue?.Service?.type === ServiceType.GET ? "une demande" : "une offre"} de service  ${userId === issue?.Service?.userId ? "que j'ai créé" : "à laquelle j'ai repondu"}`}
                        closeBtn />
                </div>
                {isLoading || error ?
                    <Skeleton className="w-respLarge !rounded-3xl !h-[calc(100vh-16rem)] shadow m-auto" /> :
                    <IssueForm
                        modos={[]}
                        issue={issue}
                        formik={formik} />}
            </main>
            <footer className="CTA">
                <Button
                    type="submit"
                    disabled={issue?.status > 1}
                    className="lgBtn" >
                    <Icon
                        size='xl'
                        color="white"
                        icon="edit" />
                    Mettre à jour la concialtion
                </Button>
            </footer>
        </form>
    )
}

