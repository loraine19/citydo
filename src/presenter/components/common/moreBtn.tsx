import { Icon } from "./IconComp";
import { useState } from "react";
import { Menu, MenuItem } from "../shared/base/baseComps/Menu";
import { useNavigate } from "react-router";
import { useAlertStore } from "../../../application/stores/alert.store";
import { AlertValues } from "../../../domain/entities/Error";
import ShareDiv from "./shareDiv";

type moreButtonProps = {
    id?: number;
    type?: string;
    flagged?: boolean;
    title?: string;
    className?: string;
    ref?: boolean;
    divRef?: any;

}

export const MoreButton = ({ id, type, flagged, title, className, ref }: moreButtonProps) => {
    const navigate = useNavigate()
    const { setAlertValues, setOpen } = useAlertStore((state) => state);
    const shareValues: AlertValues = {
        isOpen: true,
        title: 'Partager',
        element: <ShareDiv text={title} url={window.location.origin + `/${type}/${id}`} />,
        disableConfirm: true,
        close: () => setOpen(false),
        handleConfirm() {
            setAlertValues({ isOpen: false, title: '', })
        },

    }

    const iconList: any[] = [
        {
            icon: 'flag_2',
            label: 'Signaler',
            key: `flag${id}`,
            fill: flagged,
            flagged: flagged,
            color: flagged ? 'red' : 'slate',
            action: () => { navigate(`/flag/${type}/${id}`) },
        },
        {
            icon: 'share',
            label: 'Partager',
            key: 'share',
            action: () => {
                setAlertValues(shareValues)
            }

        }

    ]

    const [isOpen, setIsOpen] = useState(false);

    // If you need to manipulate the menu DOM node, use a ref and useEffect
    // Otherwise, remove menuRef if not needed


    return (

        <Menu
            ref={ref}
            blurBack
            key={`more-menu-${id}`}
            className={className ?? '' + ''}
            open={isOpen}
            setOpen={setIsOpen}
            placement={'auto'}
            trigger={
                <Icon
                    style='-mr-0'
                    color={'slate'}
                    icon={isOpen ? "arrow_drop_up" : "more_vert"}
                    size="xl"
                />}>


            {iconList.map((item: any, index: number) =>
                <MenuItem
                    key={index}
                    data-cy={item.key ?? item.label}
                    onClick={() => {
                        item.action();
                        setIsOpen(!isOpen);
                    }}
                    leadingIcon={
                        <Icon
                            bg
                            color={item.flagged ? 'error' : 'slate'}
                            fill={item.fill ?? false}
                            size={'md'}
                            onClick={() => {
                                item.action();
                                setIsOpen(!isOpen);
                            }}
                            title={item.label}
                            icon={item.icon}
                        />}
                    className="flex  pl-3 " >
                    {item.label}
                </MenuItem>
            )}
        </Menu>
    )
}