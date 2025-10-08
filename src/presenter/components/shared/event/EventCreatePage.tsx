import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { date, number, object, string, ref } from 'yup';
import { EventForm } from './eventComps/EventForm';
import DI from '../../../../di/ioc';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';
import { EventDTO } from '../../../../infrastructure/DTOs/EventDTO';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { TextLength } from '../../../../domain/entities/utilsEntity';
import { CardConfirmForm } from '../../common/CardConfirmForm';
import { EventView } from '../../../views/viewsEntities/eventViewEntities';


export default function EventCreatePage() {
    const navigate = useNavigate();
    const postEvent = async (data: EventDTO) => await DI.resolve('postEventUseCase').execute(data)

    const formSchema = object({
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        start: date().required("Début obligatoire").max(ref('end'), "la date de debut doit etre avant a la date de fin"),
        end: date().required("Fin obligatoire").min(ref('start'), "la date de fin doit etre aprés a la date de debut"),
        participantsMin: number().required("obligatoire").min(1, "minmum 1 personne"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres").max(TextLength.MAX_LONGTEXT, "le texte est trop long"),
        category: string().required("Obligatoire"),
        categoryS: string(),
        Address: object({
            city: string().required("Ville est obligatoire"),
            zipcode: string().required("Code postal est obligatoire"),
        }),
        addressString: string(),
        groupId: string().required("Groupe est obligatoire").notOneOf(["0"], "Groupe est obligatoire"),
        groupLength: number()
    })

    const { setAlertValues, setOpen, handleApiError } = useAlertStore(state => state)

    const postFunction = async () => {
        formik.values.start = new Date(formik.values.start).toISOString()
        formik.values.end = new Date(formik.values.end).toISOString()
        const dataDTO = new EventDTO(formik.values)
        let data: any
        try {
            data = await postEvent(dataDTO);
            if (data?.id) {
                setOpen(false);
                navigate("/evenement/" + data.id);
            }
        }
        catch (error: any) {
            handleApiError(error ?? "Erreur lors de la création de l'événement");
        }

    }
    type extendEventView = Omit<EventView, 'Address'> & { addressString?: string, categoryS?: string, Address?: AddressDTO }
    const formik = useFormik({
        initialValues: {} as extendEventView,
        validationSchema: formSchema,
        onSubmit: async values => {
            formik.values = values
            setOpen(true)
            setAlertValues({
                disableConfirm: false,
                handleConfirm: async () => await postFunction(),
                confirmString: "Enregistrer",
                title: "Confimrer la création de l'événement",
                element: (
                    <CardConfirmForm
                        title={values.title}
                        content={
                            <>
                                <div className='font-semibold'>Description:</div>
                                <div>{values.description}</div>
                                <div className='font-semibold'>Catégorie:</div>
                                <div>{values.categoryS}</div>
                                <div className='font-semibold'>Participants minimum:</div>
                                <div>{values.participantsMin}</div>
                                <div className='font-semibold'>Date de début:</div>
                                <div>{new Date(values.start).toLocaleString()}</div>
                                <div className='font-semibold'>Date de fin:</div>
                                <div>{new Date(values.end).toLocaleString()}</div>
                                <div className='font-semibold'>Adresse:</div>
                                <div>{formik.values.addressString}</div>
                            </>
                        }
                    />
                )
            })
        }
    });




    return (
        <EventForm
            formik={formik} />
    )
}