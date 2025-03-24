import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate, } from 'react-router-dom';
import { useState } from 'react';
import { ConfirmModal } from '../../common/ConfirmModal';
import { ServiceForm } from './serviceCards/ServiceForm';
import { useUserStore } from '../../../../application/stores/user.store';
import DI from '../../../../di/ioc';
import { ServiceView } from '../../../views/viewsEntities/serviceViewEntity';
import { ServiceDTO } from '../../../../infrastructure/DTOs/ServiceDTO';


export default function ServiceCreatePage() {
    const { user } = useUserStore()
    const postService = async (data: ServiceDTO) => await DI.resolve('postServiceUseCase').execute(data)
    const navigate = useNavigate();
    const formSchema = object({
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
    })

    const [open, setOpen] = useState(false);
    const formik = useFormik({
        initialValues: {} as ServiceView,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
        }
    });

    const postFunction = async () => {
        const { ...rest } = new ServiceDTO(formik.values as ServiceDTO);
        const postData = { ...rest, userId: user.id }
        return await postService(postData)
    }

    return (
        <div className="Body cyan">
            <ConfirmModal
                open={open}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => {
                    const ok = await postFunction();
                    if (ok) {
                        navigate(`/service/${ok.id}`);
                        setOpen(false)
                    }
                }}
                title={"Confimrer la modification"}
                element={(JSON.stringify(new ServiceDTO(formik.values as ServiceDTO), null, 2).replace(/,/g, "<br>").replace(/"/g, "").replace(/{/g, " : ")).replace(/}/g, "")} />

            <ServiceForm formik={formik} />
        </div >
    )
}