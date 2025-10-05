import { useLocation, useNavigate } from 'react-router-dom';
import { Icon, IconName } from "../IconComp";
import { useUxStore } from "../../../../application/stores/ux.store";
import { Fab, FabMenu } from "../../shared/base/baseComps/Fabs";
import { Md3Colors } from "../../shared/base/baseComps/Buttons";
import { useState } from "react";
import { NavigationBar, NavigationBarItem } from "../../shared/base/baseComps/Navigations";

interface NavBarProps {
    handleClick?: () => void;
    mainPage?: boolean;
    placement?: "top" | "bottom";
    color?: string;
    addFab?: boolean;
}

export const NavLinks: React.FC<NavBarProps> = ({ placement, mainPage, addFab }) => {
    const location = useLocation()
    const type = new URLSearchParams(location.pathname.split("/")[1]).toString().replace("=", '');
    const { setColor, color, hideNavBottom } = useUxStore((state) => state);
    const navigate = useNavigate()

    type NavItem = {
        to: string;
        icon: IconName;
        label: string;
        color: { border: string, background: string, text: string, col: string } | any
    }

    //// CONTAINER STYLE 
    const isBottom = placement === "bottom"
    const containerStyle = isBottom ? `rounded-t-[2rem] pt-3 px-3 !flex-1 md3-elevation-5 !max-w-full !border-b-0 justify-between md3-primary-container
    ` : `!shadow-none w-full md3-elevation-0 justify-around  md:pb-0  md:px-2`


    //// NAV ITEMS
    const navItems: NavItem[] = [
        { to: "/", icon: "home", label: "Home", color: 'slate' },
        { to: "/service", icon: "partner_exchange", label: "Service", color: 'sky' },
        { to: "/evenement", icon: "event", label: "Évenement", color: 'cyan' },
        { to: "/annonce", icon: "dashboard", label: "Annonce", color: 'rose' },
        { to: "/vote", icon: "ballot", label: `Vote`, color: 'orange' },
    ]

    //// ADD BUTTON ITEM
    const addBtnItem: NavItem[] = !mainPage ? [{
        to: `/${type}/create`,
        icon: ({
            service: "partner_exchange",
            evenement: "event",
            annonce: "dashboard",
            vote: "ballot",
            groupe: "groups"
        }[type] || "add") as IconName,
        label: `Ajouter un ${type}`,
        color: color,
    }] : [
        {
            to: `/service/create`,
            icon: "partner_exchange" as IconName,
            label: `Ajouter un Service`,
            color: 'sky'
        }, {
            to: `/evenement/create`,
            icon: "event" as IconName,
            label: `Ajouter un Événement`,
            color: 'cyan'
        },
        {
            to: `/annonce/create`,
            icon: "dashboard" as IconName,
            label: `Ajouter une Annonce`,
            color: 'rose'
        },
        {
            to: `/vote/create`,
            icon: "ballot" as IconName,
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
                `${hideNavBottom ? 'md3-animation-slide-out-down' : 'md3-animation-slide-up'}
                ${isBottom ? ` wRespXLMargin  ` : ' -mt-1.5   '}                 
                 flex items-center w-full !z-[3] `
            }>
                <NavigationBar
                    value={navValue}
                    onValueChange={(value) => setNavValue(value)}
                    className={` 
                    ${containerStyle}  border-t-[1px] !border-[var(--md3-surface)] items-center overflow-x-auto overflow-y-hidden flex h-full w-full `}>

                    {navItems.map(({ to, icon, label, color }: NavItem, index) => {
                        const active = location.pathname === to;
                        if (active && navValue !== label) setNavValue(label);
                        return (

                            <NavigationBarItem
                                row={!isBottom}
                                className={`md3-text-${color} 
                                    ${isBottom ? 'md:px-12  md:w-max ' : ' !rounded-none !p-0'}
                                    ${isBottom ? active ?
                                        `md3-${color}-container md3-elevation-0 md3-animation-ripple `
                                        : `max-w-[50px] sm:max-w-maw last:mr-[2vw] first:ml-[2vw]` : ``}
                                    
                                        `}
                                active={active}
                                icon={
                                    <Icon
                                        disabled={active}
                                        style={`${!isBottom ? active ? ` border-b md3-border-${color} py-1 md:border-none md:py-0 px-2 ` : `px-1.5` : active ? `md3-animation-scale-in ` : ''} `
                                        }
                                        reverse={false}
                                        clear={isBottom}
                                        size={isBottom ? '3xl' : 'xl'}
                                        icon={icon}
                                        fill={active} />
                                }
                                label={
                                    <span className={`hidden md:block
                                            ${isBottom ?
                                            ' text-[0.7rem] ' :
                                            ' !text-[0.8rem] pb-[4px] '
                                        }
                                            ${active && !isBottom ? 'underline underline-offset-[6px] ' : ''} `}>
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
                {addFab &&
                    <FabMenu
                        backdropBlur={true}
                        open={openFab}
                        setOpen={setOpenFab}
                        className={`${isBottom ?
                            'bottom-[calc(100%_+_1rem)] fixed right-2' :
                            'absolute top-[calc(100dvh_-_6rem)] -right-[6rem] md:-right-[5.5rem]'} `}
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
                                className="max-w-max self-end shadow-lg mr-4 gap-4"
                                variant="tonal"
                                key={index}
                                size="extended"
                                color={color as Md3Colors ?? 'slate'}
                                icon={{ icon: icon, size: 'xl' }}
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
