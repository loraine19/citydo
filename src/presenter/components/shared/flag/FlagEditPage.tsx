import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Button, Select, Switch, Typography } from '@material-tailwind/react';
import { ConfirmModal } from '../../common/ConfirmModal';
import SubHeader from '../../common/SubHeader';
import FlagDetailComp from './flagCards/FlagDetailComp';
import { Skeleton } from '../../common/Skeleton';
import DI from '../../../../di/ioc';
import { FlagView } from '../../../views/viewsEntities/flagViewEntities';
import { FlagTarget } from '../../../../domain/entities/Flag';
import { flagReasons } from '../../../constants';
import { Icon } from '../../common/IconComp';


export default function FlagEditPage() {
    const { id, target } = useParams()
    const targetKey: FlagTarget = Object.keys(FlagTarget).find(key => FlagTarget[key as keyof typeof FlagTarget] === target) as FlagTarget;
    const navigate = useNavigate();
    const deleteFlag = () => DI.resolve('deleteFlagUseCase').execute(parseInt(id || '0'), targetKey)
    const { flag, isLoading } = DI.resolve('flagByIdViewModel')(parseInt(id || '0'), targetKey)
    //  if (!flag || !flag.targetId) window.location.replace(`/msg?msg=Cette page n'existe pas`)


    const formSchema = object({ reason: string().required("Le type de signalement est obligatoire") })

    const formik = useFormik({
        initialValues: new FlagView(flag),
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
        }
    });

    const [open, setOpen] = useState(false);


    return (
        <>
            <ConfirmModal
                open={open}
                handleCancel={() => { setOpen(false) }}
                handleConfirm={async () => {
                    await deleteFlag()
                    setOpen(false); navigate('/flag')
                }}
                title={`Confirmer la suppression`}
                element={`<br> Vous confirmez la suppression du signalement </br>
                sur  l'${targetKey} pour le motif ${flag?.reasonS}`} />

            <form onSubmit={formik.handleSubmit}
                className="flex flex-col h-full">
                <main>
                    <div className="sectionHeader">
                        <SubHeader
                            type={`Signaler `}
                            place={'un ' + FlagTarget[targetKey as string as keyof typeof FlagTarget]}
                            closeBtn />

                        <div className='w-respLarge h-full flex flex-col py-2 gap-2'>
                            <div className="flex items-center gap-2">
                                <Switch
                                    id='active'
                                    className='px-2 bg-red-500'
                                    name="active"
                                    onChange={formik.handleChange}
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
                                disabled={flag.reason ? true : false}
                                onChange={(val: any) => { formik.values.reason = val; }}
                            >
                                {flagReasons.map((reason: any, index: number) => {
                                    return (
                                        <Select.Option
                                            className={reason.value === '' ? "hidden" : "rounded-full my-1 capitalize"} value={reason.value}
                                            key={index} >
                                            {reason.label}
                                        </Select.Option>)
                                })}
                            </Select>
                        </div>
                    </div>

                    <section className='flex pb-2'>
                        {isLoading ?
                            <Skeleton
                                className='w-respLarge m-auto !h-full !rounded-3xl' /> :
                            <FlagDetailComp
                                flag={flag} />}
                    </section>
                </main>
                <footer className="CTA ">
                    <Button
                        type="submit"
                        className="lgBtn" >
                        <Icon
                            fill
                            size='lg'
                            color="white"
                            icon="cancel" />
                        Retirer le signalement
                    </Button>
                </footer>
            </form>
        </>
    )
}

