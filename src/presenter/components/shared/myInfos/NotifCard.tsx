import { Icon } from "../../common/IconComp";
import { NotifView } from "../../../views/viewsEntities/notifViewEntity";
import Chip from "../../common/adaptatersComps/Chip";
import { CardMD } from "../base/baseComps/Cards";
import { useEffect, useState } from "react";


type notifCardProps = { notif: any, handleClick: (notif: NotifView) => void, read?: boolean }

export function NotifCard(props: notifCardProps) {
    const { handleClick, notif } = props
    const [read, setRead] = useState(props.read ?? false)
    const { update, typeS, } = notif
    const [className, setClassName] = useState('md3-menu-enter')
    useEffect(() => {
        setClassName(!read ? 'md3-menu-enter' : ' md3-animation-scale-out')
        setTimeout(() => {
            setClassName(read ? 'hidden' : '')
        }, 1000);
    }, [read])

    return (
        <CardMD className={` ${className}`}>
            <CardMD.Chips className="justify-between px-3">
                <Chip
                    value={typeS}>
                </Chip>
                <Icon
                    bg reverse fill={true}
                    icon="close"
                    onClick={() => {
                        notif.read = true
                        setRead(true);
                        handleClick(notif)
                    }}
                    color="error"
                    title="fermer la notification"
                    size="sm" />
            </CardMD.Chips>

            <CardMD.Subhead>
                {notif.title}
            </CardMD.Subhead>
            <CardMD.SupportingText className="line-clamp-2">
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