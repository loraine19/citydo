import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { date, number, object, string, ref } from 'yup';
import { useState } from 'react';
import { EventForm } from './eventComps/EventForm';
import DI from '../../../../di/ioc';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';
import { EventDTO } from '../../../../infrastructure/DTOs/EventDTO';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { Typography } from '@material-tailwind/react';
import { EventView } from '../../../views/viewsEntities/eventViewEntities';
import { EventCard } from './eventComps/EventCard';
import { TextLength } from '../../../../domain/entities/utilsEntity';


export default function EventCreatePage() {
    const navigate = useNavigate();
    const [Address, setAddress] = useState<AddressDTO>({} as AddressDTO)
    const postEvent = async (data: EventDTO) => await DI.resolve('postEventUseCase').execute(data)

    const formSchema = object({
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        start: date().required("Début obligatoire").max(ref('end'), "la date de debut doit etre avant a la date de fin"),
        end: date().required("Fin obligatoire").min(ref('start'), "la date de fin doit etre aprés a la date de debut"),
        participantsMin: number().required("obligatoire").min(1, "minmum 1 personne"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres").max(TextLength.MAX_LONGTEXT, "le texte est trop long"),
        category: string().required("Obligatoire"),
        Address: object({
            city: string().required("Ville est obligatoire"),
            zipcode: string().required("Code postal est obligatoire"),
        }),
        groupId: string().required("Groupe est obligatoire").notOneOf(["0"], "Groupe est obligatoire"),
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

    const formik = useFormik({
        initialValues: {} as any,
        validationSchema: formSchema,
        onSubmit: async values => {
            setOpen(true)
            setAlertValues({
                handleConfirm: async () => await postFunction(),
                confirmString: "Enregistrer la création de l'événement",
                title: "Confimrer la création de l'événement",
                element: (
                    <div className='flex flex-col gap-8 max-h-[80vh] bg-gray-100 rounded-3xl px-5 py-4'>
                        <Typography variant='h6'>
                            Évenement au : {values?.Address?.address} le {new Date(values?.start).toLocaleDateString('fr-FR')}
                        </Typography>
                        <EventCard
                            event={new EventView({ ...values, image: values?.blob || values?.image }, 0)}
                            refetch={() => { }}
                            change={() => { }}
                        />
                    </div>
                )
            })
        }
    });




    return (
        <EventForm
            formik={formik}
            Address={Address}
            setAddress={setAddress} />
    )
}