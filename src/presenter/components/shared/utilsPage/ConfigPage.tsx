import { Outlet } from "react-router"
import AppBar from "../../common/appComps/AppBar"
import { AppFooter } from "../../common/appComps/AppFooter"

export const ConfigPage = ({ mainPage, listPage, detailPage, singlePage }: { mainPage?: boolean, listPage?: boolean, detailPage?: boolean, singlePage?: boolean }) => {

    return (
        <>
            <AppBar mainPage={mainPage} listPage={listPage} detailPage={detailPage} singlePage={singlePage} />
            <Outlet />
            <AppFooter mainPage={mainPage} listPage={listPage} detailPage={detailPage} />
        </>)
}

