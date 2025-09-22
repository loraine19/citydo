import { Outlet } from "react-router"
import AppBar from "../../common/appComps/AppBar"
import { AppFooter } from "../../common/appComps/AppFooter"

export const ConfigPage = ({ mainPage, listPage, detailPage }: { mainPage?: boolean, listPage?: boolean, detailPage?: boolean }) => {

    return (
        <>
            <AppBar mainPage={mainPage} listPage={listPage} detailPage={detailPage} />
            <Outlet />
            <AppFooter mainPage={mainPage} listPage={listPage} detailPage={detailPage} />
        </>)
}

