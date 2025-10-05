import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "../../shared/base/baseComps/Menu";
import { Icon, IconName } from "../IconComp";
import { AvatarUser } from "../AvatarUser";
import { useUxStore } from "../../../../application/stores/ux.store";
import { useUserStore } from "../../../../application/stores/user.store";
import { useNavigate } from "react-router-dom";

type AppMenuProps = {
    listPage?: boolean;
    singlePage?: boolean;

};

const AppMenu: React.FC<AppMenuProps> = ({
    listPage = false,
    singlePage = false,
}) => {
    const { dark, setDark, setNavBottom, navBottom, hideNavBottom, color } = useUxStore((state) => state);
    const { user } = useUserStore((state) => state);
    const navigate = useNavigate();

    ///// MENU ITEMS
    const [open, setOpen] = React.useState(false);
    const menuItems = [
        { icon: "person_edit", text: "Modifier mon profil", link: '/myprofile', color: "cyan", divider: 'top' },
        {
            icon: dark ? "light_mode" : "dark_mode",
            text: dark ? "Désactiver le mode sombre" : "Activer le mode sombre",
            onClick: () => { setDark(!dark); setOpen(false); },
            color: "cyan", divider: "none", style: 'rounded-none'
        },
        {
            icon: navBottom ? 'move_up' : 'move_down',
            text: navBottom ? "Cacher la barre" : "Afficher la barre",
            onClick: () => { setNavBottom(!navBottom); setOpen(false); },
            color: 'cyan', divider: 'bottom'
        },

        {
            icon: 'group', text: "Groupes",
            onClick: () => { setOpen(false); navigate('/groupe') }, color: "orange", divider: 'top',
        }, {
            icon: 'diversity_3', text: "Conciliation",
            onClick: () => { setOpen(false); navigate('/conciliation'); }, color: 'orange', divider: 'bottom',
        },
        {
            icon: "exit_to_app", text: "Déconnexion",
            onClick: () => { setOpen(false); navigate('/signin'); }, color: "error"
        },
    ]

    if (!listPage || hideNavBottom) menuItems.unshift({ icon: "home", text: "Accueil", onClick: () => { setOpen(false); navigate('/') }, color: "slate", divider: 'bottom', style: '' })

    const [installPrompt, setInstallPrompt] = useState<any>(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            // empêche la mini-barre d'info par défaut de Chrome de s'afficher
            e.preventDefault();
            // stocke l'événement dans notre état pour pouvoir l'utiliser plus tard
            setInstallPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);


    if (installPrompt) {
        menuItems.unshift({
            icon: "install_desktop",
            text: "Installer l'application",
            onClick: async () => {
                if (!installPrompt) {
                    return;
                }
                await installPrompt.prompt();
                const { outcome } = await installPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                setInstallPrompt(null);
                setOpen(false);
            },
            color: "green",
            divider: "none",
            style: 'rounded-none'
        });
    }

    const menuIcon = hideNavBottom || singlePage
    const showAppName = (!hideNavBottom || !listPage) && !singlePage
    const roundedStyle = !showAppName


    ///// RETURN COMPONENT

    return (
        <div className={` md3-button-primary md3-button-tonal rounded-full !min-w-max flex items-center md3-elevation-0 md:py-2 hover:!cursor-pointer
            ${roundedStyle ? " p-2.5 md:pl-4 max-h-max " : " md:px-3 md:py-1 p-2.5 "}`}>
            <Menu
                open={open}
                setOpen={setOpen}
                blurBack
                left
                MenuKey="profile-menu"
                className={`rounded-l-none !absolute !top-0 !left-0 px-4 py-2 !z-[999] h-[100dvh] !max-h-[100dvh]  overflow-auto  !min-w-[70vw]"`}
                placement="free"
                trigger={
                    <div className="flex items-center ">
                        <div className={`h-full justify-center max-w-max grid items-center !p-0`}>
                            {!menuIcon ?
                                <div className="flex w-[2.4rem] flex-1 items-center">
                                    <img
                                        className="!w-[2.4rem] !h-[2.4rem] object-cover object-center"
                                        src="/image/logo.svg"
                                        alt="logo"
                                    />
                                </div>
                                : <Icon
                                    style=""
                                    icon="menu"
                                    size="xl"
                                />}
                        </div>
                        {showAppName && (
                            <h1 className={`
                                ${listPage
                                    ? "lg:flex hidden"
                                    : `${!navBottom ? "hidden md:flex" : "sm:flex"}`
                                }  items-center h-full pb-1 px-2 !font-quicksand !text-[1.5rem] font-[600]`}>
                                City'do
                            </h1>

                        )}
                    </div>
                }   >

                {/* USER ITEM */}
                <MenuItem
                    bg
                    onClick={() => navigate("/myprofile")}
                    divider="top"
                    leadingIcon={
                        <div>
                            <AvatarUser
                                style="!shadow-none "
                                avatarSize="2xl"
                                Profile={user?.Profile}
                            />
                        </div>
                    }
                >
                    <div className="flex -ml-2 flex-1 gap-0.5 py-0.5 flex-col">
                        <span className="font-semibold ">
                            {user?.Profile?.firstName} {user?.Profile?.lastName}
                        </span>
                        <span className="text-xs opacity-90">{user?.email}</span>
                        <span className="text-xs opacity-70 font-medium">vous avez {user?.Profile?.points} pts</span>
                    </div>
                </MenuItem>
                {/* LIST ITEM */}
                {menuItems.map((item, index) => (
                    <MenuItem

                        bg
                        className={item.style}
                        divider={item.divider as any}
                        key={index}
                        onClick={() => item.onClick ? item.onClick() : item.link ? navigate(item.link) : null}
                        leadingIcon={
                            <Icon
                                disabled={!item.onClick}
                                bg
                                fill
                                size="2xl"
                                color={item.color ?? color}
                                icon={item.icon as IconName}
                            />
                        }
                    >
                        {item.text}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default AppMenu;