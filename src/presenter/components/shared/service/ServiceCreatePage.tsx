import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate, } from 'react-router-dom';
import { ServiceForm } from './serviceCards/ServiceForm';
import DI from '../../../../di/ioc';
import { ServiceDTO } from '../../../../infrastructure/DTOs/ServiceDTO';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { AlertValues } from '../../../../domain/entities/Error';
import { ServiceCategory, ServiceStep } from '../../../../domain/entities/Service';
import { CardConfirmForm } from '../../common/CardConfirmForm';


export default function ServiceCreatePage() {
    const postService = async (data: ServiceDTO) => await DI.resolve('postServiceUseCase').execute(data)
    const navigate = useNavigate();
    const formSchema = object({
        category: string().required("Obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        groupId: string().required("Groupe est obligatoire").notOneOf(["0"], "Groupe est obligatoire"),
        skill: string().required("obligatoire").notOneOf(["0"], "obligatoire"),
        hard: string().required("obligatoire").notOneOf(["0"], "obligatoire"),
    })

    const { setOpen, setAlertValues, handleApiError } = useAlertStore(state => state)

    const postFunction = async () => {
        const postData: ServiceDTO = new ServiceDTO(formik.values as ServiceDTO);
        try {
            const data = await postService(postData)
            console.log('created service', data);
            if (data?.id) {
                navigate(`/service/${data?.id}`);
            } else {
                handleApiError("Erreur lors de la création du service");
                formik.setSubmitting(false);
            }
        } catch (error) {
            formik.setSubmitting(false);
            handleApiError(error ?? "Erreur lors de la création du service");

        }
    }


    const formik = useFormik({
        initialValues: {} as ServiceDTO,
        validationSchema: formSchema,
        onSubmit: values => {
            values.status = 'STEP_0' as ServiceStep;
            const valuesAlert: AlertValues = {
                button2: {
                    text: "Annuler",
                    onClick: () => setOpen(false)
                },
                disableCancel: true,
                handleConfirm: async () => {
                    await postFunction()
                },
                confirmString: "Enregistrer ",
                title: "Confirmer la création du service",
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
            }
            setAlertValues({ ...valuesAlert });
            setOpen(true)
        }
    });

    return (
        <ServiceForm formik={formik} />
    )
}