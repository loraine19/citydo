import { Menu, MenuTrigger, MenuItem, MenuContent } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Icon } from "./IconComp";
import { NotifBadge } from "./NotifBadge";
import { useUserStore } from "../../../application/stores/user.store";
import { OnlineDot } from "./onlineDot";
import { AvatarUser } from "./AvatarUser";
import { useUxStore } from "../../../application/stores/ux.store";
import { NavBarSection } from "./NavLinks";
import { useEffect, useState } from "react";

export default function NavBarTop({ addBtn, navIcons }: { addBtn?: boolean, navIcons?: boolean }) {
    const navigate = useNavigate();
    const { user } = useUserStore((state) => state);
    const { hideNavBottom, setHideNavBottom, navBottom, setNavBottom, color, getColor } = useUxStore((state) => state);
    const onBoard = window.location.pathname === '/'

    ///// MENU ITEMS
    const menuItems = [
        { icon: "toll", text: ` ${user?.Profile?.points} points`, color: 'sky', style: 'hover:!pointer-event-nones !mb-3' },
        { icon: "person_edit", text: "Modifier mon profil", onClick: () => navigate('/myprofile'), color: "cyan" },
        { icon: navBottom ? 'move_up' : 'move_down', text: navBottom ? "Cacher la barre" : "Afficher la barre", onClick: () => { setNavBottom(!navBottom) }, color: 'cyan', style: ` !mb-3 ` },
        // { icon: "forum", text: `Messagerie (${unReadMsgNotif ?? ''})`, onClick: () => navigate('/chat'), color: 'cyan' },

        { icon: 'groups', text: "Groupes", onClick: () => navigate('/groupe'), color: "orange" },

        { icon: 'diversity_3', text: "Conciliation", onClick: () => navigate('/conciliation'), color: 'orange' },
        { icon: "exit_to_app", text: "Déconnexion", onClick: () => navigate('/signin'), style: "!text-red-500 !mt-4 ", color: "red" },
    ]

    if (!onBoard && !navIcons) menuItems.unshift({ icon: "home", text: "Accueil", onClick: () => navigate('/'), color: "slate", style: "!mb-3" })


    const [closeDial, setCloseDial] = useState<boolean>(false)
    const [openBlur, setOpenBlur] = useState<boolean>(false)

    useEffect(() => { getColor(window.location.pathname), setHideNavBottom(false) }, [window.location.pathname])

    return (
        <>
            {/* SEPARATOR */}
            {hideNavBottom &&
                <div className="w-full  py-1 ">
                    <hr className={` !border-${color}-500 border-t-0 !border-b-[1px] opacity-75 `}
                    />
                </div>}
            <header>

                {/*BLUR POP BACKGROUND */}
                <div onClick={() => {
                    setCloseDial(!true);
                    setOpenBlur(false)
                }}
                    className={` ${(closeDial || openBlur) ? ' h-screen w-screen -left-0 top-0  backdropBlur  absolute slide' : 'hidden'
                        }`}>

                </div>

                {/* CONTAINER */}
                <div className={`wRespXL slide h-full justify-between items-end 
            ${navBottom ? 'flex ' : 'grid grid-cols-[auto_1fr_auto] gap-3 '}
                ${hideNavBottom ? ' flex animRev !py-0' : ' flex animRev pt-2 pb-2'}`} >

                    <div className={`flex h-full ${hideNavBottom ? 'hidden' : ''}`}>

                        {/* PROFILE MENU  */}
                        <Menu placement="bottom-start">
                            <MenuTrigger
                                className="relative h-full justify-center max-w-max grid z-50  items-center !p-0">
                                <div onClick={() => setCloseDial(!closeDial)}>
                                    {(onBoard || !onBoard) ?
                                        <div className='flex w-[48px] flex-1 items-center'>
                                            <img className="!w-[48px] !h-[48px] drop-shadow-sm  object-cover object-center"
                                                src="/image/logo.svg"
                                                alt="logo" />
                                        </div> :
                                        <div className="flex max-w-[42px] items-center relative">
                                            <AvatarUser
                                                style='!shadow-none'
                                                avatarStyle='!w-[48px] !h-[48px] !text-[26px]'
                                                avatarSize={'sm'}
                                                Profile={user?.Profile} />
                                            <OnlineDot
                                                className='relative -bottom-[18px] !-left-[15px]'
                                                id={user?.id} />
                                        </div>}
                                </div>
                            </MenuTrigger>
                            <MenuContent
                                className='flex py-3 gap-1 px-2 z-[999] overflow-auto max-h-[calc(100vh-8rem)] flex-1 flex-col !rounded-3xl !shadow -ml-1 ] '>
                                {/* USER ITEM */}
                                <MenuItem
                                    className={` items-center gap-3 p-2 ${'hover:bg-brightness-100'} bg-slate-200/60 rounded-full `}>
                                    <div>
                                        <AvatarUser
                                            style='!shadow-none'
                                            avatarSize='ms'
                                            Profile={user?.Profile}
                                        />
                                    </div>
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
                                        key={index}
                                        className={`flex !flex-1 !min-w-60 pr-[10vw] items-center gap-2 p-2 ${item.onClick ? `hover:brightness-95` : 'hover:bg-slate-200'} bg-slate-200/70 rounded-full  ${item.style || ''}`}
                                        onClick={() => {
                                            item.onClick && item.onClick()
                                            setCloseDial(false);
                                        }}
                                    >
                                        <Icon
                                            disabled={!item.onClick}
                                            bg fill
                                            size='lg'
                                            color={item.color ?? color}
                                            icon={item.icon}
                                        />
                                        <p className="pr-6 text-[0.9rem] font-roboto ">
                                            {item.text}
                                        </p>
                                    </MenuItem>
                                ))}
                            </MenuContent>
                        </Menu>

                        {/* INFO TEXT LOGO   */}
                        {(!hideNavBottom || !navIcons) &&
                            <div className={`${(!navBottom && navIcons) ? 'hidden lg:flex' : 'truncate '} max-w-[calc(100vw-12rem)] lg:max-w-[calc(1000px-14rem)] flex flex-col h-full w-full  pt-1 !-ml-1.5`}>
                                <h1 className={`drop-shadow-sm flex !font-comfortaa text-[2.2rem]  ${!navIcons ? 'pl-0  ' : ''} text-cyan-500 brightness-[0.95] font-[900] underline decoration-slate-900/10 !decoration-[1px] underline-offset-[0.35rem]`}>
                                    &nbsp;City'Do&nbsp;&nbsp;
                                </h1>
                                {(((navBottom && !hideNavBottom && navIcons && onBoard))) &&
                                    <i className='text-[0.75rem] pl-2 -pt-0.5 lg:text-[0.85rem] truncate flex !line-clamp-1 '>

                                        {user?.GroupUser?.map((group) => (group.Group?.name.split(':')[0])).join(', ')}
                                    </i>}
                            </div>}

                    </div>

                    {/* INSERTION NAVLINK TOP  */}
                    {(!navBottom && navIcons && !hideNavBottom) &&
                        <div onMouseEnter={() => setCloseDial(false)}
                            className="pr-4 pl-1.5 pb-0.5  w-full h-full overflow-hidden flex justify-center items-center">
                            <NavBarSection
                                setOpenBlur={setOpenBlur}
                                openBlur={openBlur}
                                addBtn={addBtn} />
                        </div>
                    }

                    {/* NOTIF BAGDES  */}
                    <div className={`justify-end items-center flex h-full w-full !flex-1  md:pl-2
                    ${hideNavBottom ? 'hidden' : ''} 
                    ${navBottom ? ' w-full' : ''}`} >
                        <NotifBadge />
                    </div>

                </div >
            </header >
        </>
    );
}
