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
    const { navBottom, setColor, color } = useUxStore((state) => state);
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
                (navBottom ?
                    ` opacity-100 anim  wRespXL justify-between gap-[4%] md:gap-6 px-2 lg:!px-0 pb-1 ` :
                    'z-0 md:gap-4 gap-3  ') +
                ` flex items-center  w-full `
            }>
                <NavigationBar
                    value={navValue}
                    onValueChange={(value) => setNavValue(value)}
                    className={`
                    ${navBottom ?
                            'border-[1px] rounded-full !shadow bg-slate-50 border-slate-300 !flex-1 !max-w-full py-0 px-0 gap-[0.5vw] justify-between' :
                            `shadow-none w-full  justify-around pb-2 md:pb-0  md:px-2`}
                    items-center overflow-x-auto overflow-y-hidden flex !max-w-[calc(100vw-5.5rem)]  h-full w-full `}>

                    {navItems.map(({ to, icon, label, color }: NavItem, index) => {
                        const active = location.pathname === to;
                        if (active && navValue !== label) setNavValue(label);
                        return (

                            <NavigationBarItem
                                className={`md3-text-${color}
                                    ${navBottom ? 'md:px-14 h-[60px]  md:w-max' : '!rounded-none !p-0'}
                                    ${navBottom ? active ? `md3-${color}-container animSlide w-[62px]` : ` !min-w-[70px]` : ``}
                                    
                                        `}
                                active={active}
                                icon={
                                    <Icon
                                        disabled={active}
                                        style={

                                            `${(active && !navBottom) ? `` : ''}
                                             ${!navBottom ? active ? `animSlide border-b md3-border-${color} py-1 md:border-none md:py-0 px-2 ` : `px-1.5` : ``} `
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
                                            ' md:!text-[0.9rem] ' :
                                            ' md:!text-[0.8rem] pb-[4px] '
                                        } 
                                            ${active ? 'underline underline-offset-[6px] ' : ''} `}>
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
                        mainProps={{
                            className: `rounded-full`,
                            size: navBottom ? 'large' : 'small',
                            icon: { icon: openFab ? 'close' : 'edit', size: navBottom ? '2xl' : 'lg' },
                            color: color as Md3Colors ?? 'slate'
                        }}
                        placement={navBottom ? "top" : "bottom"}
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