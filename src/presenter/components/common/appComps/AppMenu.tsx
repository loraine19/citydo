import React from "react";
import { Menu, MenuItem } from "../../shared/base/baseComps/Menu";
import { Icon, IconName } from "../IconComp";
import { AvatarUser } from "../AvatarUser";
import { useUxStore } from "../../../../application/stores/ux.store";
import { useUserStore } from "../../../../application/stores/user.store";
import { useNavigate } from "react-router";

type AppMenuProps = {
    listPage?: boolean;
};

const AppMenu: React.FC<AppMenuProps> = ({
    listPage = false,
}) => {
    const { dark, setDark, setNavBottom, navBottom, hideNavBottom, color } = useUxStore((state) => state);
    const { user } = useUserStore((state) => state);
    const navigate = useNavigate();

    ///// MENU ITEMS
    const menuItems = [
        { icon: "toll", text: ` ${user?.Profile?.points} points`, color: 'sky', divider: 'bottom' },
        { icon: "person_edit", text: "Modifier mon profil", link: '/myprofile', color: "cyan", divider: 'top' },
        {
            icon: dark ? "light_mode" : "dark_mode",
            text: dark ? "Désactiver le mode sombre" : "Activer le mode sombre",
            onClick: () => setDark(!dark),
            color: "cyan", divider: "none", style: 'rounded-none'
        },
        {
            icon: navBottom ? 'move_up' : 'move_down',
            text: navBottom ? "Cacher la barre" : "Afficher la barre",
            onClick: () => { setNavBottom(!navBottom) },
            color: 'cyan', divider: 'bottom'
        },

        { icon: 'groups', text: "Groupes", link: '/groupe', color: "orange", divider: 'top', },

        { icon: 'diversity_3', text: "Conciliation", link: '/conciliation', color: 'orange', divider: 'bottom', },
        { icon: "exit_to_app", text: "Déconnexion", link: '/signin', color: "error" },
    ]

    if (!listPage || hideNavBottom) menuItems.unshift({ icon: "home", text: "Accueil", onClick: () => navigate('/'), color: "slate", divider: 'none', style: 'rounded-none' })

    return (
        <div className={` md3-button-primary md3-button-tonal rounded-full !min-w-max flex items-center md3-elevation-0 
            ${listPage && !navBottom ? " p-2.5 md:pl-4 max-h-max " : " px-3 py-1 "}`}>
            <Menu
                key="profile-menu"
                closeIcon={
                    <Icon
                        icon="close"
                        bg
                        style="self-start"
                        color="slate"
                        size="sm"
                    />
                }
                className="px-4 py-2 !z-[9999999] max-h-[calc(100dvh_-_0.5rem)] overflow-auto -mt-4 ml-1 lg:ml-[calc((50dvw_-_450px)/2)]"
                blurBack
                placement="up-bottom-right"
                trigger={
                    <div className="flex items-center">
                        <div className={`h-full justify-center max-w-max grid items-center !p-0`}>
                            {!hideNavBottom ?
                                <div className="flex w-[2.2rem] flex-1 items-center">
                                    <img
                                        className="!w-[2.2rem] !h-[2.2rem] object-cover object-center"
                                        src="/image/logo.svg"
                                        alt="logo"
                                    />
                                </div>
                                : <Icon
                                    icon="menu"
                                    size="xl"
                                />}
                        </div>
                        {(!hideNavBottom || !listPage) && (
                            <div className={`${!navBottom && listPage
                                ? "hidden lg:flex"
                                : " w-full !flex-1 "
                                } items-center flex h-full pb-1 md:px-2`}>
                                <h1 className={`drop-shadow-sm flex !font-quicksand !text-[1.5rem] 
                                ${!listPage ? "pl-0 " : ""} hidden sm:block md3-text-slate font-[600]`}>
                                    City'do
                                </h1>
                            </div>
                        )}
                    </div>
                }
            >
                {/* USER ITEM */}
                <MenuItem
                    bg
                    onClick={() => navigate("/myprofile")}
                    divider="top"
                    leadingIcon={
                        <div>
                            <AvatarUser
                                style="!shadow-none"
                                avatarSize="xl"
                                Profile={user?.Profile}
                            />
                        </div>
                    }
                >
                    <div className="flex -ml-2 flex-1 flex-col">
                        <span className="font-semibold ">
                            {user?.Profile?.firstName} {user?.Profile?.lastName}
                        </span>
                        <i className="text-xs opacity-70">{user?.email}</i>
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
                                size="lg"
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