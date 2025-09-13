import { Typography } from "@material-tailwind/react"
import { Icon } from "../../common/IconComp"
import { AlertValues } from "../../../../domain/entities/Error"
import Cookies from "js-cookie"


export const errorValues: AlertValues = {

    handleConfirm: () => { window.location.replace('/') },
    title: 'Vous êtes inactif ou Une erreur s\'est produite',
    element: <div className="items-center text-center pb-8 flex flex-col gap-4">
        <Typography as="h6">
            Veuillez réessayer de recharger la page
        </Typography>

        <Icon
            bg
            fill
            style='flex-0  shadow-orange shadow-md '
            icon="sync_problem"
            size="3xl"
            color="orange"
            onClick={() => window.location.reload()} />
        <Typography>
            Si la page de charge pas, vous pouvez retourner à la page d'accueil<br></br>
            ou vous pouvez vous re-connecter
        </Typography>


    </div>,
    confirmString: 'Retour à l\'accueil',
    disableCancel: true,
    button2: {
        text: 'Déconnexion', onClick: () => {
            Cookies.remove('user')
            window.location.replace('/signin')
        }
    },
    isOpen: true,

}