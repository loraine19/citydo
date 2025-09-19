
import { useNavigate } from "react-router-dom";
import { Icon } from "./IconComp";
import { NotifBadge } from "./NotifBadge";
import { useUserStore } from "../../../application/stores/user.store";
import { AvatarUser } from "./AvatarUser";
import { useUxStore } from "../../../application/stores/ux.store";
import { NavBarSection } from "./NavLinks";
import { useEffect } from "react";
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
        { icon: "exit_to_app", text: "Déconnexion", onClick: () => navigate('/signin'), color: "error" },
    ]

    if (!onBoard && !navIcons) menuItems.unshift({ icon: "home", text: "Accueil", onClick: () => navigate('/'), color: "slate", divider: 'bottom' })


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

            <header className={`${!onBoard && 'bg-[var(--md3-primary-container)]'}`}>
                {/* CONTAINER */}
                <div id='navBarTop'
                    className={`  pl-1 flex lg:px-0 slide h-full justify-between  gap-4
                ${(hideNavBottom || title) ? ' !h-2  !bg-transparent' : '  !py-2.5'}`} >
                    <div
                        className={`flex duration-300 ease-in-out px-3 py-1 md3-button-${'tonal'}  rounded-full
                    ${(hideNavBottom || title) ? ' md3-menu-leave ' : 'md3-menu-enter '}
                         ${!navIcons || navBottom ? ' w-full ' : ' w-max'}
                         ${!navIcons ? 'pb-1.5 ' : ''}
                         `}>

                        {/* PROFILE MENU  */}
                        <Menu
                            closeIcon={
                                <Icon
                                    icon="close"
                                    bg style='self-start' color='slate' size="sm" />}
                            className={`px-4 py-2 !z-[999] -mt-4 -ml-1  `}
                            blurBack
                            placement="up-bottom-right"
                            trigger={
                                <div className={`${hideNavBottom ? '' : ''}  h-full justify-center max-w-max grid items-center !p-0`}>
                                    <div >
                                        <div className='flex w-[2rem] flex-1 items-center'>
                                            <img className="!w-[2rem] !h-[2rem] object-cover object-center"
                                                src="/image/logo.svg"
                                                alt="logo"
                                            />
                                        </div>
                                    </div>
                                </div>}>

                            {/* USER ITEM */}
                            <MenuItem
                                bg
                                onClick={() => navigate('/myprofile')}
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
                                    bg
                                    divider={item.divider as "top" | "bottom" | "both" | undefined}
                                    key={index}
                                    onClick={() => item.onClick && item.onClick()}
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
                            <div className={`${(!navBottom && navIcons) ? 'hidden lg:flex' : ' w-full !flex-1 -mr-2 lg:-mr-8'}  items-center  flex h-full  pl-2`}>
                                <h1 className={`drop-shadow-sm flex !font-quicksand !text-[1.5rem]  ${!navIcons ? 'pl-0 ' : ''} md3-text-slate font-[600]`}>
                                    City'do
                                </h1>
                            </div>}

                    </div>

                    {/* INSERTION NAVLINK TOP  */}
                    {(!navBottom && navIcons && !hideNavBottom) &&
                        <div onMouseEnter={() => { }}
                            className=" w-full h-full   flex justify-center items-center">
                            <NavBarSection
                                addBtn={addBtn} />
                        </div>
                    }

                    {/* NOTIF BAGDES  */}
                    <div className={`justify-end items-center flex h-full  
                    ${hideNavBottom || title ? 'hidden' : ''} 
                    ${navBottom ? ' w-max' : ''}`} >
                        <NotifBadge />
                    </div>

                </div >
            </header >
        </>
    );
}
