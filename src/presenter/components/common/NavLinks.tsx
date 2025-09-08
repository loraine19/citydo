import { Navbar, Typography } from "@material-tailwind/react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from "./IconComp";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { useUxStore } from "../../../application/stores/ux.store";
import { SpeedDial } from "./adaptatersComps/SpeedDial";

interface NavBarProps {
    handleClick?: () => void;
    addBtn?: boolean;
    color?: string;
    openBlur?: boolean;
    setOpenBlur: (open: boolean) => void;
}

export const NavBarSection: React.FC<NavBarProps> = ({ addBtn, openBlur, setOpenBlur }) => {
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


    return (
        <>

            {/* CONTAINER */}
            <div className={
                (navBottom ?
                    `items-center opacity-100 anim bg-opacity-90 wRespXL justify-between gap-[5%] md:gap-6  px-2 lg:!px-0 ` :
                    'z-0 md:gap-4 gap-3 pr-2 ') +
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
                                onClick={() => { setColor(color.col) }}
                                key={index}
                                as="li"
                                className={` ${color.text} flex rounded-full h-full items-center font-medium`}>
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `flex gap-2 lg:gap-3 justify-center lg:justify-start items-center w-full h-full rounded-full 
                                            ${navBottom ? ` px-[8px] py-[4px] ` : 'opacity-90'}
                                            ${(isActive && navBottom) ? `z-50 ${color.col}Style border animSlide !px-[4px]` :
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
                                            <span className={`font-medium !font-roboto hidden pr-2
                                            ${navBottom ? 'lg:pr-8 md:block md:!text-[0.9rem] ' : 'md:block md:!text-[0.9rem]'} 
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

                {/* ACTION BUTTON  */}
                <SpeedDial
                    open={openBlur}
                    setOpen={setOpenBlur}
                    className={`${(!navBottom && !addBtn) ? 'hidden' : ''}
                        ${!navBottom ? ' flex -mr-3.5 ' : ' -mt-3'} 
                         z-[50]  `}
                    placement={navBottom ? 'top' : 'bottom'}
                    offset={10}
                    Handler={
                        <div className={` rounded-full !text-[2.2rem] ${color}StyleInv ${navBottom ? `!shadow-md p-2.5 w-full h-full border border-slate-900/5 -mb-2.5 lg:-mb-2  ` : ' !shadSm !p-0'}`}>
                            <Icon
                                color={color ?? 'slate'}
                                style={'!text-white/80 border-0'}
                                reverse
                                onClick={() => setOpenBlur(!openBlur)}
                                icon={openBlur ? 'close' : 'edit'}
                                bg
                                clear={navBottom}
                                size={navBottom ? '2xl' : 'xl'} />
                        </div>
                    }
                    Content={
                        <div className={`${!navBottom ? ' items-end justify-end ' : 'items-end justify-end'} flex gap-3 py-3 flex-col  `}>
                            {addBtnItem.map(({ to, icon, label, color }: NavItem, index) =>

                                <button onClick={() => {
                                    setOpenBlur(false);
                                    navigate(to);
                                }}
                                    key={index} className={` shadow-md 
                                     rounded-full bg-slate-50 flex items-center max-w-max hover:!bg-slate-100  `}>
                                    <div key={index} className={
                                        `${navBottom ? 'p-1' : 'p-0.5'}
                                     rounded-full ${color.col}${'Style'} px-3 flex gap-1 items-center border border-slate-900/10 `}>
                                        <Icon style={'!border-slate-900/10 '}
                                            bg clear
                                            size={navBottom ? '2xl' : 'xl'}
                                            icon={icon}
                                            color={type ? color.col : color.col} />
                                        <div className={`${navBottom ? '' : 'text-[14px] '} whitespace-nowrap pr-5`}>
                                            {label}
                                        </div>
                                    </div>
                                </button>)}
                        </div>}
                />
            </div>

        </>
    );
};