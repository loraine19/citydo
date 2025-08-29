import { Menu, MenuTrigger, MenuItem, MenuContent, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Icon } from "./IconComp";
import { NotifBadge } from "./NotifBadge";
import { useUserStore } from "../../../application/stores/user.store";
import { OnlineDot } from "./onlineDot";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { AvatarUser } from "./AvatarUser";
import { useUxStore } from "../../../application/stores/ux.store";
import { NavBarSection } from "./NavLinks";
import { useState } from "react";

export default function NavBarTop({ addBtn, navIcons }: { addBtn?: boolean, navIcons?: boolean }) {
    const { unReadMsgNotif } = useNotificationStore((state) => state);
    const navigate = useNavigate();
    const { user } = useUserStore((state) => state);
    const { hideNavBottom, navBottom, setNavBottom, color } = useUxStore((state) => state);

    const menuItems = [
        { icon: "home", text: "Accueil", onClick: () => navigate('/'), color: "slate" },
        { icon: "forum", text: `Messagerie (${unReadMsgNotif ?? ''})`, onClick: () => navigate('/chat'), color: 'cyan' },
        { icon: "person_edit", text: "Modifier mon profil", onClick: () => navigate('/myprofile'), color: "teal" },
        { icon: 'groups', text: "Groupes", onClick: () => navigate('/groupe'), color: "green" },
        { icon: 'diversity_3', text: "Conciliation", onClick: () => navigate('/conciliation'), color: 'orange' },
        { icon: "toll", text: `${user?.Profile?.points} points`, onClick: null, color: 'amber', style: 'hover:!bg-white' },
        { icon: navBottom ? 'move_up' : 'move_down', text: "Déplacer la barre", onClick: () => { setNavBottom(!navBottom) }, color: 'slate', style: `${!hideNavBottom ? '' : 'hidden'}` },
        { icon: "exit_to_app", text: "Déconnexion", onClick: () => navigate('/signin'), style: "!text-red-500 !mt-2 !pt-2 border-t border-slate-100", color: "red" },
    ]

    const onBoard = window.location.pathname === '/'
    const [closeDial, setCloseDial] = useState<boolean>(false)

    return (
        <>    {hideNavBottom && <hr className={` bg-${color}-500 border-slate-200 mt-1 h-[2px] opacity-75 `}></hr>}
            <header>

                {/*BLUR POP BACKGROUND */}
                <div onClick={() => setCloseDial(!true)}
                    className={` ${(!closeDial) ? 'hidden' :
                        ' h-screen w-screen -left-0 top-0  backdropBlur  absolute slide'}`}>
                </div>

                {/* CONTAINER */}
                <div className={`wRespXL slide h-full justify-between items-end 
            ${navBottom ? 'flex ' : 'grid grid-cols-[auto_1fr_auto] gap-3 '}
                ${hideNavBottom ? ' flex animRev !py-0' : ' flex animRev pt-2 pb-3 lg:pb-1'}`} >

                    <div className={`flex h-full ${hideNavBottom ? 'hidden' : ''}`}>

                        {/* PROFILE MENU  */}
                        <Menu placement="bottom-start">
                            <MenuTrigger
                                className="relative h-full justify-center max-w-max grid  z-50  items-center !p-0">
                                <button onClick={() => setCloseDial(!closeDial)}>
                                    {onBoard ?
                                        <div className='flex w-[48px] flex-1 items-center'>
                                            <img className="!w-[48px] !h-[48px] object-cover object-center"
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
                                                className='relative -bottom-[15px] !-left-[10px]'
                                                id={user?.id} />
                                        </div>}
                                </button>
                            </MenuTrigger>
                            <MenuContent
                                onMouseLeave={() => setCloseDial(false)}
                                className='flex z-40 flex-1 flex-col !rounded-xl !shadow-xl -ml-1'>
                                {menuItems.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        className={`flex !flex-1 !min-w-60 pr-[10vw] items-center gap-2.5 pl-2 hover:bg-slate-100/40  ${item.style || ''}`}
                                        onClick={item.onClick || undefined}
                                    >
                                        <Icon
                                            fill bg
                                            size='lg'
                                            color={item.color ?? 'slate'}
                                            icon={item.icon}
                                        />
                                        <Typography
                                            variant="small"
                                            className="font-medium"
                                        >
                                            {item.text}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </MenuContent>
                        </Menu>

                        {/* INFO TEXT LOGO   */}
                        {(!hideNavBottom) &&
                            <div className={`${!navBottom ? 'hidden lg:flex' : ''} max-w-[30vw] lg:max-w-[220px] flex flex-col h-full justify-center w-full  pl-6   pt-1`}>
                                <h2 className='flex font-comfortaa text-[1.8rem] lg:!text-[2.1rem] font-bold'>
                                    City'Do
                                </h2>
                                {(!onBoard) &&
                                    <i className='text-[0.9rem] flex !line-clamp-1'>
                                        {user?.GroupUser?.map((group) => (group.Group?.name.split(':')[0])).join(', ')}
                                    </i>}
                            </div>}

                    </div>

                    {/* INSERTION NAVLINK TOP  */}
                    {(!navBottom && navIcons && !hideNavBottom) &&
                        <div className="pr-4 pl-2 pb-0.5  w-full h-full overflow-hidden flex justify-center items-center">
                            <NavBarSection addBtn={addBtn} />
                        </div>
                    }

                    {/* NOTIF BAGDES  */}
                    <div className={`justify-end items-center flex h-full w-full !flex-1 pl-0.5 md:pl-2
                    ${hideNavBottom ? 'hidden' : ''} 
                    ${navBottom ? ' w-full' : ''}`} >
                        <NotifBadge />
                    </div>

                </div >
            </header >
        </>
    );
}
