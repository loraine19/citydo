import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useState } from 'react';
import { AuthHeader } from './auth.Comps/AuthHeader';
import { Typography, Button, Card, CardBody, Input, CardHeader, CardFooter } from '@material-tailwind/react';;
import { User } from '../../../../domain/entities/User';
import DI from '../../../../di/ioc';
import { Icon } from '../../common/IconComp';
import { InputError } from '../../common/adaptatersComps/input';

export default function ForgotPasswordPage() {
    const resetPassword = async (email: string) => await DI.resolve('resetPasswordUseCase').execute(email)
    const [hidden, setHidden] = useState<boolean>(false)
    const [notif, setNotif] = useState<string>('Entrez votre adresse email et nous vous enverrons un lien pour changer votre mot de passe');
    const formSchema = object({
        email: string().email("Email non valide").required("Email est obligatoire"),
    })
    const formik = useFormik({
        initialValues: new User(),
        validationSchema: formSchema,
        onSubmit: async values => {
            formik.values = values
            const email = formik.values.email.trim()
            const response = await resetPassword(email)
            setNotif(response ? response.message : 'Verifiez votre email')
            setHidden(true)
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
                    <section className='flex flex-col py-6 gap-4 '>
                        <Card className='FixCardNoImage flex  !p-8 w-respLarge'>
                            <CardHeader
                                className="FixCardHeaderNoImage flex-col !my-0 p-8 "
                                floated={false}>
                                <Typography
                                    as="h5" >
                                    Mot de pass oublié
                                </Typography>
                                <Typography >
                                    {notif}
                                </Typography>
                            </CardHeader>
                            <CardBody className='FixCardBody gap-8 my-4 !p-8'>
                                <Input className={`inputStandart ${formik.errors.email ? 'error' : ''}`}
                                    placeholder={"Email"}
                                    name="email"
                                    onChange={formik.handleChange}
                                    onInput={() => setHidden(false)} />
                                <InputError error={formik.errors.email} />
                            </CardBody>
                            <CardFooter className='FixCardFooter'>
                                <Button
                                    size='lg'
                                    type="submit"
                                    color="info"
                                    className={`lgBtn m-auto  ${hidden && ' invisible'}`}>
                                    <Icon icon="send" color="white" />
                                    Recevoir le lien
                                </Button>
                            </CardFooter>
                        </Card>
                    </section>

                </form>
            </main>
        </div>
    )
}