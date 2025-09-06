import { Outlet } from "react-router"
import NavBarTop from "../../common/NavBarTop"

export const WithTopNavPages = ({ addBtn, navIcons, title }: { addBtn?: boolean, navIcons?: boolean, title?: boolean }) => {

    return (
        <>

            <NavBarTop addBtn={addBtn} navIcons={navIcons} title={title} />
            <Outlet />
        </>)
}

