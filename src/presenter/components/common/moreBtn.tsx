import { Icon } from "./IconComp";
import { useState } from "react";
import { Menu, MenuItem } from "../shared/base/baseComps/Menu";
import { useNavigate } from "react-router-dom";
import ShareDiv from "./shareDiv";

type moreButtonProps = {
    id: number;
    type?: string;
    flagged?: boolean;
    title: string;
    className?: string;
    ref?: boolean;
    divRef?: any;

}

export const MoreButton = ({ id, type, flagged, title, className }: moreButtonProps) => {
    const navigate = useNavigate()


    const iconList: any[] = [
        ...(type !== 'cagnotte' ? [{
            icon: 'flag_2',
            label: flagged ? 'Déja signalé' : 'Signaler',
            key: `flag${id}`,
            fill: flagged,
            flagged: flagged,
            color: flagged ? 'error' : 'error',
            action: () => { setIsOpen(false); navigate(`/flag/${type}/${id}`) },
        }] : []),
        {
            icon: 'share',
            label: 'Partager',
            key: `share${id}`,
            color: 'green',
            action: () => { setOpenShare(true) }
        },
    ]

    const [isOpen, setIsOpen] = useState(false);
    const [openShare, setOpenShare] = useState(false);

    // If you need to manipulate the menu DOM node, use a ref and useEffect
    // Otherwise, remove menuRef if not needed


    return (
        <div className="relative">
            <Menu
                title={!openShare ? "Plus d'options" : undefined}
                closeIcon={openShare ? <> </> : undefined}
                blurBack
                MenuKey={`more-menu-${id}`}
                className={className ?? '' + ' '}
                open={isOpen}
                setOpen={(open: boolean) => { setIsOpen(open); setOpenShare(false) }}
                placement={'bottom-left'}
                trigger={
                    <Icon

                        fill
                        style='!p-0 z-40  h-[2rem] md3-stroke   max-h-max'
                        color={''}
                        textIcon="⋮"
                        size={'3xl'}
                    />}>


                {openShare ?
                    <><MenuItem leadingIcon={
                        <Icon onClick={() => setOpenShare(false)} bg fill size="md" icon="arrow_back" />}>
                        Retour
                    </MenuItem>
                        <ShareDiv
                            url={type && id ? `${window.location.origin}/${type}/${id}` : window.location.origin}
                            text={title} />

                    </> :
                    iconList.map((item: any, index: number) =>
                        <MenuItem
                            key={index}
                            data-cy={item.key ?? item.label}
                            onClick={() => {
                                item.action();
                            }}
                            leadingIcon={
                                <Icon
                                    bg
                                    color={item.color ?? 'slate'}
                                    fill={item.fill ?? false}
                                    size={'md'}
                                    onClick={() => {
                                        item.action();
                                    }}
                                    title={item.label}
                                    icon={item.icon}
                                />}
                            className="flex !pr-12 " >
                            {item.label}
                        </MenuItem>
                    )}

            </Menu>
        </div>
    )
}