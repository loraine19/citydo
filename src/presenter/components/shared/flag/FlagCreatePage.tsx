import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Flag, FlagReason, FlagTarget } from '../../../../domain/entities/Flag';
import DI from '../../../../di/ioc';
import { FlagView } from '../../../views/viewsEntities/flagViewEntities'
import FlagForm from './flagCards/FlagForm';
import { FlagDTO } from '../../../../infrastructure/DTOs/FlagDTO';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { CardConfirmForm } from '../../common/CardConfirmForm';
import { flagReasons } from '../../../constants';
export default function FlagCreatePage() {
    const { id, target } = useParams();
    const targetKey = (target: string) => Object.keys(FlagTarget).find(key => FlagTarget[key as keyof typeof FlagTarget] === target);
    const reasonKey = (reason: string) => Object.keys(FlagReason).find(key => FlagReason[key as keyof typeof FlagReason] === reason);
    const [loading, setLoading] = useState<boolean>(true);
    const [flag, setFlag] = useState<Flag>({} as Flag);
    const navigate = useNavigate();
    const postFlag = async (data: any) => DI.resolve('postFlagUseCase').execute(data);
    const getEventById = (id: number) => DI.resolve('getEventByIdUseCase').execute(id);
    const getServiceById = (id: number) => DI.resolve('getServiceByIdUseCase').execute(id);
    const getPostById = (id: number) => DI.resolve('getPostByIdUseCase').execute(id);

    const { flag: alreadyFlag, isLoading } = DI.resolve('flagByIdViewModel')(parseInt(id || '0'), targetKey)
    const [isAlreadyFlag, setIsAlreadyFlag] = useState<boolean>(false);

    const fetch = async (): Promise<FlagView> => {
        setLoading(true);
        const idS = id ? parseInt(id) : 0;
        if (alreadyFlag && alreadyFlag.id) {
            alert('Vous avez déjà signalé cet élément. Vous allez être redirigé vers la page de modification de votre signalement.');
            setFlag(alreadyFlag);
            setIsAlreadyFlag(true);
            return new FlagView(alreadyFlag);
        }
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
        flag.element = fetchedElement;
        formik.setValues(
            new FlagView({
                ...flag,
                element: fetchedElement,
                target: targetKey(target ?? '') as any,
                targetId: idS
            })
        );
        return new FlagView(flag);
    };



    const formSchema = object(
        {
            reason: string().required("La raison est obligatoire"),
            target: string().required("Le type d'élément est obligatoire"),
            targetId: string().required("L'élément à signaler est obligatoire"),


        });

    const { setAlertValues, setOpen, handleApiError } = useAlertStore(state => state)

    const postFunction = async () => {
        const dataDTO = new FlagDTO(formik.values)
        console.log(dataDTO)
        let data: any
        try {
            data = await postFlag(dataDTO);
            if (data?.id) {
                setOpen(false);
                navigate("/flag");
            }
        }
        catch (error: any) {
            handleApiError(error ?? "Erreur lors de la création de l'événement");
        }

    }

    const formik = useFormik({
        initialValues: new FlagView(flag),
        validationSchema: formSchema,
        onSubmit: async values => {

            const idS = id ? parseInt(id) : 0;
            formik.setValues(
                new FlagView({
                    ...flag,
                    target: targetKey(target ?? '') as FlagTarget,
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
                handleConfirm: async () => await postFunction(),
                confirmString: "Enregistrer",
                title: "Confimrer la création de l'événement",
                element: (
                    <CardConfirmForm
                        title={values.title}
                        content={
                            <>
                                <div className='font-semibold'> Motif</div>
                                <div>{flagReasons.find((c: any) => c.value === values.reason)?.label ?? values.reason}</div>
                                <div className='font-semibold'>{target}:</div>
                                <div>{values.element?.title}</div>

                            </>
                        }
                    />
                )
            })
        }
    });

    useEffect(() => {
        fetch().then(() => setFlag(new FlagView(flag))).finally(() => setLoading(false));
    }, [id, target, isLoading]);


    return (
        <>

            <FlagForm
                alreadyFlag={isAlreadyFlag}
                flag={flag}
                loading={loading}
                formik={formik} />
        </>
    );
}
