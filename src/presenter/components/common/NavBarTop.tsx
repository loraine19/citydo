import { Menu, MenuTrigger, MenuItem, MenuContent, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Icon } from "./IconComp";
import { NotifBadge } from "./NotifBadge";
import { useUserStore } from "../../../application/stores/user.store";
import { OnlineDot } from "./onlineDot";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { AvatarUser } from "./AvatarUser";
import { useUxStore } from "../../../application/stores/ux.store";
import { NavBarSection } from "./NavBar";

export default function NavBarTop({ addBtn, navIcons }: { addBtn?: boolean, navIcons?: boolean }) {
    const { unReadMsgNotif } = useNotificationStore((state) => state);
    const navigate = useNavigate();
    const { user } = useUserStore((state) => state);
    const { hideNavBottom, navBottom, setNavBottom, setHideNavBottom } = useUxStore((state) => state);

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

    return (
        <header onClick={() => { hideNavBottom && setHideNavBottom(false) }}>
            <div className={`wRespXL relative h-full w-full flex justify-between items-end py-1.5
                ${hideNavBottom ? 'lg:flex animRev ' : 'animRev'}`} >
                <div className={`flex w-full max-w-max h-full ${hideNavBottom ? 'hidden' : ''}`}>
                    <Menu placement="bottom-start">
                        <MenuTrigger className="relative h-full min-w-max  z-50 flex items-center cursor-pointer">
                            {onBoard ?
                                <div className='flex w-full flex-1 items-center'>
                                    <img className="!w-[48px] !h-[48px] object-cover object-center"
                                        src="/image/logo.svg"
                                        alt="logo" />
                                </div> :
                                <div className="flex items-center relative">
                                    <AvatarUser
                                        style='!shadow-none'
                                        avatarStyle='!min-w-[43px] !h-[42px] !text-[26px]'
                                        avatarSize={'sm'}
                                        Profile={user?.Profile} />
                                    <OnlineDot
                                        className='relative -bottom-[15px] !-left-[10px]'
                                        id={user?.id} />
                                </div>}
                        </MenuTrigger>
                        <MenuContent className='flex flex-1 flex-col !rounded-xl !shadow-xl -ml-2'>
                            {menuItems.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    className={`flex !flex-1 !min-w-60 pr-[10vw] items-center gap-2.5 pl-2 hover:bg-slate-100/40  ${item.style || ''}`}
                                    onClick={item.onClick || undefined}>
                                    <Icon
                                        fill bg
                                        size='lg'
                                        color={item.color ?? 'slate'}
                                        icon={item.icon} />
                                    <Typography
                                        variant="small"
                                        className="font-medium">
                                        {item.text}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </MenuContent>
                    </Menu>
                    {(navBottom && !hideNavBottom) &&
                        <div className='flex items-center h-full w-full'>
                            {onBoard ?
                                <Typography
                                    className='text-gray-700 font-comfortaa text-[1.8rem] lg:text-[2.1rem] font-bold'>
                                    City'Do
                                </Typography> :
                                <div className='flex flex-col items-start'>
                                    <Typography
                                        variant='h5'
                                        className='text-gray-800'>
                                        {user?.Profile?.firstName}
                                    </Typography>
                                    <Typography
                                        className='mt-0 flex text-gray-700 !line-clamp-1 italic text-[0.9rem]'>
                                        {user?.GroupUser?.map((group) => (group.Group?.name.split(':')[0])).join(', ')}
                                    </Typography>
                                </div>}
                        </div>}
                </div>

                {(!navBottom && navIcons && !hideNavBottom) &&
                    <div className="w-[75%] lg:w-max max-w-[calc(100vw-12rem)]">
                        <NavBarSection addBtn={addBtn} />
                    </div>
                }
                <div
                    className={`justify-end items-center flex h-full
                    ${onBoard ? 'lg:pr-0' : 'pr-0'} 
                    ${hideNavBottom ? 'hidden' : ''} 
                    ${navBottom ? ' w-full' : ''}`} >
                    <NotifBadge />
                </div>
            </div >
        </header >
    );
}
