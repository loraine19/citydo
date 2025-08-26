import { Card, CardBody, CardFooter, Typography, CardHeader } from "@material-tailwind/react";
import { Icon } from "../../common/IconComp";
import { NotifView } from "../../../views/viewsEntities/notifViewEntity";
import Chip from "../../common/adaptatersComps/Chip";


type notifCardProps = { notif: any, handleClick: (notif: NotifView) => void }

export function NotifCard(props: notifCardProps) {
    const { handleClick, notif } = props
    const { update, read, typeS, } = notif


    return (
        <Card className={`${!read ? 'FixCardNoImage w-resp w-full !flex  !justify-start' : 'hidden'}`}>
            <CardHeader className={"FixCardHeaderNoImage !flex !w-full  !my-0 "} floated={false}>
                <div className="ChipDivNoImage w-full ">
                    <Chip
                        size='sm'
                        value={typeS}
                        className="CyanChip text-ellipsis  " >
                    </Chip>
                    <Icon
                        icon="cancel"
                        onClick={() => handleClick(notif)}
                        color="red"
                        title="fermer la notification"
                        size="2xl"
                        style="" />
                </div>
            </CardHeader>
            <CardBody className="FixCardBody max-h-max !-mt-3 !py-0">
                <Typography
                    className="font-normal truncate ">
                    {notif.title}
                </Typography>
                <Typography
                    variant="small"
                    className="font-normal truncate ">
                    {notif.description}
                </Typography>
            </CardBody>
            <CardFooter className="CardFooter items-center  !pt-0  !px-4">
                <Typography
                    variant="small"
                    className="font-normal truncate">
                    {update}
                </Typography>
                {notif.link &&
                    <Icon
                        icon="arrow_circle_right"
                        link={notif.link}
                        title={`voir les details de ${notif.title}`}
                        bg clear
                        fill />}
            </CardFooter>
        </Card>

    );
}