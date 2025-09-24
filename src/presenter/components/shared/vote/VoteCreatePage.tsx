import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DI from '../../../../di/ioc';
import { VoteForm } from './voteCards/VoteForm';
import { PoolDTO, SurveyDTO } from '../../../../infrastructure/DTOs/PoolSurveyDTO';
import { PoolSurveyView } from '../../../views/viewsEntities/poolSurveyViewEntity';
import { VoteTarget } from '../../../../domain/entities/Vote';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { TextLength } from '../../../../domain/entities/utilsEntity';
import { CardConfirmForm } from '../../common/CardConfirmForm';

export default function VoteCreatePage() {
    const [initialValues] = useState<PoolSurveyView>({} as PoolSurveyView);
    const postSurvey = async (data: SurveyDTO) => await DI.resolve('postSurveyUseCase').execute(data)
    const postPool = async (data: PoolDTO) => await DI.resolve('postPoolUseCase').execute(data)
    const [type, setType] = useState<VoteTarget>(VoteTarget.SURVEY)
    const { setOpen, setAlertValues, handleApiError } = useAlertStore()

    const navigate = useNavigate();
    const formSchemaSurvey = object({
        typeS: string().required("Type est obligatoire"),
        category: string().required("Obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres").max(TextLength.MAX_LONGTEXT, "le texte est trop long"),
        groupId: string().required("Groupe est obligatoire").notOneOf(["0"], "Groupe est obligatoire"),
    })

    const formSchemaPool = object({
        typeS: string().required("Type est obligatoire"),
        userIdBenef: string().required("Le beneficiaire est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres"),
        groupId: string().required("Groupe est obligatoire").notOneOf(["0"], "Groupe est obligatoire"),
    })


    const createFunction = async (values?: any) => {
        if (type === VoteTarget.SURVEY) {
            try {
                const updateData = new SurveyDTO(values as SurveyDTO)
                const data = await postSurvey(updateData)
                if (data?.id) { navigate(`/sondage/${data?.id}`); setOpen(false) }
                else handleApiError("Erreur lors de la création du sondage")
            }
            catch (error) {
                handleApiError(error ?? "Erreur lors de la création du sondage")
            }
        }
        else if (type === VoteTarget.POOL) {
            try {
                const updateData = new PoolDTO(values as PoolDTO)
                const data = await postPool(updateData)
                if (data?.id) { navigate(`/cagnotte/${data?.id}`); setOpen(false) }
                else handleApiError("Erreur lors de la création de la cagnotte")
            }
            catch (error) {
                handleApiError(error ?? "Erreur lors de la création de la cagnotte")
            }
        }
    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues as any,
        validationSchema: type === VoteTarget.SURVEY ? formSchemaSurvey : formSchemaPool,
        onSubmit: values => {
            values.groupId = parseInt(formik.values.groupId)
            setOpen(true)
            setAlertValues({
                button2: {
                    text: "Annuler",
                    onClick: () => setOpen(false)
                },
                disableCancel: true,
                handleConfirm: async () => await createFunction(values),
                confirmString: "Enregistrer ",
                title: "Confimrer la création",
                element: <CardConfirmForm
                    title={values.title}
                    content={
                        <>
                            <div className='font-semibold'>Description:</div>
                            <div>{values.description}</div>

                            {type === VoteTarget.SURVEY && <>
                                <div className='font-semibold'>Catégorie:</div>
                                <div>{values.category}</div>
                            </>}
                            {type === VoteTarget.POOL && <>
                                <div className='font-semibold'>Bénéficiaire:</div>
                                <div>{values.UserBenef}</div>
                            </>}

                        </>
                    }
                />
            })
        }
    })



    return (

        <VoteForm
            formik={formik}
            type={type}
            setType={(type: VoteTarget) => setType(type)}
        />
    )
}