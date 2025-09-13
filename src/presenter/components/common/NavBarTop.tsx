
import { useNavigate } from "react-router-dom";
import { Icon } from "./IconComp";
import { NotifBadge } from "./NotifBadge";
import { useUserStore } from "../../../application/stores/user.store";
import { AvatarUser } from "./AvatarUser";
import { useUxStore } from "../../../application/stores/ux.store";
import { NavBarSection } from "./NavLinks";
import { useEffect, useState } from "react";
import BackDropBlur from "../shared/base/baseComps/BackDropBlur";
import { Menu, MenuItem } from "../shared/base/baseComps/Menu";

export default function NavBarTop({ addBtn, navIcons, title }: { addBtn?: boolean, navIcons?: boolean, title?: boolean }) {
    const navigate = useNavigate();
    const { user } = useUserStore((state) => state);
    const { hideNavBottom, setHideNavBottom, navBottom, setNavBottom, color, getColor, setNavIcons, setHaveTitle } = useUxStore((state) => state);
    const onBoard = window.location.pathname === '/'

    ///// MENU ITEMS
    const menuItems = [
        { icon: "toll", text: ` ${user?.Profile?.points} points`, color: 'sky', divider: 'bottom' },
        { icon: "person_edit", text: "Modifier mon profil", onClick: () => navigate('/myprofile'), color: "cyan", divider: 'top' },
        { icon: navBottom ? 'move_up' : 'move_down', text: navBottom ? "Cacher la barre" : "Afficher la barre", onClick: () => { setNavBottom(!navBottom) }, color: 'cyan', divider: 'bottom' },
        // { icon: "forum", text: `Messagerie (${unReadMsgNotif ?? ''})`, onClick: () => navigate('/chat'), color: 'cyan' },

        { icon: 'groups', text: "Groupes", onClick: () => navigate('/groupe'), color: "orange", divider: 'top', },

        { icon: 'diversity_3', text: "Conciliation", onClick: () => navigate('/conciliation'), color: 'orange', divider: 'bottom', },
        { icon: "exit_to_app", text: "Déconnexion", onClick: () => navigate('/signin'), color: "red" },
    ]

    if (!onBoard && !navIcons) menuItems.unshift({ icon: "home", text: "Accueil", onClick: () => navigate('/'), color: "slate", divider: 'bottom' })


    const [closeDial, setCloseDial] = useState<boolean>(false)
    const [openBlur, setOpenBlur] = useState<boolean>(false)

    useEffect(() => {
        getColor(window.location.pathname);
        setHideNavBottom(!navIcons && !title)
    }, [window.location.pathname])

    useEffect(() => {
        setHideNavBottom(!navIcons && !title)
        setNavIcons(navIcons ? true : false)
        setHaveTitle(title ? true : false)
    }, [navIcons, title])

    return (
        <>
            {/* SEPARATOR */}
            {hideNavBottom &&
                <div className="w-full ">
                    <hr className={` !border-${color}-500 border-t-0 !border-b-[1px] opacity-75 `}
                    />
                </div>}
            <header>

                {/*BLUR POP BACKGROUND */}
                <BackDropBlur open={openBlur} setOpen={setOpenBlur} />

                {/* CONTAINER */}
                <div className={`wRespXL pl-2 !pb-1 pt-2  lg:px-0 slide h-full justify-between items-end 

            ${(!navBottom || !navIcons) ? 'flex ' : 'flex'}
           
                ${hideNavBottom ? ' flex animRev !py-0' : ' flex animRev pt-2 pb-2'}`} >

                    <div className={`flex h-full ${hideNavBottom ? 'hidden' : ''}
                         ${!navIcons || navBottom ? ' w-full  ' : ' w-max'} `}>

                        {/* PROFILE MENU  */}
                        <Menu
                            onClose={() => { setOpenBlur(false); setCloseDial(true); }}
                            placement="top"
                            open={!closeDial}
                            className="mt-2"
                            trigger={<div className="relative h-full justify-center max-w-max grid z-50 items-center !p-0">
                                <div onClick={() => {
                                    setOpenBlur(true);
                                    setCloseDial(false);
                                }}>
                                    <div className='flex w-[3.2rem] flex-1 items-center'>
                                        <img
                                            className="!w-[3.2rem] !h-[3.2rem] object-cover object-center !stroke-2"
                                            src="/image/logo.svg"
                                            alt="logo"
                                        />
                                    </div>
                                </div>
                            </div>}>

                            {/* USER ITEM */}
                            <MenuItem
                                divider="top"
                                leadingIcon={
                                    <div>
                                        <AvatarUser
                                            style='!shadow-none'
                                            avatarSize='md'
                                            Profile={user?.Profile}
                                        />
                                    </div>}>
                                <div className="flex flex-1 flex-col">
                                    <span className="font-semibold ">
                                        {user?.Profile?.firstName} {user?.Profile?.lastName}
                                    </span>
                                    <i className="text-xs text-slate-500">{user?.email}</i>
                                </div>
                            </MenuItem>
                            {/* LIST ITEM */}
                            {menuItems.map((item, index) => (
                                <MenuItem
                                    divider={item.divider as "top" | "bottom" | "both" | undefined}
                                    key={index}
                                    onClick={() => {
                                        item.onClick && item.onClick();
                                        setCloseDial(false);
                                        setOpenBlur(false);
                                    }}
                                    leadingIcon={
                                        <Icon
                                            disabled={!item.onClick}
                                            bg
                                            fill
                                            size='xl'
                                            color={item.color ?? color}
                                            icon={item.icon}
                                        />}>
                                    {item.text}
                                </MenuItem>
                            ))}
                            {/* </MenuContent> */}
                        </Menu>
                        {(!hideNavBottom || !navIcons) &&
                            <div className={`${(!navBottom && navIcons) ? 'hidden lg:flex' : ' w-full !flex-1 justify-center -mr-2 lg:-mr-8'}  items-center  flex h-full  pt-1 pl-4 `}>
                                <h1 className={`drop-shadow-sm flex !font-comfortaa text-[2.1rem]  ${!navIcons ? 'pl-0 ' : ''} !text-slate-600 font-[900] `}>
                                    City'Do
                                </h1>
                            </div>}

                    </div>

                    {/* INSERTION NAVLINK TOP  */}
                    {(!navBottom && navIcons && !hideNavBottom) &&
                        <div onMouseEnter={() => { }}
                            className="lg:pr-6 pr-4 pl-1.5 pb-0.5  w-full h-full overflow-hidden flex justify-center items-center">
                            <NavBarSection
                                setOpenBlur={setOpenBlur}
                                openBlur={openBlur}
                                addBtn={addBtn} />
                        </div>
                    }

                    {/* NOTIF BAGDES  */}
                    <div className={`justify-end items-center flex h-full pl-1 
                    ${hideNavBottom ? 'hidden' : ''} 
                    ${navBottom ? ' w-max' : ''}`} >
                        <NotifBadge />
                    </div>

                </div >
            </header >
        </>
    );
}
