import { Navbar, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from "./IconComp";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { useUxStore } from "../../../application/stores/ux.store";
import { SpeedDial } from "./adaptatersComps/SpeedDial";

interface NavBarProps {
    handleClick?: () => void;
    addBtn?: boolean;
    color?: string;
}

export const NavBarSection: React.FC<NavBarProps> = ({ addBtn }) => {
    const location = useLocation()
    const type = new URLSearchParams(location.pathname.split("/")[1]).toString().replace("=", '');
    const [closeDial, setCloseDial] = useState<boolean>(false)
    const { } = useNotificationStore((state) => state);
    const { navBottom, setColor, color } = useUxStore((state) => state);

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


    return (
        <>
            {/*BLUR POP BACKGROUND */}
            <div className={`
            ${(!closeDial) ? 'hidden animRev' : ''} 
            ${navBottom ? `bottom-[4rem] left-0 w-screen anim h-[calc(100vh-4rem)]` :
                    'top-[4rem] left-0 w-screen animRev h-[calc(100vh-4rem)]'}
                   backdropBlur  absolute `}>
            </div>

            {/* CONTAINER */}
            <div className={
                (navBottom ?
                    `items-center opacity-100 anim rounded-t-3xl ${color}BG backdropBlur wRespXL justify-center gap-4 lg:gap-6 pb-2 pr-5  lg:!px-0 ` :
                    'z-0 md:gap-4 gap-4 ') +
                ` flex z-30 w-full `
            }>
                <Navbar className={`
                    ${navBottom ? 'ml-2 lg:ml-0 border-[1px] rounded-full !shadow-md bg-white border-slate-200 !flex-1 !max-w-max sm:!max-w-[100%] dark:!bg-red-300 ' :
                        ` !pt-1  shadow-none border-none bg-transparent w-full `}
                    flex h-full items-center !p-0 overflow-x-auto overflow-y-hidden  `}>
                    <ul className={`${navBottom ?
                        ' gap-0 justify-between flex-1 !w-full !px-0' : 'md:gap-0 gap-1 justify-around '} 
                            flex  xs:pr-0 !max-w-[calc(100vw-5.5rem)] flex-row  rounded-full h-full  w-full  `}>
                        {navItems.map(({ to, icon, label, color }: NavItem, index) => (
                            <Typography
                                onClick={() => { setColor(color.col) }}
                                key={index}
                                as="li"
                                className={` ${color.text} flex rounded-full h-full items-center font-medium`}>
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `flex gap-2 lg:gap-3 justify-center lg:justify-start items-center w-full h-full rounded-full
                                            ${navBottom ? ` px-[8.5px] py-[8px] shadow-sm transition duration-200 
                                            hover:shadow-sm` : 'opacity-90'}
                                            ${(isActive && navBottom) ? `border-[1px] shadowMid shadow-sm  z-50 ` :
                                            (isActive && !navBottom) ? ` border-b-[1px] px-1 md:border-none rounded-none !border-current !opacity-100 ` :
                                                isActive ? ` animSlide ` : ''}`
                                    }>
                                    {({ isActive }) => (
                                        <>
                                            <Icon
                                                disabled={isActive}
                                                style={
                                                    `${(isActive && !navBottom) ? `` : ''} min-h-[48px]`
                                                }
                                                bg={(navBottom) ? true : false}
                                                size={navBottom ? '3xl' : 'xl'}
                                                icon={icon}
                                                fill={isActive ? true : false}
                                                color={color.col}
                                            />
                                            <span className={`${navBottom ? 'lg:pr-8 md:block md:!text-[0.85rem] ' : 'md:block md:!text-[0.75rem]'} text-[0.95rem] font-bold font-comfortaa hidden  pr-2
                                                ${(isActive && !navBottom) ? 'underline underline-offset-8' : ''}`}>
                                                {label}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            </Typography>
                        ))}
                    </ul>
                </Navbar>

                {/* ACTION BUTTON  */}
                <SpeedDial
                    open={closeDial}
                    setOpen={setCloseDial}
                    className={`${(!navBottom && !addBtn) ? 'hidden' : ''}
                        ${!navBottom ? ' flex ' : '-mr-2'} 
                         z-[50]  -mr-4`}
                    placement={navBottom ? 'top' : 'bottom'}
                    offset={10}
                    Handler={
                        <Icon
                            onClick={() => setCloseDial(!closeDial)}
                            icon="add"
                            bg
                            size={navBottom ? '5xl' : 'xl'}
                            style={` ${closeDial ? 'rotate-45 transition-transform ' : ''} hover:!transition-transform hover:!rotate-45 !border-0 !text-[2.2rem] !text-white ${color}StyleInv ${navBottom ? `!shadow-md` : ''}`} />
                    }
                    Content={
                        <div className={`${!navBottom ? ' items-end  mr-2' : ''} flex gap-2 flex-col `}>
                            {addBtnItem.map(({ to, icon, label, color }: NavItem, index) =>
                                <div key={index}
                                    className={`-mr-2 bg-white rounded-full shadow-md flex hover:scale-[1.1]  gap-6  !justify-center items-center border 
                                     ${navBottom ? ` p-[8px] ` : 'p-[6px] '}   `}
                                    title={label}>
                                    <div>
                                        <Icon
                                            bg
                                            fill={type ? true : false}
                                            link={to}
                                            size={navBottom ? '3xl' : 'xl'}
                                            icon={icon}
                                            color={type ? color.col : color.col} />
                                    </div>
                                    <div className={`${navBottom ? '' : 'text-[14px] '} py-2 px-4 right-[5rem] rounded-full ${color.col}Style outlineStyle absolute bg-white text-sm shadow-xl whitespace-nowrap !border !border-gray-200`}>
                                        {label}
                                    </div>
                                </div>)}
                        </div>}
                />
            </div>

        </>
    );
};
