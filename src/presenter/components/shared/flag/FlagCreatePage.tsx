import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { FlagReason, FlagTarget } from '../../../../domain/entities/Flag';
import DI from '../../../../di/ioc';
import FlagForm from './flagCards/FlagForm';
import { FlagDTO } from '../../../../infrastructure/DTOs/FlagDTO';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { CardConfirmForm } from '../../common/CardConfirmForm';
import { Skeleton } from '../../common/Skeleton';
import { flagReasons } from '../../../constants';
export default function FlagCreatePage() {
    const { id, target } = useParams();
    const targetGet = (target: string): FlagTarget => Object.keys(FlagTarget).find(key => FlagTarget[key as keyof typeof FlagTarget] === target) as FlagTarget || FlagTarget.POST;
    const [targetKey, setTargetKey] = useState<FlagTarget>(targetGet(target ?? ''));
    const [idS, setIdS] = useState<number>(id ? parseInt(id) : 0);
    const reasonKey = (reason: string) => Object.keys(FlagReason).find(key => FlagReason[key as keyof typeof FlagReason] === reason);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const postFlag = async (data: any) => DI.resolve('postFlagUseCase').execute(data);
    // 
    const getEventById = (id: number) => DI.resolve('getEventByIdUseCase').execute(id);
    const getServiceById = (id: number) => DI.resolve('getServiceByIdUseCase').execute(id);
    const getPostById = (id: number) => DI.resolve('getPostByIdUseCase').execute(id);
    const flagFactory = (id: number, target: FlagTarget) => DI.resolve('flagByIdViewModel')(id, target);

    const deleteFlag = (id: number, targetKey: FlagTarget) => DI.resolve('deleteFlagUseCase').execute(id, targetKey)
    const { flag: alreadyFlag, isLoading } = flagFactory(idS, targetKey);

    const fetch = async () => {


        let fetchedElement: any = {};
        switch (target as string) {
            case FlagTarget.EVENT:
                fetchedElement = await getEventById(idS);
                break;
            case FlagTarget.SERVICE:
                fetchedElement = await getServiceById(idS);
                break;
            case FlagTarget.POST:
                fetchedElement = await getPostById(idS);
                break;
        }
        formik.setValues({
            ...alreadyFlag,
            reason: alreadyFlag?.reason,
            reasonS: alreadyFlag?.reason ? flagReasons.find(r => r.value === alreadyFlag.reason)?.label : null,
            element: fetchedElement,
            target: targetGet(target ?? '') as any,
            targetId: idS
        })
        setLoading(false);
    };

    useEffect(() => {
        setIdS(id ? parseInt(id) : 0);
        setTargetKey(targetGet(target ?? ''));
        if ((!isLoading && loading) || !formik.values.element) {
            fetch();

        }

    }, [isLoading, id, target]);

    const formSchema = object(
        {
            element: object(),
            reasonS: string(),
            reason: string().required("La raison est obligatoire"),
            target: string().required("Le type d'élément est obligatoire"),
            targetId: string().required("L'élément à signaler est obligatoire"),


        });

    const { setAlertValues, setOpen, handleApiError } = useAlertStore(state => state)

    const sendFunction = async () => {
        const dataDTO = new FlagDTO(formik.values)
        let data: any
        try {
            if (alreadyFlag.targetId !== idS) {
                data = await postFlag(dataDTO);
                if (data?.id) {
                    setOpen(false);
                    navigate("/flag");
                }
            }
            else {
                await deleteFlag(idS, dataDTO.target as FlagTarget);
                setOpen(false);
                navigate("/flag");
            }
        }
        catch (error: any) {
            handleApiError(error ?? "Erreur lors de la création du signalement");
        }

    }

    const formik = useFormik({
        initialValues: {} as any,
        validationSchema: formSchema,
        onSubmit: async values => {
            const idS = id ? parseInt(id) : 0;
            formik.setValues(
                new FlagDTO({
                    ...values,
                    target: targetGet(target ?? '') as FlagTarget,
                    targetId: idS,
                    reason: reasonKey(values.reason ?? '') as FlagReason,
                })
            );
            setOpen(true)
            setAlertValues({
                button2: {
                    text: "Annuler",
                    onClick: () => setOpen(false)
                },
                disableCancel: true,
                disableConfirm: false,
                handleConfirm: async () => await sendFunction(),
                confirmString: "Enregistrer",
                title: !alreadyFlag ? "Enregistrer le signalement" : "Supprimer le signalement",
                element: (
                    <CardConfirmForm
                        title={values.element?.title}
                        content={
                            <>
                                <div className='font-semibold'> Motif</div>
                                <div>{values.reasonS}</div>
                                <div className='font-semibold'>{target}:</div>
                                <div>{values.element?.title}</div>

                            </>
                        }
                    />
                )
            })
        }
    });



    return (
        <>
            {(!isLoading && formik.values !== null) ?
                <FlagForm
                    alreadyFlag={alreadyFlag.targetId === idS}
                    loading={loading}
                    formik={formik} /> :
                <Skeleton />}
        </>
    );
}
