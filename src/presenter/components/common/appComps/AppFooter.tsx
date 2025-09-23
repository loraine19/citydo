import { useNotificationStore } from "../../../../application/stores/notification.store";
import { useUxStore } from "../../../../application/stores/ux.store";
import { NavLinks } from "./NavLinks";

interface AppFooterProps {
    handleClick?: () => void;
    mainPage?: boolean;
    listPage?: boolean;
    detailPage?: boolean;
    singlePage?: boolean;
    color?: string;
}

export const AppFooter: React.FC<AppFooterProps> = ({ mainPage, listPage, singlePage }) => {
    const { } = useNotificationStore((state) => state);
    const { setNavBottom, navBottom } = useUxStore((state) => state)

    if (navBottom) return (
        <>

            <footer className={`!left-0 z-[0]  -mb-[1px] bottom-0 CTA `}
                onDragCapture={() => setNavBottom(!navBottom)}
                onDoubleClick={() => setNavBottom(!navBottom)}
                onDoubleClickCapture={(e) => {
                    e.stopPropagation(); e.preventDefault()
                    setNavBottom(!navBottom)
                }}>
                {((mainPage || listPage) && navBottom) &&
                    <NavLinks mainPage={mainPage} listPage={listPage} placement="bottom" />}
            </footer>
        </>
    );


};
