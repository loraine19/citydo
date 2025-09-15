import { useState } from "react";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { useUxStore } from "../../../application/stores/ux.store";
import { NavBarSection } from "./NavLinks";
import BackDropBlur from "../shared/base/baseComps/BackDropBlur";

interface NavBarBottomProps {
    handleClick?: () => void;
    addBtn?: boolean;
    color?: string;
}

export const NavBarBottom: React.FC<NavBarBottomProps> = ({ addBtn }) => {
    const { } = useNotificationStore((state) => state);
    const { setNavBottom, navBottom, hideNavBottom } = useUxStore((state) => state)
    const [openBlur, setOpenBlur] = useState(false)

    if (navBottom && !hideNavBottom) return (
        <>
            <BackDropBlur open={openBlur} setOpen={setOpenBlur} />

            <footer className={`!left-0 z-[99999] !fixed bottom-0 slateFooter CTA pb-1.5`}
                onDragCapture={() => setNavBottom(!navBottom)}
                onDoubleClick={() => setNavBottom(!navBottom)}
                onDoubleClickCapture={(e) => {
                    e.stopPropagation(); e.preventDefault()
                    setNavBottom(!navBottom)
                }}>
                <NavBarSection addBtn={addBtn} />
            </footer></>
    );


};