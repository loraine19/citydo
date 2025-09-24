import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate, } from 'react-router-dom';
import { ServiceForm } from './serviceCards/ServiceForm';
import DI from '../../../../di/ioc';
import { ServiceView } from '../../../views/viewsEntities/serviceViewEntity';
import { ServiceDTO } from '../../../../infrastructure/DTOs/ServiceDTO';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { User } from '../../../../domain/entities/User';
import ServiceCard from './serviceCards/ServiceCard';
import { AlertValues } from '../../../../domain/entities/Error';
import { ServiceStep } from '../../../../domain/entities/Service';


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
                handleConfirm: async () => {
                    await postFunction()
                },
                confirmString: "Enregistrer ",
                title: "Confimrer la modification",
                element: (
                    <div className='flex flex-col gap-8 max-h-[80vh] bg-gray-100 rounded-3xl pt-12 p-5'>
                        <ServiceCard
                            service={new ServiceView({ ...values, image: values?.blob || values?.image } as ServiceView, {} as User)}
                            change={() => { }}
                            update={() => { }}
                        />
                    </div>
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