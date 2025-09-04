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
                        className="cyanChip text-ellipsis  " >
                    </Chip>
                    <Icon
                        icon="close"
                        onClick={() => handleClick(notif)}
                        color="red"
                        title="fermer la notification"
                        size="xl" />
                </div>
            </CardHeader>
            <CardBody className="FixCardBody max-h-max !-mt-3 !py-0">
                <h6
                    className=" truncate ">
                    {notif.title}
                </h6>
                <p
                    className="description">
                    {notif.description}
                </p>
            </CardBody>
            <CardFooter className="justify-between  !flex !max-h-max items-center !my-0 !py-0  ">
                <i
                    className="font-normal truncate">
                    {update}
                </i>
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