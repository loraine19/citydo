import { Outlet } from "react-router"
import { useUxStore } from "../../../../application/stores/ux.store"
import { NavBarBottom } from "../../common/NavBarBottom"

export const WithBottomPages = ({ addBtn }: { addBtn?: boolean }) => {
    const { navBottom } = useUxStore((state) => state)

    if (!navBottom)
        return (
            <>

                <Outlet />
                <NavBarBottom addBtn={addBtn} />
            </>)

    return (
        <>
            <NavBarBottom addBtn={addBtn} /> <Outlet />


        </>)
}

