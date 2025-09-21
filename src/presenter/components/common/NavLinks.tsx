import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from "./IconComp";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { useUxStore } from "../../../application/stores/ux.store";
import { Fab, FabMenu } from "../shared/base/baseComps/Fabs";
import { Md3Colors } from "../shared/base/baseComps/Buttons";
import { useState } from "react";
import { NavigationBar, NavigationBarItem } from "../shared/base/baseComps/Navigations";

interface NavBarProps {
    handleClick?: () => void;
    addBtn?: boolean;
    color?: string;
}

export const NavBarSection: React.FC<NavBarProps> = ({ addBtn }) => {
    const location = useLocation()
    const type = new URLSearchParams(location.pathname.split("/")[1]).toString().replace("=", '');
    const { } = useNotificationStore((state) => state);
    const { navBottom, setColor, color, hideNavBottom } = useUxStore((state) => state);
    const navigate = useNavigate()

    type NavItem = {
        to: string;
        icon: string;
        label: string;
        color: { border: string, background: string, text: string, col: string } | any
    }

    //// NAV ITEMS
    const navItems: NavItem[] = [
        { to: "/", icon: "home", label: "Home", color: 'slate' },
        { to: "/service", icon: "partner_exchange", label: "Service", color: 'sky' },
        { to: "/evenement", icon: "event", label: "Évenement", color: 'cyan' },
        { to: "/annonce", icon: "dashboard", label: "Annonce", color: 'rose' },
        { to: "/vote", icon: "ballot", label: `Vote`, color: 'orange' },
    ]

    //// ADD BUTTON ITEM
    const addBtnItem = type ? [{
        to: `/${type}/create`,
        icon: {
            service: "partner_exchange",
            evenement: "event",
            annonce: "dashboard",
            vote: "ballot",
            groupe: "groups"
        }[type] || "add",
        label: `Ajouter un ${type}`,
        color: color,
    }] : [
        {
            to: `/service/create`,
            icon: "partner_exchange",
            label: `Ajouter un Service`,
            color: 'sky'
        }, {
            to: `/evenement/create`,
            icon: "event",
            label: `Ajouter un Événement`,
            color: 'cyan'
        },
        {
            to: `/annonce/create`,
            icon: "dashboard",
            label: `Ajouter une Annonce`,
            color: 'rose'
        },
        {
            to: `/vote/create`,
            icon: "ballot",
            label: `Créer un Vote`,
            color: 'orange'
        }
    ]

    const [openFab, setOpenFab] = useState(false);
    const [navValue, setNavValue] = useState('Accueil');


    return (
        <>

            {/* CONTAINER */}
            <div className={
                ` ${hideNavBottom ? 'md3-menu-leave' : 'h-full animSheetRev '}` +
                (navBottom ?
                    ` wRespXLMargin px-0.5 ` :
                    ' -mt-1.5   ') +
                ` flex items-center w-full  `
            }>
                <NavigationBar
                    value={navValue}
                    onValueChange={(value) => setNavValue(value)}
                    className={` 
                    ${hideNavBottom ? '   ' : ' '}
                    ${navBottom ?
                            ' rounded-t-[2rem] py-2.5 px-3 !flex-1 md3-elevation-5 !max-w-full !border-b-0 justify-between md3-primary-container ' :
                            ` !shadow-none w-full md3-elevation-0 justify-around pb-2 md:pb-0  md:px-2`}
                    items-center overflow-x-auto  overflow-y-hidden flex h-full w-full `}>

                    {navItems.map(({ to, icon, label, color }: NavItem, index) => {
                        const active = location.pathname === to;
                        if (active && navValue !== label) setNavValue(label);
                        return (

                            <NavigationBarItem
                                row={!navBottom}
                                className={`md3-text-${color} 
                                    ${navBottom ? 'md:px-12  md:w-max ' : ' !rounded-none !p-0'}
                                    ${navBottom ? active ?
                                        `md3-${color}-container md3-elevation-0 animSlide  border-[1px] border-black/5 `
                                        : ` max-w-[50px] sm:max-w-maw last:mr-[2vw] first:ml-[2vw]` : ``}
                                    
                                        `}
                                active={active}
                                icon={
                                    <Icon
                                        disabled={active}
                                        style={
                                            `${(active && !navBottom) ? `` : ''}
                                             ${!navBottom ? active ? ` border-b md3-border-${color} py-1 md:border-none md:py-0 px-2 ` : `px-1.5` : ``} `
                                        }
                                        reverse={false}
                                        clear={navBottom}
                                        size={navBottom ? '2xl' : 'xl'}
                                        icon={icon}
                                        fill={active} />
                                }
                                label={
                                    <span className={`hidden md:block
                                            ${navBottom ?
                                            ' text-[0.7rem] ' :
                                            ' !text-[0.8rem] pb-[4px] '
                                        } 
                                            ${active && !navBottom ? 'underline underline-offset-[6px] ' : ''} `}>
                                        {label}
                                    </span>}
                                value={label}
                                key={index}
                                onClickAction={() => {
                                    setColor(color)
                                    navigate(to)
                                }}
                            >
                            </NavigationBarItem>
                        )
                    })}
                </NavigationBar>
                {addBtn &&
                    <FabMenu
                        backdropBlur={true}
                        open={openFab}
                        setOpen={setOpenFab}
                        className={`${navBottom ?
                            'bottom-[calc(100%_+_1rem)] fixed right-2' :
                            'fixed bottom-[1rem] right-2 lg:mr-[calc(50dvw-550px)]'}`}
                        mainProps={{
                            className: ` rounded-[5rem]  `,
                            size: 'large',
                            icon: { icon: openFab ? 'close' : 'add', size: '2xl' },
                            color: color as Md3Colors ?? 'slate'
                        }}
                        placement={'top'}
                    >
                        {addBtnItem.map(({ to, icon, label, color }: NavItem, index) =>
                            <Fab
                                className="max-w-max self-end shadow-lg mr-4"
                                variant="tonal"
                                key={index}
                                size="extended"
                                color={color as Md3Colors ?? 'slate'}
                                icon={{ icon: icon, size: 'lg' }}
                                text={label}
                                onClick={() => {
                                    navigate(to);
                                    setOpenFab(false);
                                }} >
                                {label}
                            </Fab>
                        )}
                    </FabMenu>}
            </div>

        </>
    );
};