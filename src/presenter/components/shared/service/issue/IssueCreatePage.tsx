import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Issue } from '../../../../../domain/entities/Issue';
import { ServiceType } from '../../../../../domain/entities/Service';
import SubHeader from '../../../common/appComps/SubHeader';
import { IssueForm } from './IssueDetailCard';
import { useUserStore } from '../../../../../application/stores/user.store';
import { Skeleton } from '../../../common/Skeleton';
import { Button, Typography } from '@material-tailwind/react';
import { IssueView } from '../../../../views/viewsEntities/issueViewEntity';
import DI from '../../../../../di/ioc';
import { IssueDTO } from '../../../../../infrastructure/DTOs/IssueDTO';
import { User } from '../../../../../domain/entities/User';
import { Icon } from '../../../common/IconComp';
import { useAlertStore } from '../../../../../application/stores/alert.store';
import IssueCard from './IssueCard';



export default function IssueEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUserStore()
    const userId = user.id
    const [issue, setIssue] = useState<Issue>({} as Issue);
    const idS = id ? parseInt(id) : 0;
    const serviceIdViewModelFactory = DI.resolve('serviceIdViewModel');
    const { service, isLoading } = serviceIdViewModelFactory(idS);
    const postIssue = async (data: IssueDTO) => await DI.resolve('postIssueUseCase').execute(data)
    const getModos = async () => await DI.resolve('getUsersModosUseCase').execute()
    const [modos, setModos] = useState<User[]>([])
    const { handleApiError, setAlertValues, setOpen } = useAlertStore(state => state)

    useEffect(() => {
        if (modos.length === 0) {
            const fetchModos = async () => {
                const modos = await getModos()
                setModos([...modos])
                /// TODO mettre à jour modi par groupId de service 
            }; fetchModos()
        }
    }, [issue]);




    const formSchema = object({
        description: string().required("Description est obligatoire"),
        date: string().required("Date est obligatoire"),
        userIdModo: string()
    })

    const formik = useFormik({
        initialValues: issue as any,
        validationSchema: formSchema,
        onSubmit: values => {
            setOpen(true)
            setIssue(values)
            setOpen(true)
            setAlertValues({
                handleConfirm: async () => await postFunction(),
                confirmString: "Enregistrer les modifications",
                title: "Confimrer la modification",
                element: (
                    <div className='flex flex-col gap-8 max-h-[80vh] bg-gray-100 rounded-3xl p-5'>
                        <Typography variant='h6'>
                            litige
                        </Typography>
                        <IssueCard
                            issue={new IssueView({ ...formik.values, image: formik.values?.blob || formik.values?.image }, 0)}
                            change={() => { }}
                        />
                    </div>
                )
            })
        }
    })

    const postFunction = async () => {
        formik.values.date = new Date(formik.values.date).toISOString()
        formik.values.serviceId = typeof service.id === 'string' ? parseInt(service.id) : service.id
        const dto = new IssueDTO({ ...formik.values })
        try {
            const data = await postIssue(dto)
            if (data) {
                setOpen(false);
                navigate(`/conciliation/${data?.id}`);
            }
            else handleApiError("Erreur lors de la création du litige");
        } catch (error) {
            handleApiError(error ?? "Erreur lors de la création du litige");
        }

    }





    return (
        <form onSubmit={formik.handleSubmit} className='flex h-full flex-col'>
            <main>
                <div className="sectionHeader">
                    <SubHeader type={"Conciliation"} place={` sur ${service?.type === ServiceType.GET ? "une demande" : "une offre"} de service  ${userId === service?.userId ? "que j'ai créé" : "à laquelle j'ai repondu"}`} closeBtn />
                </div>
                {isLoading ?
                    <Skeleton className="w-respLarge !rounded-3xl !h-[calc(100vh-16rem)] shadow m-auto" /> :
                    <IssueForm
                        modos={modos}
                        issue={issue as IssueView}
                        service={service}
                        formik={formik} />}
            </main>
            <footer className="CTA">
                <Button
                    type="submit"
                    className="lgBtn" >
                    <Icon
                        size='xl'
                        color="white"
                        icon="add" />
                    Enregistrer la demande d'aide
                </Button>
            </footer>
        </form>


    )
}

