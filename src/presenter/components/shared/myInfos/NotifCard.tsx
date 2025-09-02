import { Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import { Icon } from "../../common/IconComp";
import { NotifView } from "../../../views/viewsEntities/notifViewEntity";
import Chip from "../../common/adaptatersComps/Chip";


type notifCardProps = { notif: any, handleClick: (notif: NotifView) => void }

export function NotifCard(props: notifCardProps) {
    const { handleClick, notif } = props
    const { update, read, typeS, } = notif


    return (
        <Card className={`${!read ? 'FixCardNoImage w-resp w-full !flex !flex-col  !justify-start' : 'hidden'}`}>
            <CardHeader className={"FixCardHeaderNoImage !flex !w-full  !my-0 "} >
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
                <h5
                    className="font-normal truncate ">
                    {notif.title}
                </h5>
                <i
                    className="font-normal truncate ">
                    {notif.description}
                </i>
            </CardBody>
            <CardFooter className="CardFooter items-center  !py-0  !px-4">
                <h6
                    className="font-normal truncate">
                    {update}
                </h6>
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