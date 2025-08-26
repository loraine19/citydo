import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Button, Select, Switch, Typography } from '@material-tailwind/react';
import { Flag, FlagTarget } from '../../../../domain/entities/Flag';
import { Label } from '../../../../domain/entities/frontEntities';
import { ConfirmModal } from '../../common/ConfirmModal';
import SubHeader from '../../common/SubHeader';
import FlagDetailComp from './flagCards/FlagDetailComp';
import { Skeleton } from '../../common/Skeleton';
import { getLabel } from '../../../views/viewsEntities/utilsService';
import DI from '../../../../di/ioc';
import { flagReasons } from '../../../constants';
import { FlagView } from '../../../views/viewsEntities/flagViewEntities';
import { Icon } from '../../common/IconComp';

export default function FlagCreatePage() {
    const { id, target } = useParams();
    const targetKey: FlagTarget = Object.keys(FlagTarget).find(key => FlagTarget[key as keyof typeof FlagTarget] === target) as FlagTarget;
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const [flag, setFlag] = useState<Flag>({} as Flag);
    const postFlag = async (data: any) => DI.resolve('postFlagUseCase').execute(data);
    const getEventById = (id: number) => DI.resolve('getEventByIdUseCase').execute(id);
    const getServiceById = (id: number) => DI.resolve('getServiceByIdUseCase').execute(id);
    const getPostById = (id: number) => DI.resolve('getPostByIdUseCase').execute(id);

    const fetch = async () => {
        setLoading(true);
        const idS = id ? parseInt(id) : 0;
        let fetchedElement: any = {};
        switch (target) {
            case 'evenement':
                fetchedElement = await getEventById(idS);
                break;
            case 'service':
                fetchedElement = await getServiceById(idS);
                break;
            case 'annonce':
                fetchedElement = await getPostById(idS);
                break;
            // target === "survey" && setElement(await getSurveyById(idS))
        }
        flag.element = fetchedElement;
        formik.setValues({ ...fetchedElement, element: fetchedElement, target: targetKey, targetId: idS });
        setLoading(false);
    };

    useEffect(() => { fetch(); }, []);

    const formSchema = object({ reason: string().required("Le type de signalement est obligatoire"), });

    const formik = useFormik({
        initialValues: new FlagView(flag),
        validationSchema: formSchema,
        onSubmit: values => {
            formik.setValues(values);
            setFlag(values);
            setOpen(true);
        }
    });

    const [open, setOpen] = useState(false);

    return (
        <>
            <ConfirmModal
                open={open}
                handleCancel={() => { setOpen(false); }}
                handleConfirm={async () => {
                    const PostData = { ...formik.values };
                    const ok = new FlagView(await postFlag(PostData));
                    if (ok) { setOpen(false); navigate(`/flag/edit/${ok.targetS}/${ok.targetId}`); }
                }}
                title={"Confimrer le Flag"}
                element={` Vous confirmez le signalement </br>
                    sur  <br>${target} ${flag?.element?.title} <br> pour le motif <b>${getLabel(flag.reason, flagReasons)}</b>`} />

            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full">
                <main>
                    <div className="sectionHeader px-4">
                        <SubHeader
                            type={`Signaler `}
                            place={'un ' + target}
                            closeBtn />
                        <div className='w-respLarge h-full flex flex-col py-2 gap-2'>
                            <div className='flex justify-between items-center px-2'>
                                <Switch
                                    className='px-2 bg-cyan-500'
                                    name="active"
                                    checked={flag.reason ? true : false} />
                                <Typography
                                    as="label"
                                    htmlFor="active"
                                    className="cursor-pointer text-foreground"
                                >
                                    {flag.reason ? "signalé" : "non signalé"}
                                </Typography>
                            </div>
                            <Select
                                className={` rounded-full shadow bg-white border-none capitalize`}
                                label={formik.errors.reason ? formik.errors.reason as string : "Raison du signalement"}
                                name="reason"
                                labelProps={{ className: `${formik.errors.reason && "error"} before:border-none after:border-none ` }}
                                value={flag.reason as unknown as string || ''}
                                onChange={(val: string | undefined) => { if (val) formik.setFieldValue('reason', val); }}
                            >
                                {flagReasons.map((reason: Label, index: number) => {
                                    return (
                                        <Select.Option
                                            className={"rounded-full my-1 capitalize"}
                                            value={reason.value}
                                            key={index} >
                                            {reason.label}
                                        </Select.Option>)
                                })}
                            </Select>
                        </div>
                    </div>

                    <section>
                        {loading ?
                            <Skeleton
                                className='w-respLarge m-auto !h-full !rounded-3xl' /> :
                            <FlagDetailComp
                                flag={new FlagView(flag)}
                                label={targetKey} />}
                    </section>
                </main>
                <footer className="CTA ">
                    <Button
                        type="submit"
                        className="lgBtn bg-red-500" >
                        <Icon
                            fill
                            size='lg'
                            color="white"
                            icon="flag_2" />
                        Envoyer le signalement
                    </Button>
                </footer>
            </form>
        </>
    );
}
