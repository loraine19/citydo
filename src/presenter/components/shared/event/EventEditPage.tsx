import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { date, number, object, string, ref } from 'yup';
import { useEffect, useState } from 'react';
import { EventForm } from './eventComps/EventForm';
import { ConfirmModal } from '../../common/ConfirmModal';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { AddressDTO } from '../../../../infrastructure/DTOs/AddressDTO';
import { EventDTO, EventUpdateDTO } from '../../../../infrastructure/DTOs/EventDTO';
import { EventView } from '../../../views/viewsEntities/eventViewEntities';
import { generateDivObject } from '../../../views/viewsEntities/utilsService';

export default function EventDetailPage() {
    const { id } = useParams()
    const idS = id ? parseInt(id) : 0;
    const eventIdViewModelFactory = DI.resolve('eventIdViewModel');
    const { event, isLoading } = eventIdViewModelFactory(idS);
    const [initialValues, setInitialValues] = useState<EventView>({} as EventView)
    const [Address, setAddress] = useState<AddressDTO>(initialValues.Address || {} as AddressDTO)
    const updateEvent = async (id: number, data: EventUpdateDTO, address: AddressDTO) => await DI.resolve('updateEventUseCase').execute(id, data, address)

    useEffect(() => {
        event && !event.mine && navigate("/msg?msg=Vous n'avez pas le droit de modifier cet événement")
        setInitialValues(event)
    }, [isLoading]);


    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const formSchema = object({
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        start: date().required("Date est obligatoire").max(ref('end'), "la date de debut doit etre avant a la date de fin"),
        end: date().required("Date est obligatoire").min(ref('start'), "la date de fin doit etre aprés a la date de debut"),
        participantsMin: number().required("Participants est obligatoire").min(1, "minmum 1 personne"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        category: string().required("Catégorie est obligatoire"),
        Address: object({
            city: string().required("Ville est obligatoire"),
            zipcode: string().required("Code postal est obligatoire"),
        })
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues as EventView,
        validationSchema: formSchema,
        onSubmit: async values => {
            formik.values = values
            setOpen(true)
        }
    })



    const updateFunction = async () => {
        formik.values.start = new Date(formik.values.start).toISOString()
        formik.values.end = new Date(formik.values.end).toISOString()
        const { ...rest } = formik.values;
        const updateData = { ...rest }
        const updated = await updateEvent(event.id, updateData, Address)
        if (updated) {
            navigate("/evenement/" + updated.id);
            location.reload()
            setOpen(false)
        }
    }


    return (
        <div className="Body cyan">
            <ConfirmModal
                open={open}
                handleOpen={() => setOpen(false)}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => await updateFunction()}
                title={"Confimrer la modification"}
                element={generateDivObject(new EventDTO(formik.values))} />

            {isLoading || formik.values === null ?
                <Skeleton /> :
                <EventForm
                    formik={formik}
                    Address={Address}
                    setAddress={setAddress} />}
        </div >
    )
}