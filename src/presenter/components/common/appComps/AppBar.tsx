import { NotifBadge } from "./NotifBadge";
import { useUxStore } from "../../../../application/stores/ux.store";
import { useEffect } from "react";
import { NavLinks } from "./NavLinks";
import AppMenu from "./AppMenu";
import { useNavStore } from "../../../../application/stores/nav.store";

export default function AppBar({ mainPage, listPage, detailPage }: { mainPage?: boolean, listPage?: boolean, detailPage?: boolean, }) {
    const { hideNavBottom, setHideNavBottom, navBottom, getColor, } = useUxStore((state) => state);
    const { searchSection, tabSection, detailSection } = useNavStore((state) => state)

    useEffect(() => {
        getColor(window.location.pathname);
        setHideNavBottom(!listPage && !detailPage)
    }, [window.location.pathname])

    useEffect(() => {
        setHideNavBottom(!listPage && !detailPage)
    }, [listPage, detailPage])

    return (
        <>
            <header className={`
                ${!mainPage && 'md3-primary-container md3-elevation-2 rounded-b-3xl mx-[3px] !w-[calc(100%-6px)] border-b border-[var(--md3-outline)]'}   !static flex-col flex gap-2 `}>
                {/* CONTAINER */}
                <div id='AppBar'
                    className={`px-1 gap-2 ${!detailPage && 'pt-3'} flex lg:px-0 slide justify-between items-center`} >


                    {/* PROFILE MENU  */}
                    {!detailPage && <AppMenu listPage={listPage} />}


                    {/* INSERTION NAVLINK TOP  */}
                    {(mainPage || listPage) && !navBottom && !hideNavBottom && (
                        <NavLinks listPage={listPage} placement="top" />
                    )}

                    {/* INSERTION SEARCH BAR */}
                    {(searchSection && (hideNavBottom || navBottom)) && (
                        <div className="w-full md:px-8">{searchSection}</div>
                    )}

                    {/* NOTIF BAGDES  */}
                    <div className={`flex h-full  items-center
                    ${hideNavBottom || detailPage ? 'hidden' : ''} 
                    ${navBottom ? ' w-max' : ''}`} >
                        <NotifBadge />
                    </div>
                </div >
                {/* INSERTION NAVLINK BOTTOM  */}

                {(searchSection && !hideNavBottom && !navBottom) &&
                    <div className="w-full">{searchSection}</div>}
                {tabSection &&
                    <div className="w-full pt-2 sm:pt-4">{tabSection}</div>
                }
                {detailSection &&
                    <div>{detailSection}</div>
                }

            </header >
        </>
    );
}
