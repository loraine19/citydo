import { Typography } from "@material-tailwind/react";
import { User } from "../../../domain/entities/User";
import { Link } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

type ContactDivProps = {
    user: User
}
export const ContactDiv = ({ user }: ContactDivProps): JSX.Element => {
    return (
        <div className="flex flex-1 flex-col gap-2">

            <Typography className="font-medium">
                {user?.Profile.firstName}
                par mail
            </Typography>

            <Link to={`mailto:${user?.email}`} className="text-orange-500 font-medium underline">
                {user?.email}
            </Link>
            <Typography className="font-medium"> ou télèphone :</Typography>

            <Link to={`tel:${user?.Profile.phone}`} className="text-orange-500 font-medium underline">
                {user?.Profile.phone}
            </Link>
            <Typography className="font-medium"> ou par chat  :</Typography>
            <Link to={'/chat?with=' + user.id} className="text-orange-500 font-medium underline">
                <Typography>Envoyer un message</Typography>
            </Link>
        </div>
    );
};
