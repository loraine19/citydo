import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import { AuthHeader } from "../auth/auth.Comps/AuthHeader";
import { useAlertStore } from "../../../../application/stores/alert.store";
import { useEffect } from "react";
import { NavBarBottom } from "../../common/NavBarBottom";



export default function NotFindPage() {
    const navigate = useNavigate();
    const url: string = (new URLSearchParams(useLocation().pathname.split("/").join("-"))).toString().replace("=", '').replace('-', ' ')
    const { setAlertValues, setOpen } = useAlertStore()


    useEffect(() => {
        setAlertValues({
            title: 'Désolé, cette page n\'existe pas',
            element: `Veuillez vérifier l\'élement ${url} ou retourner à la page d\'accueil.`,
            confirmString: 'Retour à l\'accueil',
            disableConfirm: true,
            handleConfirm: () => { navigate('/'); setOpen(false) },
        });
        setOpen(true)
    }, [url])


    return (
        <>
            <header className="h-[7rem] flex-col flex items-center justify-center pt-6 relative">
                <AuthHeader />
            </header>
            <main className="flex items-center justify-evenly h-full py-10">
                <Typography variant="lead" className="flex items-center justify-center mt-2">
                    {`élements ${url} non trouvés désolé`}
                </Typography>
                <Button onClick={() => navigate('/')} className="rounded-full w-max p-5 text-sm !font-light">retour à l' acceuil</Button>
            </main>
            <NavBarBottom addBtn={false} />
        </>
    );
}