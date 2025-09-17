import { Input, Checkbox, } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import PopUp from '../../../common/PopUp';
import { Icon } from '../../../common/IconComp';
import { FormikProps } from 'formik';
import { useUserStore } from '../../../../../application/stores/user.store'
import DI from '../../../../../di/ioc';
import { InputError } from '../../../common/adaptatersComps/input';
import { Button } from '../../base/baseComps/Buttons';
import { CardMD } from '../../base/baseComps/Cards';

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
        <form onSubmit={formik.handleSubmit}
            className='main flex-1   flex justify-center items-center'>
            <div className={`${confirm ?
                'md:grid-rows-[minmax(50px,calc(100dvh_-_19rem))]' :
                'md:grid-rows-[minmax(50px,calc(100dvh_-_21rem))]'}
            grid grid-cols-[1fr] md:grid-cols-[1fr,1fr] 
              items-center justify-between gap-[2%] wRespXL px-[2%] !py-4 w-full`}>
                {/* IMAGE CARDMD */}
                <CardMD
                    className={` min-h-full !pb-0 grid-rows-[100%] !hidden md:!grid h-full w-full`}
                    image={<CardMD.Image
                        src='image/welcome.jpg'>
                        <p className="absolute top-4 !leading-[1] text-[2.8rem] font-bold !text-center !font-comfortaa z-10 !text-white "
                            style={{ textShadow: "0px 1px 4px #00000080" }} >
                            Connecter vous à votre Quartier
                        </p>
                    </CardMD.Image>}
                />

                {/* FORM CARDMD */}
                <CardMD className='min-h-full !overflow-auto h-full flex-1 !flex flex-col justify-between' >
                    <CardMD.Headline className='!pt-2 px-6'>
                        <h3>
                            {lead}
                        </h3>
                        <p
                            data-cy="notif-text"
                            className={`text-sm ${inError ? "error" : ""}`}>
                            {notif}
                        </p>
                    </CardMD.Headline>
                    <CardMD.Subhead className='flex flex-col h-full w-full justify-center overflow-auto gap-3 py-4 px-12 flex-1 '>
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
                        <div className={!confirm ? "hidden" : " flex flex-1 flex-col w-full"}>
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
                    </CardMD.Subhead>
                    <CardMD.Media className="flex ">
                        <div className={`${!checkbox ? 'justify-between  gap-5' : 'justify-between'} flex flex-1 gap-2 h-full  items-end w-full  px-4`}>
                            <div className='flex w-full flex-col-reverse h-full  gap-1 '>
                                <div className='flex flex-1 flex-col w-full gap-2 '>
                                    <Button
                                        data-cy="submit-button"
                                        type="submit"
                                        size="large"
                                        variant="filled"
                                        color='cyan'
                                        elevating>
                                        {submitText}
                                    </Button>
                                </div>
                                <div className={`${!checkbox ? "hidden" : "flex flex-1 items-center  "} `}>
                                    <div className='flex items-center gap-1'>
                                        <Checkbox
                                            data-cy="terms-checkbox"
                                            type="checkbox"
                                            name="checkbox"
                                            className={`border-none shadow-none hover:shadow-none data-[checked=true]:bg-transparent`}
                                            onChange={(e: any) => { formik.values.checkbox = e.target.checked }} >
                                            <Checkbox.Indicator
                                                className="relative opacity-100 flex items-center justify-center">
                                                <Icon style={'opacity-50 group-data-[checked=true]:opacity-100 !absolute  translate-y-[-50%] -left-1'}
                                                    bg
                                                    size='sm'
                                                    color={formik.errors.checkbox ? 'error' : 'slate'}
                                                    icon={""}
                                                />
                                                <Icon style={'opacity-100 group-data-[checked=true]:opacity-0 !absolute  translate-y-[-50%] -left-1'}
                                                    bg
                                                    size='sm'
                                                    color={'cyan'}
                                                    icon={"check"}
                                                />
                                            </Checkbox.Indicator>
                                        </Checkbox>
                                        <div className='!justify-start w-full  -ml-4 flex flex-col'>
                                            <PopUp
                                                variant={"text"}
                                                classNames={`${popOverClass} !border-none scale-95 !flex ounded-full !z-[999999]`}
                                                text={popOverButtonText}
                                                content={popOverContent} />
                                        </div>
                                    </div>
                                    <InputError mt error={formik?.errors.checkbox} />
                                </div>
                            </div>
                        </div>
                    </CardMD.Media>
                    <CardMD.Footer className="px-8 flex-col items-center justify-center  pb-4 gap-1 border-0">

                        <Button
                            type='button'
                            size="large"
                            variant='outlined'
                            className="flex w-full"
                            onClick={async () => {
                                setIsLoggedIn(true)
                                await googleAuth()
                            }}
                        >
                            <img
                                src="image/google.svg"
                                alt="metamask"
                                className="h-6 w-6 absolute left-3" />
                            <div className='pl-8'>{submitText} avec Google &nbsp;</div>
                        </Button>
                    </CardMD.Footer>
                </CardMD>
            </div>
        </form>
    )
}
