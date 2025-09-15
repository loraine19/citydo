import { Navbar, Typography } from "@material-tailwind/react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from "./IconComp";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { useUxStore } from "../../../application/stores/ux.store";
import { Fab, FabMenu } from "../shared/base/baseComps/Fabs";
import { Md3Colors } from "../shared/base/baseComps/Buttons";
import { useState } from "react";

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
        { to: "/", icon: "home", label: "Home", color: { border: "!border-slate-500/20", background: "!bg-slate-500", text: "!text-slate-500", col: 'slate' } },
        { to: "/service", icon: "partner_exchange", label: "Service", color: { border: "!border-sky-500/20", background: "!bg-sky-500", text: "!text-sky-500", col: 'sky' } },
        { to: "/evenement", icon: "event", label: "Évenement", color: { border: "!border-cyan-500/20", background: "!bg-cyan-500", text: "!text-cyan-500", col: 'cyan' } },
        { to: "/annonce", icon: "dashboard", label: "Annonce", color: { border: "!border-rose-500/20", background: "!bg-rose-500", text: "!text-rose-500", col: 'rose' } },
        { to: "/vote", icon: "ballot", label: `${addBtn ? "Vote⠀" : 'Votes⠀⠀'}`, color: { border: "!border-orange-500/20", background: "!bg-orange-500", text: "!text-orange-500", col: 'orange' } },
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
        color: {
            border: `"!border-${color}-500"`,
            col: color,
            text: `!text-${color}-500`,
        }
    }] : [
        {
            to: `/service/create`,
            icon: "partner_exchange",
            label: `Ajouter un Service`,
            color: {
                border: "!border-sky-500 ",
                col: 'sky',
                text: "!text-sky-500",
            }
        }, {
            to: `/evenement/create`,
            icon: "event",
            label: `Ajouter un Événement`,
            color: {
                border: "!border-cyan-500",
                col: 'cyan',
                text: "!text-cyan-500",
            }
        },
        {
            to: `/annonce/create`,
            icon: "dashboard",
            label: `Ajouter une Annonce`,
            color: {
                border: "!border-rose-500",
                col: 'rose',
                text: "!text-rose-500",
            }
        },
        {
            to: `/vote/create`,
            icon: "ballot",
            label: `Créer un Vote`,
            color: {
                border: "!border-orange-500",
                col: 'orange',
                text: "!text-orange-500",
            }
        }
    ]

    const [openFab, setOpenFab] = useState(false);


    return (
        <>

            {/* CONTAINER */}
            <div className={
                (navBottom ?
                    `items-center opacity-100 anim bg-opacity-90 wRespXL justify-between gap-[5%] md:gap-6  px-2 lg:!px-0 pb-1 ` :
                    'z-0 md:gap-4 gap-3 pr-2 pt-1 ') +
                ` flex z-30 w-full `
            }>
                <Navbar className={`
                    ${navBottom ? ' lg:ml-0 border-[1px] rounded-full !shadow bg-slate-50 border-slate-300 !flex-1 !max-w-full   ' :
                        ` !pt-1  shadow-none border-none bg-transparent  w-full `}
                    flex h-full items-center !p-0 overflow-x-auto overflow-y-hidden  `}>
                    <ul className={`${navBottom ?
                        ' gap-[0.5vw] justify-between flex-1 !w-full ' : 'md:gap-0 gap-1 justify-around '} 
                            flex  !max-w-[calc(100vw-5.5rem)] flex-row  rounded-full h-full  w-full  `}>
                        {navItems.map(({ to, icon, label, color }: NavItem, index) => (
                            <Typography
                                onClick={() => {
                                    setColor(color.col)
                                }}
                                key={index}
                                as="li"
                                className={` ${color.text} flex rounded-full h-full items-center font-medium`}>
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `flex gap-2 lg:gap-1 justify-center lg:justify-start items-center w-full h-full rounded-full 
                                            ${navBottom ? ` px-[8px] py-[4px] ` : 'opacity-90'}
                                            ${(isActive && navBottom) ? `${color.col}Style border animSlide !px-[5.5px] md:!pl-[24px]` :
                                            (isActive && !navBottom) ? ` border-b-[1px] px-1 md:border-none rounded-none !border-current !opacity-100 ` :
                                                isActive ? `  ` : '!shadow-none '}`
                                    }>
                                    {({ isActive }) => (
                                        <>
                                            <Icon
                                                disabled={isActive}
                                                style={
                                                    `${(isActive && !navBottom) ? `` : ''} min-h-[48px] `
                                                }
                                                reverse={false}
                                                clear={navBottom}
                                                bg={navBottom}
                                                size={navBottom ? '3xl' : 'xl'}
                                                icon={icon}
                                                fill={isActive ? true : false}
                                                color={color.col}
                                            />
                                            {/* LABEL LINK */}
                                            <span className={`font-medium  hidden pr-2
                                            ${navBottom ? 'lg:pr-8 pr-4 md:block md:!text-[0.9rem] ' : 'md:block md:!text-[0.9rem]'} 
                                            ${(isActive && !navBottom) && 'underline underline-offset-8'}`}>
                                                {label}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            </Typography>
                        ))}
                    </ul>
                </Navbar>
                <FabMenu
                    backdropBlur={true}
                    open={openFab}
                    setOpen={setOpenFab}
                    mainProps={{
                        className: `rounded-full  `,
                        size: navBottom ? 'large' : 'small',
                        icon: { icon: openFab ? 'close' : 'edit', size: navBottom ? '2xl' : 'lg' },
                        color: color as Md3Colors ?? 'slate'
                    }}
                    placement={navBottom ? "top" : "bottom"}
                >
                    {addBtnItem.map(({ to, icon, label, color }: NavItem, index) =>
                        <Fab
                            className="max-w-max self-end shadow-lg"
                            variant="tonal"
                            key={index}
                            size="extended"
                            color={color.col as Md3Colors ?? 'slate'}
                            icon={{ icon: icon, size: 'lg' }}
                            text={label}
                            onClick={() => {
                                navigate(to);
                                setOpenFab(false);
                            }} >
                            {label}
                        </Fab>
                    )}
                </FabMenu>
            </div>

        </>
    );
};