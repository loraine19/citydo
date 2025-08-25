import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useState } from 'react';
import { AuthHeader } from './auth.Comps/AuthHeader';
import { Typography, Button, Card, CardBody, Input, CardFooter, CardHeader } from '@material-tailwind/react';
import { useSearchParams } from 'react-router-dom';
import { User } from '../../../../domain/entities/User';
import { Icon } from '../../common/IconComp';
import DI from '../../../../di/ioc';
import { ResetDTO } from '../../../../infrastructure/DTOs/AuthDTO';
import { InputError } from '../../common/adaptatersComps/input';


export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const [newUser,] = useState<User>({} as User);
    const [notif, setNotif] = useState<string>(' Entrez votre nouveau mot de passe');
    const params = { email: searchParams.get("email"), token: searchParams.get("token") }
    const { email, token } = params
    const updatePassword = async (data: ResetDTO) => await DI.resolve('resetPasswordUpdateUseCase').execute(data)

    const passwordType = { value: 'password', icon: 'visibility' }
    const textType = { value: 'text', icon: 'visibility_off' }
    const [passWordInput, setPassWordInput] = useState<{ value: string, icon: string }>(passwordType)


    const formSchema = object({
        password: string().required("password est obligatoire").min(8, "minimum 8 charactères"),
    })

    const formik = useFormik({
        initialValues: newUser,
        validationSchema: formSchema,
        onSubmit: async values => {
            formik.values = values
            const updatepassword = await updatePassword({ email: email as string, password: formik.values.password, resetToken: token as string })
            if (updatepassword.message) {
                setNotif(updatepassword?.message);
                setTimeout(() => { window.location.href = '/signin?msg=' + updatepassword?.message + '&?email=' + email }, 1000);
            }
            else if (updatepassword.error) { setNotif(updatepassword?.error) }
            else { setNotif('une erreur est survenue') }
        },
    });


    return (
        <div className=" items-center gap-4">
            <header className=" w-respLarge flex justify-between items-center">
                <AuthHeader />
                <Icon fill size='3xl' icon='cancel' title='fermer' link='/signin' />
            </header>
            <main className=' h-full py-8 '>
                <form onSubmit={formik.handleSubmit} className='flex flex-col '  >
                    <section className='flex flex-col py-6  '>
                        <Card className='FixCardNoImage flex py-8 w-respLarge'>
                            <CardHeader className="FixCardHeaderNoImage flex-col !my-0 p-8 " floated={false}>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    Reinitialisation du mot de passe
                                </Typography>
                                <Typography color="gray">
                                    {notif}
                                </Typography>
                            </CardHeader>
                            <CardBody className='FixCardBody gap-8 !px-10 py-2 mb-4'>
                                <Input
                                    labelProps={{ className: "before:content-none after:content-none" }}
                                    className={`inputStandart ${formik.errors.email ? 'error' : ''}`}
                                    placeholder={'email'}
                                    name="email"
                                    value={email as string}
                                    disabled={true} />
                                <InputError error={formik.errors.email} />
                                <Input
                                    labelProps={{ className: "before:content-none after:content-none" }}
                                    className={`inputStandart ${formik.errors.password ? 'error' : ''}`}
                                    placeholder={"Mot de passe"}
                                    type={passWordInput.value}
                                    icon={
                                        <Icon
                                            onClick={() => {
                                                passWordInput.value === 'password' ? setPassWordInput(textType) : setPassWordInput(passwordType)
                                            }}
                                            icon={passWordInput.icon}
                                            style='!-mt-4 -ml-4' />
                                    }
                                    name="password"
                                    onChange={formik.handleChange} />
                                <InputError error={formik.errors.password} />
                            </CardBody>
                            <CardFooter className='FixCardFooter'>
                                <Button
                                    type="submit"
                                    className="lgBtn gap-4" >
                                    <Icon icon="save" color="white" />
                                    Enregistrer
                                </Button>
                            </CardFooter>
                        </Card>
                    </section>
                </form>
            </main>
        </div>
    )
}