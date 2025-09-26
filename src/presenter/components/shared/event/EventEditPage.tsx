import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { date, number, object, string, ref } from 'yup';
import { useEffect, useState } from 'react';
import { EventForm } from './eventComps/EventForm';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';
import { EventDTO, EventUpdateDTO } from '../../../../infrastructure/DTOs/EventDTO';
import { EventView } from '../../../views/viewsEntities/eventViewEntities';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { TextLength } from '../../../../domain/entities/utilsEntity';
import { CardConfirmForm } from '../../common/CardConfirmForm';

export default function EventDetailPage() {

    //// PARAMS
    const { id } = useParams()
    const idS = id ? parseInt(id) : 0

    //// VIEW MODEL
    const eventIdViewModelFactory = DI.resolve('eventIdViewModel');
    const { event, isLoading } = eventIdViewModelFactory(idS);
    const [initialValues, setInitialValues] = useState<EventView>({} as EventView)
    const [Address, setAddress] = useState<AddressDTO>(initialValues.Address || {} as AddressDTO)
    const updateEvent = async (id: number, data: EventUpdateDTO, address: AddressDTO) => await DI.resolve('updateEventUseCase').execute(id, data, address)

    //// HANDLE API ERROR
    const { setAlertValues, setOpen, handleApiError } = useAlertStore()
    const navigate = useNavigate()
    useEffect(() => {
        if (event && !event?.mine && !isLoading) navigate("/msg?msg=Vous n'avez pas le droit de modifier cet événement")
        setInitialValues(event as EventView)
        setAddress(event?.Address || {} as AddressDTO)
    }, [isLoading]);

    useEffect(() => {
        if (event && event?.Address) {
            setAddress(event?.Address || {} as AddressDTO)
        }
    }, [event])

    //// FORM SCHEMA
    const formSchema = object({
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        start: date().required("Date est obligatoire").max(ref('end'), "la date de debut doit etre avant a la date de fin"),
        end: date().required("Date est obligatoire").min(ref('start'), "la date de fin doit etre aprés a la date de debut"),
        participantsMin: number().required("Participants est obligatoire").min(1, "minmum 1 personne"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres").max(TextLength.MAX_LONGTEXT, "le texte est trop long"),
        category: string().required("Obligatoire"),
        Address: object({
            city: string().required("Ville est obligatoire"),
            zipcode: string().required("Code postal est obligatoire"),
        })
    })

    //// FORMIK 
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues as any,
        validationSchema: formSchema,
        onSubmit: async values => {
            formik.values = values
            formik.values.Address = Address as AddressDTO
            setOpen(true)
            setAlertValues({
                disableConfirm: false,
                handleConfirm: async () => await updateFunction(),
                confirmString: "Enregistrer",
                title: "Confimrer la modification",
                element: (
                    <CardConfirmForm
                        title={values.title}
                        content={
                            <>
                                <div className='font-semibold'>Description:</div>
                                <div>{values.description}</div>
                                <div className='font-semibold'>Catégorie:</div>
                                <div>{values.categoryS}</div>
                                <div className='font-semibold'>Participants:</div>
                                <div>{values.participantsMin}</div>
                                <div className='font-semibold'>Date de début:</div>
                                <div>{new Date(values.start).toLocaleString()}</div>
                                <div className='font-semibold'>Date de fin:</div>
                                <div>{new Date(values.end).toLocaleString()}</div>
                                <div className='font-semibold'>Adresse:</div>
                                <div>{Address?.address ? Address.address + ', ' : ''}{Address?.city ? Address.city + ', ' : ''}{Address?.zipcode ? Address.zipcode : ''}</div>
                            </>
                        }
                    />
                )
            })
        }
    })



    const updateFunction = async () => {
        formik.values.start = new Date(formik.values.start).toISOString()
        formik.values.end = new Date(formik.values.end).toISOString()
        const { ...rest } = formik.values;
        const updateData = new EventDTO({ ...rest })
        try {
            const updated = await updateEvent(event.id, updateData, Address)
            if (updated) {
                navigate("/evenement/" + updated.id);
                location.reload()
                setOpen(false)
            }
        } catch (error) {
            handleApiError(error ?? 'Erreur lors de la modification de l\'événement')
        }

    }



    return (
        <>
            {isLoading || formik.values === null ?
                <Skeleton /> :
                <EventForm
                    formik={formik}
                    Address={Address || formik.values.Address}
                    setAddress={setAddress} />}
        </>
    )
}