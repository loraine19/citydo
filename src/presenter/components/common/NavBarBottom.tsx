import { useNotificationStore } from "../../../application/stores/notification.store";
import { useUxStore } from "../../../application/stores/ux.store";
import { NavBarSection } from "./NavLinks";

interface NavBarBottomProps {
    handleClick?: () => void;
    addBtn?: boolean;
    color?: string;
}

export const NavBarBottom: React.FC<NavBarBottomProps> = ({ addBtn }) => {
    const { } = useNotificationStore((state) => state);
    const { setNavBottom, navBottom, hideNavBottom } = useUxStore((state) => state)

    if (navBottom && !hideNavBottom) return (
        <footer className="flex items-center justify-center wRespXL pb-2"

            onDoubleClick={() => setNavBottom(!navBottom)}
            onDoubleClickCapture={(e) => {
                e.stopPropagation(); e.preventDefault()
                setNavBottom(!navBottom)
            }}>

            <NavBarSection addBtn={addBtn} />
        </footer>
    );


};
