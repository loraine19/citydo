import { Outlet } from "react-router-dom"
import AppBar from "../../common/appComps/AppBar"
import { AppFooter } from "../../common/appComps/AppFooter"

export const ConfigPage = ({ mainPage, listPage, detailPage, singlePage, addFab }:
    { mainPage?: boolean, listPage?: boolean, detailPage?: boolean, singlePage?: boolean, addFab?: boolean }) => {

    return (
        <>
            <AppBar mainPage={mainPage} listPage={listPage} detailPage={detailPage} singlePage={singlePage} addFab={addFab} />
            <Outlet />
            <AppFooter mainPage={mainPage} listPage={listPage} detailPage={detailPage} addFab={addFab} />
        </>)
}

