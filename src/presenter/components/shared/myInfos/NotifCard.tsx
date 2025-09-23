import { Icon } from "../../common/IconComp";
import { NotifView } from "../../../views/viewsEntities/notifViewEntity";
import Chip from "../../common/adaptatersComps/Chip";
import { CardMD } from "../base/baseComps/Cards";


type notifCardProps = { notif: any, handleClick: (notif: NotifView) => void }

export function NotifCard(props: notifCardProps) {
    const { handleClick, notif } = props
    const { update, read, typeS, } = notif


    return (
        <CardMD className={`anim ${!read ? '' : 'hidden'}`}>
            <CardMD.Chips className="justify-between px-3">
                <Chip
                    value={typeS}>
                </Chip>
                <Icon
                    bg reverse fill={true}
                    icon="close"
                    onClick={() => handleClick(notif)}
                    color="error"
                    title="fermer la notification"
                    size="sm" />
            </CardMD.Chips>

            <CardMD.Subhead>
                {notif.title}
            </CardMD.Subhead>
            <CardMD.SupportingText>
                {notif.description}
            </CardMD.SupportingText>
            <CardMD.Footer className="justify-between  ">
                <i
                    className="font-normal truncate">
                    {update}
                </i>
                {notif.link &&
                    <Icon
                        color='slate'
                        icon="keyboard_arrow_right"
                        link={notif.link}
                        title={`voir les details de ${notif.title}`}
                        bg size='sm'
                        fill />}
            </CardMD.Footer>
        </CardMD>

    );
}