import { Icon } from "./IconComp";
import { useUxStore } from "../../../application/stores/ux.store";
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

}

export const MoreButton = ({ id, type, flagged, title, className }: moreButtonProps) => {
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
            fill: flagged ?? false,
            color: flagged ? 'red' : '',
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

    const { color } = useUxStore((state) => state);
    const [isOpen, setIsOpen] = useState(false);

    // If you need to manipulate the menu DOM node, use a ref and useEffect
    // Otherwise, remove menuRef if not needed


    return (

        <Menu
            className={className ?? ''}

            closeIcon={
                <></>}
            open={isOpen}
            setOpen={setIsOpen}
            placement="center_bottom"
            trigger={
                <Icon
                    style='-mr-2'
                    color={color ?? 'slate'}
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
                    trailingIcon={

                        <Icon
                            color={item.color ?? 'slate'}
                            fill={item.fill ?? false}
                            size={'lg'}
                            style={`!p-1 `}
                            onClick={() => {
                                item.action();

                                setIsOpen(!isOpen);

                            }}
                            title={'Trier par ' + item.label}

                            icon={item.icon}
                        />}
                    className="rounded-full  pl-4 pr-2 py-0.5 flex items-center font-normal font-roboto w-full justify-between gap-4 hover:!bg-slate-200 hover:!text-underline" >
                    {item.label}
                </MenuItem>
            )}
        </Menu>
    )
}