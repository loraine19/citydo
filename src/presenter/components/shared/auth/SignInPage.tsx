//src/presenter/components/shared/auth/SignInPage.tsx
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { AuthForm } from './auth.Comps/AuthForm';
import { AuthHeader } from './auth.Comps/AuthHeader';
import { Typography, Button } from '@material-tailwind/react';
import DI from '../../../../di/ioc';
import { useUserStore } from '../../../../application/stores/user.store';
import { AccessDTO, VerifyDTO } from '../../../../infrastructure/DTOs/AuthDTO';

export default function SignInPage() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    const msg = searchParams.get("msg");
    const [notif, setNotif] = useState<string>(email && 'vous pouvez maintenant vous connecter' || msg || '')
    const [inError, setInError] = useState<boolean>(false);
    const signIn = async (accessData: AccessDTO) => await DI.resolve('signInUseCase').execute(accessData)
    const signInVerify = async (verifyData: VerifyDTO) => await DI.resolve('signInVerifyUseCase').execute(verifyData)
    const navigate = useNavigate();


    const formSchema = object({
        email: string().email("Email non valide").required("Email est obligatoire"),
        password: string().required("Mot de passe est obligatoire").min(6, "minimum 6 charactères"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: new AccessDTO(),
        validationSchema: formSchema,
        onSubmit: async (values) => {
            setInError(false)
            setNotif('')
            token ? await handleSignInVerify(values.email, values.password, token) : await handleSignIn(values.email, values.password)
        },
    });
    const setUser = useUserStore((state) => state.setUser);
    const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);

    const handleSignInVerify = async (email: string, password: string, token: string) => {
        const verifyData = { email, password, verifyToken: token }
        const authVerify = await signInVerify(verifyData);
        if (authVerify?.user) {
            setUser(authVerify.user);
            setNotif('Votre compte est vérifié et vous êtes connecté, redirection ...');
            setIsLoggedIn(true)
            setTimeout(() => { window.location.replace("/profile/create") }, 1000);
        } else {
            setNotif(authVerify?.error || authVerify?.message || 'Erreur de connexion');
            formik.resetForm();
        }
    };

    const handleSignIn = async (email: string, password: string) => {
        const accessData = { email, password }
        try {
            const auth = await signIn(accessData)
            if (auth?.user) {
                setUser(auth.user);
                setNotif('Vous êtes connecté, redirection ...');
                setIsLoggedIn(true)
                setTimeout(() => { navigate('/') }, 1000);
            } else {
                setInError(true);
                setNotif('Erreur : ' + auth?.message as string || 'Erreur de connexion');
                formik.resetForm()
            }
        }
        catch (error: unknown) {
            const catchError = new Error(error as string);
            setInError(true);
            setNotif(catchError?.message as string || 'Erreur de connexion');
        }
    }

    const terms = "Vous resterez connecté pour 48h ...";

    return (
        <>
            <AuthHeader />
            <AuthForm
                formik={formik}
                lead="Acceder à votre compte"
                notif={notif}
                popOverContent={terms}
                popOverButtonText="Rester connecté"
                popOverClass="font-light text-start"
                submitText="Se connecter"
                confirm={false}
                inError={inError}
            />
            <footer className="flex flex-col items-center gap-1 pb-[4.5rem] justify-center pt-5">
                <Link to="/motdepasse_oublie">
                    <Typography
                        className="text py-2 nowrap text-center underline underline-offset-8 uppercase">
                        Mot de pass oublié
                    </Typography>
                </Link>
                <Typography variant="small" className="flex justify-center">
                    Pas encore de compte ?
                </Typography>
                <Link to="/signup">
                    <Button className="lgBtn ">
                        inscrivez-vous
                    </Button>
                </Link>
            </footer>
        </>
    );
}
