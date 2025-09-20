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
    const { setNavBottom, navBottom } = useUxStore((state) => state)

    if (navBottom) return (
        <>

            <footer className={`!left-0 z-[0]  -mb-[1px] !fixed bottom-0 CTA `}
                onDragCapture={() => setNavBottom(!navBottom)}
                onDoubleClick={() => setNavBottom(!navBottom)}
                onDoubleClickCapture={(e) => {
                    e.stopPropagation(); e.preventDefault()
                    setNavBottom(!navBottom)
                }}>
                {<NavBarSection addBtn={addBtn} />}
            </footer>
        </>
    );


};