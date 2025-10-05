import { NotifBadge } from "./NotifBadge";
import { useUxStore } from "../../../../application/stores/ux.store";
import { useEffect } from "react";
import { NavLinks } from "./NavLinks";
import AppMenu from "./AppMenu";
import { useNavStore } from "../../../../application/stores/nav.store";

export default function AppBar({ mainPage, listPage, detailPage, singlePage, addFab }:
    { mainPage?: boolean, listPage?: boolean, detailPage?: boolean, singlePage?: boolean, addFab?: boolean }) {
    const { hideNavBottom, setHideNavBottom, navBottom, getColor, } = useUxStore((state) => state);
    const { searchSection, tabSection, detailSection } = useNavStore((state) => state)

    useEffect(() => {
        getColor(window.location.pathname);
        setHideNavBottom(!listPage && !detailPage)
    }, [window.location.pathname])

    useEffect(() => {
        setHideNavBottom(!listPage && !detailPage && !singlePage)
    }, [listPage, detailPage, singlePage])

    return (
        <header className={`
                ${!mainPage && 'md3-primary-container md3-elevation-2 !border-none rounded-b-3xl '} mx-auto top-0 flex-col flex gap-2 w-full `}>

            {/* CONTAINER */}
            <div id='AppBar'
                className={`pr-4 gap-2 ${!detailPage ? 'pt-2' : 'pt-1'} !border-none flex lg:px-0 slide justify-between items-center `} >


                {/* PROFILE MENU  */}
                {!detailPage &&
                    <AppMenu
                        listPage={listPage}
                        singlePage={singlePage} />}


                {/* INSERTION NAVLINK TOP  */}
                {(mainPage || listPage) && (!navBottom && !hideNavBottom) && (
                    <NavLinks addFab={addFab} mainPage={mainPage} placement="top" />
                )}

                {/* INSERTION SEARCH BAR */}
                {(searchSection && (hideNavBottom || navBottom)) && (
                    <div className="w-full md:px-8">{searchSection}</div>
                )}

                {/* NOTIF BAGDES  */}
                <div className={`flex h-full  items-center 
                    ${hideNavBottom || detailPage || singlePage ? 'hidden' : ''} 
                    ${navBottom ? ' w-max' : ''}`} >
                    <NotifBadge />
                </div>
            </div >
            {/* INSERTION SEARCH BAR */}

            {(searchSection && !hideNavBottom && !navBottom) &&
                <div className="w-full  ">{searchSection}</div>}
            {tabSection &&
                <div className={`"w-full  ${searchSection && ' pt-1.5 sm:pt-3'}`}>{tabSection}</div>
            }
            {detailSection &&
                <div>{detailSection}</div>
            }

        </header >
    );
}
