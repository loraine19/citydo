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
    const navItems: NavItem[] = [
        { to: "/", icon: "home", label: "Home", color: { border: "!border-slate-500/20", background: "!bg-slate-500", text: "!text-slate-500", col: 'slate' } },
        { to: "/service", icon: "partner_exchange", label: "Service", color: { border: "!border-sky-500/20", background: "!bg-sky-500", text: "!text-sky-500", col: 'sky' } },
        { to: "/evenement", icon: "event", label: "Évenement", color: { border: "!border-cyan-500/20", background: "!bg-cyan-500", text: "!text-cyan-500", col: 'cyan' } },
        { to: "/annonce", icon: "dashboard", label: "Annonce", color: { border: "!border-rose-500/20", background: "!bg-rose-500", text: "!text-rose-500", col: 'rose' } },
        { to: "/vote", icon: "ballot", label: `${addBtn ? "Vote⠀" : 'Votes⠀⠀'}`, color: { border: "!border-orange-500/20", background: "!bg-orange-500", text: "!text-orange-500", col: 'orange' } },
    ]

    const addBtnItem = type ? [{
        to: `/${type}/create`,
        icon: { service: "partner_exchange", evenement: "event", annonce: "dashboard", vote: "ballot", groupe: "groups" }[type] || "add",
        label: `Ajouter un ${type}`,
        color: {
            border: `"!border-${color}-500/20"`,
            col: color,
            text: `!text-${color}-500`,
        }
    }] : [
        {
            to: `/service/create`,
            icon: "partner_exchange",
            label: `Ajouter un Service`,
            color: {
                border: "!border-sky-500/20",
                col: 'sky',
                text: "!text-sky-500",
            }
        }, {
            to: `/evenement/create`,
            icon: "event",
            label: `Ajouter un Événement`,
            color: {
                border: "!border-cyan-500/20",
                col: 'cyan',
                text: "!text-cyan-500",
            }
        },
        {
            to: `/annonce/create`,
            icon: "dashboard",
            label: `Ajouter une Annonce`,
            color: {
                border: "!border-rose-500/20",
                col: 'rose',
                text: "!text-rose-500",
            }
        },
        {
            to: `/vote/create`,
            icon: "ballot",
            label: `Créer un Vote`,
            color: {
                border: "!border-orange-500/20",
                col: 'orange',
                text: "!text-orange-500",
            }
        }
    ]
    const BG = `!bg-${color}-500`


    return (
        <>
            <div className={`
            ${(!closeDial) ? 'hidden' : ''} 
            ${navBottom ? `bottom-[4rem] left-0 w-screen h-[calc(100vh-4rem)]` : '-right-[10rem] w-[calc(100vw*1.3)] md:w-[calc((100%*1.3)+4rem)] h-[calc(100vh*1.31)]  top-0'}
                   backdropBlur  absolute `}>
            </div>
            <div className={
                (navBottom ?
                    `items-center opacity-100 anim ${color}BG backdropBlur wRespXL rounded-full justify-center relative bottom-0 gap-6` :
                    'z-0 md:scale-[0.75] scale-[0.72]  -ml-[2.5rem] -mr-[2rem] lg:!-mr-[5rem] pt-[5px] lg:px-auto gap-2 ') +
                ` flex z-30 `
            }>
                <Navbar className={`
                    ${navBottom ? '!shadow-md bg-white border border-slate-300 -ml-5 !flex-1 !max-w-max sm:!max-w-[100%] '
                        : `shadow-none bg-transparent overflow-auto  `}
                    flex rounded-full h-full items-center p-0 !overflow-auto`}>
                    <div className={`${navBottom ? 'flex-row' : 'flex-row-reverse'} w-full min-w-max  h-full relative`}>
                        <ul className={`flex !max-w-[calc(100vw-6rem)] overflow-y-hidden overflow-auto flex-row w-full rounded-full justify-between h-full gap-auto  `}>
                            {navItems.map(({ to, icon, label, color }: NavItem, index) => (
                                <Typography
                                    onClick={() => { setColor(color.col) }}
                                    key={index}
                                    as="li"
                                    className={` ${color.text} flex rounded-full h-full items-center font-medium`}>
                                    <NavLink
                                        to={to}
                                        className={({ isActive }) =>
                                            `flex gap-3 justify-center lg:justify-start p-[7px] items-center w-full !h-[57px] rounded-full
                                            hover:bg-white/50 hover:shadow-slate-100
                                            hover:scale-[101%] transition duration-200
                                            hover:shadow-sm
                                            ${(isActive && navBottom) ? `border-[1px] shadowMid !bg-white` : isActive ? `animSlide border-[1px] shadow-sm mb-0.5 lg:mr-2 z-30 ${color} ` : ''}`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <Icon
                                                    bg
                                                    icon={icon}
                                                    fill={isActive ? true : false}
                                                    color={color.col}
                                                />
                                                <span className={`${navBottom ? 'md:block md:!text-[0.8rem] ' : 'lg:block'} !text-[0.95rem] font-bold filter brightness-90 font-comfortaa hidden  lg:pr-8 pr-3`}>
                                                    {label}
                                                </span>
                                            </>
                                        )}
                                    </NavLink>
                                </Typography>
                            ))}
                        </ul>
                    </div>
                </Navbar>

                {/* ACTION BUTTON  */}
                <SpeedDial
                    open={closeDial}
                    setOpen={setCloseDial}
                    className={`${(!navBottom && !addBtn) ? 'hidden' : ''}
                        ${!navBottom ? ' hidden xs:flex ' : ''} 
                        mt-1 z-[50]  -mr-4`}
                    placement={navBottom ? 'top' : 'bottom'}
                    offset={10}
                    Handler={
                        <Icon
                            onClick={() => setCloseDial(!closeDial)}
                            icon="add"
                            bg
                            size='5xl'
                            style={`hover:!transition-transform hover:!rotate-45 !text-white !text-[2rem] font-normal ${BG}  ${navBottom ? `!shadow-md` : ''}`} />
                    }
                    Content={
                        <div className={`${!navBottom ? 'scale-[0.75] -mt-[60%]' : ''} flex gap-2 flex-col `}>
                            {addBtnItem.map(({ to, icon, label, color }: NavItem, index) =>
                                <div key={index}
                                    className={` "bg-white rounded-full shadow-md flex over:scale-[1.1] !h-[58px] gap-6 w-[58px] !justify-center items-center border"`}
                                    title={label}>
                                    <div>
                                        <Icon
                                            bg
                                            fill={type ? true : false}
                                            link={to}
                                            size='2xl'
                                            icon={icon}
                                            color={type ? color.col : color.col} />
                                    </div>
                                    <div className={`${navBottom ? '' : 'text-[1.1rem] '} py-2 px-4 right-[5rem] rounded-full ${color.text} absolute bg-white text-sm shadow-xl whitespace-nowrap !border !border-gray-200`}>
                                        {label}
                                    </div>
                                </div>)}
                        </div>}
                />
            </div>

        </>
    );
};
