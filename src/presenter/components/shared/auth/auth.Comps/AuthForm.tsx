import { Card, CardBody, Typography, Input, CardFooter, Checkbox, Button, CardHeader } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import PopUp from '../../../common/PopUp';
import { Icon } from '../../../common/IconComp';
import { FormikProps } from 'formik';
import { useUserStore } from '../../../../../application/stores/user.store'
import DI from '../../../../../di/ioc';
import { InputError } from '../../../common/adaptatersComps/input';

type AuthFormProps = {
    lead: string;
    notif: string;
    popOverContent: string;
    popOverButtonText: string;
    popOverClass: string;
    submitText: string;
    confirm?: boolean;
    checkbox?: boolean;
    formik: FormikProps<any>;
    hidden?: boolean;
    inError?: boolean;
};

export const AuthForm: React.FC<AuthFormProps> = ({
    lead,
    notif,
    popOverContent,
    popOverButtonText,
    popOverClass,
    submitText,
    confirm,
    checkbox,
    formik,
    hidden = false,
    inError = false
}: AuthFormProps) => {
    const passwordType = { value: 'password', icon: 'visibility' }
    const textType = { value: 'text', icon: 'visibility_off' }
    const [passWordInput, setPassWordInput] = useState<{ value: string, icon: string }>(passwordType)
    const [passWordInput2, setPassWordInput2] = useState<{ value: string, icon: string }>(passwordType)
    useEffect(() => { if (hidden) { formik.resetForm(); formik.values = {}; } }, [hidden])
    const { setIsLoggedIn } = useUserStore()
    const toggleInputStyle = (inputState: { value: string, icon: string }, setInputState: React.Dispatch<React.SetStateAction<{ value: string, icon: string }>>) => {
        setInputState(inputState.value === 'password' ? textType : passwordType);
    }

    const googleAuth = async () => await DI.resolve('googleAuthUseCase').execute()
    const hiddeImage = (): string => { if (window.innerHeight < 780) return "hidden"; else return "" }
    window.addEventListener('resize', () => {
        hiddeImage()
    })


    return (
        <form onSubmit={formik.handleSubmit} className='main h-full'>
            <div className='flex md:flex-row  flex-1 items-center h-full gap-8 wRespXL px-[2%] pt-8 pb-2 w-full'>
                {/* IMAGE CARD */}
                <Card className={`border-slate-200 !hidden md:!flex flex-[50%] FixCardNoImage !p-8`} >
                    <div className="absolute rounded-2xl inset-0 bg-black/10   z-0" />
                    <img src="image/welcome.jpg"
                        alt="connexion"
                        className="absolute inset-0 object-cover object-center w-full h-full rounded-2xl opacity-90 brightness-90 z-0" />
                    <Typography
                        className="py-6 px-8 !leading-[1] text-[2.8rem] font-bold !text-center !font-comfortaa relative z-10 !text-white"
                        style={{ textShadow: "0px 1px 4px #00000080" }} >
                        Connecter vous à votre Quartier
                    </Typography>
                </Card>
                {/* FORM CARD */}
                <Card className="md:flex-[50%] overflow-auto min-h-38 !h-full FixCardNoImage">
                    <CardHeader
                        className="FixCardHeaderNoImage h-max w-full px-6 pt-6 pb-4 !flex flex-col">
                        <h3>
                            {lead}
                        </h3>
                        <Typography
                            data-cy="notif-text"
                            className={`text-sm ${inError ? "error" : ""}`}>
                            {notif}
                        </Typography>
                    </CardHeader>
                    <CardBody className='FixCardBody justify-center !flex '>
                        <div className='flex flex-col gap-2 w-full overflow-auto px-4 '>
                            <Input
                                className={`inputStandart ${formik?.errors.email ? 'error' : ''}`}
                                placeholder={"Email"}
                                name="email"
                                onChange={formik.handleChange}
                                data-cy="email-input" />
                            <InputError error={formik?.errors.email} />
                            <Input
                                className={` inputStandart !relative`}
                                isError={!!formik?.errors.password}
                                placeholder={"Mot de passe"}
                                name="password"
                                onChange={formik.handleChange}
                                type={passWordInput.value}
                                data-cy="password-input" >
                                <Icon
                                    style={'!absolute top-[50%] translate-y-[-50%] right-2'}
                                    onClick={() => toggleInputStyle(passWordInput, setPassWordInput)}
                                    size='lg'
                                    icon={passWordInput.icon} />
                            </Input>
                            <InputError error={formik?.errors.password} />
                            <div className={!confirm ? "hidden" : ""}>
                                <Input className={` inputStandart `}
                                    isError={!!formik?.errors.passwordConfirm}
                                    placeholder={"Confirmer le mot de passe"}
                                    name="passwordConfirm"
                                    type={passWordInput2.value}
                                    onChange={formik.handleChange}
                                    data-cy="password-confirm-input" >
                                    <Icon
                                        style={'!absolute top-[50%] translate-y-[-50%] right-2'}
                                        onClick={() => toggleInputStyle(passWordInput2, setPassWordInput2)}
                                        icon={passWordInput2.icon}
                                        size='lg' />
                                </Input>
                                <InputError mt error={formik?.errors.passwordConfirm} />
                            </div>
                        </div>

                        <div className={`xs:flex pb-4 flex-1 w-full pt-8 h-full  min-h-44 px-4 ${hiddeImage()} justify-center items-center hidden  md:hidden `}>
                            <Card className={`!flex w-full md:!hidden FixCardNoImage`} >
                                <img
                                    src="image/welcome.jpg"
                                    alt="connexion"
                                    className="absolute !min-h-24  inset-0 object-cover w-full h-full rounded-2xl  z-0   object-center" />
                            </Card>
                        </div>

                    </CardBody>
                    <CardFooter className={` FixCardFooter !flex !pb-8 my-0 !min-h-max !flex-1 items-center `}>
                        <div className={`${!checkbox ? 'flex-col justify-between  pl-6 gap-5' : 'justify-between'} flex h-full flex-1 gap-2 pb-1 w-full  px-4 `}>
                            <div className='flex h-full  gap-1 flex-col '>
                                <i className='text-sm'>{checkbox ? 'acceptez les conditions d\'utilisation' : ''} </i>

                                <Button
                                    data-cy="submit-button"
                                    type="submit"
                                    size="md"
                                    className=" bg-cyan-500 btn ">
                                    {submitText}
                                </Button>
                                <div className={`${!checkbox ? "hidden" : "flex flex-col w-full "} `}>
                                    <div className='flex items-center gap-2'>
                                        <Checkbox
                                            data-cy="terms-checkbox"
                                            type="checkbox"
                                            name="checkbox"
                                            className={`border-none shadow-none hover:shadow-none data-[checked=true]:bg-transparent`}
                                            onChange={(e: any) => { formik.values.checkbox = e.target.checked }} >
                                            <Checkbox.Indicator
                                                className="relative opacity-100 flex items-center justify-center">
                                                <Icon style={'opacity-0 group-data-[checked=true]:opacity-100 absolute top-[50%] translate-y-[-50%] -left-1'}
                                                    bg
                                                    size='sm'
                                                    color={formik.errors.checkbox ? 'red' : 'slate'}
                                                    icon={""}
                                                />
                                                <Icon style={'opacity-100 group-data-[checked=true]:opacity-0 !absolute top-[50%] translate-y-[-50%] -left-1'}
                                                    bg
                                                    size='sm'
                                                    color={formik.errors.checkbox ? 'red' : 'cyan'}
                                                    icon={"check"}
                                                />
                                            </Checkbox.Indicator>
                                        </Checkbox>
                                        <div className='!justify-start w-full  -ml-4 flex flex-col'>
                                            <PopUp
                                                variant={"ghost"}
                                                classNames={`${popOverClass} !border-none scale-95 !flex ounded-full !z-[999999]`}
                                                text={popOverButtonText}
                                                content={popOverContent} />
                                        </div>
                                    </div>
                                    <InputError error={formik?.errors.checkbox} style=' !py-2' />
                                </div>
                            </div>
                            <div className='flex h-full gap-1 flex-col '>
                                <i className='text-sm'>Ou {submitText} avec </i>
                                <Button
                                    size="md"
                                    className="max-w-max slateStyle !bg-slate-100 !relative flex !border-slate-900/10
                                      btnIcon "
                                    onClick={async () => {
                                        setIsLoggedIn(true)
                                        await googleAuth()
                                    }}>
                                    <img
                                        src="image/google.svg"
                                        alt="metamask"
                                        className="h-6 w-6 " />
                                    Google &nbsp;
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </form>
    )
}
