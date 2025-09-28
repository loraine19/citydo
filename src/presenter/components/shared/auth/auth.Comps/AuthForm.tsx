
import { useEffect, useState } from 'react';
import { Icon, IconName } from '../../../common/IconComp';
import { FormikProps } from 'formik';
import { useUserStore } from '../../../../../application/stores/user.store'
import DI from '../../../../../di/ioc';
import { InputError } from '../../../common/adaptatersComps/input';
import { Button } from '../../base/baseComps/Buttons';
import { CardMD } from '../../base/baseComps/Cards';
import { Input } from '../../base/baseComps/Inputs';
import { Checkbox } from '../../base/baseComps/Selectors';
import { Menu, MenuItem } from '../../base/baseComps/Menu';
import { Link } from 'react-router-dom';

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
        <form

            onSubmit={formik.handleSubmit}
            className='main  justify-center items-center'>
            <div className={` grid grid-cols-[1fr] md:grid-cols-[1fr,1fr] content-center
              justify-between gap-[2%] wRespXL px-[2%] !py-2 w-full`}>
                {/* IMAGE CARDMD */}
                <CardMD className={` min-h-full !pb-0 grid-rows-[100%] !hidden md:!grid h-full w-full`}
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
                    <CardMD.Subhead className='flex flex-col h-full w-full justify-center overflow-auto   px-12  pt-2 flex-1 gap-2 '>
                        <Input
                            sizeInput={confirm ? "xs" : "md"}
                            type='email'
                            label={"Email"}
                            name="email"
                            onChange={formik.handleChange}
                            value={formik?.values?.email}
                            error={!!formik?.errors.email}
                            helperText={formik?.errors.email as string ?? ''}
                            data-cy="email-input" />
                        <Input
                            sizeInput={confirm ? "xs" : "md"}
                            error={!!formik?.errors.password}
                            label={"Mot de passe"}
                            name="password"
                            onChange={formik.handleChange}
                            type={passWordInput.value}
                            data-cy="password-input"
                            value={formik?.values?.password}
                            helperText={formik?.errors.password as string ?? ''}
                            trailingIcon={
                                <Icon
                                    onClick={() => toggleInputStyle(passWordInput, setPassWordInput)}
                                    size='lg'
                                    icon={passWordInput.icon as IconName} />}>
                        </Input>
                        <div className={!confirm ? "hidden" : "flex flex-1 flex-col w-full"}>
                            <Input
                                sizeInput={confirm ? "xs" : "md"}
                                error={!!formik?.errors.passwordConfirm}
                                label={"Confirmer le mot de passe"}
                                name="passwordConfirm"
                                type={passWordInput2.value}
                                onChange={formik.handleChange}
                                data-cy="password-confirm-input"
                                value={formik.values.passwordConfirm}
                                helperText={formik?.errors.passwordConfirm as string ?? ''}
                                trailingIcon={<Icon
                                    onClick={() => toggleInputStyle(passWordInput2, setPassWordInput2)}
                                    icon={passWordInput2.icon as IconName}
                                    size='lg' />}
                            />
                        </div>
                    </CardMD.Subhead>
                    <CardMD.Media className="flex flex-1 ">
                        <div className={`${!checkbox ? 'justify-between  gap-5' : 'justify-between'} flex flex-1 flex-col-reverse gap-1 h-full  w-full  px-4`}>
                            <Button
                                size='medium'
                                data-cy="submit-button"
                                type="submit"
                                variant="filled"
                                color='cyan'
                                elevating>
                                {submitText}
                            </Button>
                            <div className={`${!checkbox ? "hidden" : "flex flex-col flex-1 pt-1  px-4 "} `}>
                                <InputError error={formik?.errors.checkbox} />
                                <div className='flex flex-1 w-full items-center justify-between gap-1'>
                                    <Checkbox
                                        size='xl'
                                        checked={formik.values.checkbox}
                                        label="J'accepte les conditions générales"
                                        data-cy="terms-checkbox"
                                        name="checkbox"
                                        onChange={formik.handleChange} >

                                    </Checkbox>
                                    <Menu
                                        MenuKey='terms'
                                        trigger={<Icon
                                            size="md"
                                            icon="expand_content" />}
                                        placement="top">
                                        <MenuItem>
                                            <div className='flex flex-col'>
                                                <span className='text-sm'>En cliquant sur "S'inscrire", vous acceptez nos</span>
                                                <Link to="/terms" className='text-sm text-blue-500'>Conditions d'utilisation</Link>
                                                <span className='text-sm'>et</span>
                                                <Link to="/privacy" className='text-sm text-blue-500'>Politique de confidentialité</Link>
                                            </div>
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </CardMD.Media>
                    <CardMD.Footer className="px-8 flex-col items-center justify-center pb-4 gap-1 border-0">
                        <div className="flex items-center w-full my-1">
                            <hr className="flex-grow border-t border-[var(--md3-outlined)]" />
                            <span className="mx-2 opcity-50text-sm">ou</span>
                            <hr className="flex-grow border-t border-[var(--md3-outlined)]" />
                        </div>
                        <Button
                            type='button'
                            variant='tonal'
                            className="flex w-full relative"
                            onClick={async () => {
                                setIsLoggedIn(true)
                                await googleAuth()
                            }}
                        >
                            <img
                                src="image/google.svg"
                                alt="google"
                                className="h-6 w-6 absolute left-3" />
                            <div className='pl-8'>{submitText} avec Google&nbsp;</div>
                        </Button>
                    </CardMD.Footer>

                </CardMD>
            </div >
        </form >
    )
}
