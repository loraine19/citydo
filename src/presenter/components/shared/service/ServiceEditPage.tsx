import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ServiceForm } from './serviceCards/ServiceForm';
import DI from '../../../../di/ioc';
import { ServiceDTO } from '../../../../infrastructure/DTOs/ServiceDTO';
import { Skeleton } from '../../common/Skeleton';
import { ServiceView } from '../../../views/viewsEntities/serviceViewEntity';
import { useUserStore } from '../../../../application/stores/user.store';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { CardConfirmForm } from '../../common/CardConfirmForm';
import { ServiceCategory } from '../../../../domain/entities/Service';

export default function ServiceEditPage() {
    const { id } = useParams()
    const idS = id ? parseInt(id) : 0;

    /// VIEW MODEL
    const serviceIdViewModelFactory = DI.resolve('serviceIdViewModel');
    const { service, isLoading, error, refetch } = serviceIdViewModelFactory(idS);
    const [initialValues, setInitialValues] = useState<ServiceView>({} as ServiceView);
    const updateService = async (id: number, data: ServiceDTO) => await DI.resolve('updateServiceUseCase').execute(id, data)

    //// STORES
    const { user } = useUserStore(state => state)
    const { setAlertValues, setOpen, handleApiError } = useAlertStore(state => state)

    //// FORMIK
    const navigate = useNavigate();
    const formSchema = object({
        category: string().required("Obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        skill: string().required("obligatoire").notOneOf(["0"], "obligatoire"),
        hard: string().required("obligatoire").notOneOf(["0"], "obligatoire"),
        groupId: string().required("obligatoire").notOneOf(["0"], "obligatoire"),
    })

    useEffect(() => {
        setInitialValues(service)
        if (!isLoading && service?.userId && user?.id && service.userId !== user.id)
            throw new Error(`"Vous n'avez pas le droit de modifier ce service (${service.id} ${service.userId, user.id})"`);
    }, [isLoading]);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues as any,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
            setAlertValues({
                disableConfirm: false,
                handleConfirm: async () => await postFunction(),
                confirmString: "Enregistrer ",
                title: "Confimrer la modification",
                element: (
                    <CardConfirmForm
                        title={values.title}
                        content={
                            <>
                                <div className='font-semibold'>Description:</div>
                                <div>{values.description}</div>
                                <div className='font-semibold'>Catégorie:</div>
                                <div>{ServiceCategory[values.category as unknown as keyof typeof ServiceCategory] ?? values.category}</div>
                                <div className='font-semibold'>Compétence:</div>
                                <div>{values.skill?.replace('LEVEL_', ' ')}</div>
                                <div className='font-semibold'>Difficulté:</div>
                                <div>{values.hard?.replace('LEVEL_', ' ')}</div>
                            </>
                        }
                    />
                )
            })
        }
    })
    const postFunction = async () => {
        const postData: ServiceDTO = new ServiceDTO(formik.values as ServiceDTO);
        try {
            const data = await updateService(idS, postData)
            if (data?.id) { refetch(); navigate(`/service/${data?.id}`); setOpen(false); }
            else handleApiError("Erreur lors de la modification du service");
        } catch (error) {
            handleApiError(error ?? "Erreur lors de la modification du service");
        }
    }


    return (
        <>
            {isLoading || error ?
                <Skeleton className={'w-24'} key={'S'} /> :
                <ServiceForm formik={formik} />}
        </ >
    )
}