import { useFormik } from 'formik';
import { object, string, ref, boolean } from 'yup';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AuthForm } from './auth.Comps/AuthForm';
import { AuthHeader } from './auth.Comps/AuthHeader';
import { Typography, Button } from '@material-tailwind/react';
import DI from '../../../../di/ioc';
import { terms } from '../../../../domain/constants/constants';
import { AccessDTO } from '../../../../infrastructure/DTOs/AuthDTO';
import { SignUpDTO } from '../../../../infrastructure/DTOs/SignUpDTO';

export default function SignUpPage() {
    const [notif, setNotif] = useState<string>("");
    const [hidden, setHidden] = useState<boolean>(false)

    ////SIGN UP
    const signUp = async (accessData: AccessDTO) => await DI.resolve('signUpUseCase').execute(accessData)

    ////FORMIK
    const formSchema = object({
        email: string().email("Email non valide").required("Email est obligatoire"),
        password: string().required("Mot de passe est obligatoire").min(8, "minimum 8 lettres"),
        passwordConfirm: string().oneOf([ref('password')], "les mots de passes doivent correspondre").required("Confirmation obligatoire"),
        checkbox: boolean().oneOf([true], "Vous devez accepter les termes et conditions").required("Vous devez accepter les termes et conditions")
    })

    const formik = useFormik({
        initialValues: new SignUpDTO(),
        validationSchema: formSchema,
        onSubmit: values => {
            if (values.email && values.password === values.passwordConfirm && values.checkbox) {
                const connect = async () => {
                    const accessData = { email: values.email, password: values.password }
                    const result = await signUp(accessData)
                    if (result && result.message.includes("created")) {
                        setNotif(result.message);
                        formik.resetForm();
                        setHidden(true)
                    }
                    else setNotif(result?.message || "Erreur inconnue")
                }
                connect()
            }
            else setNotif("Veuillez remplir correctement tout les champs")
        },
    });


    return (
        <>
            <AuthHeader />
            <main>
                <AuthForm
                    lead="Creer votre compte"
                    notif={notif}
                    popOverContent={terms}
                    popOverButtonText="les condition d'utilisiation"
                    popOverClass="font-light underline underline-offset-8 text-start "
                    submitText="S'enregistrer"
                    confirm
                    checkbox
                    formik={formik}
                    hidden={hidden}
                />
            </main>

            <footer className="flex flex-col items-center gap-1 pb-[4rem] justify-center pt-4">
                <Typography
                    variant="small"
                    className=" flex justify-center">
                    Vous avez deja un compte?
                </Typography>
                <Link to="/signin">
                    <Button
                        className="rounded-full !lgBtn">
                        Connectez-vous
                    </Button>
                </Link>
            </footer>
        </>
    )
}
