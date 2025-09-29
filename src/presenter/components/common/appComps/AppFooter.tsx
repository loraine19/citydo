import { useNotificationStore } from "../../../../application/stores/notification.store";
import { useUxStore } from "../../../../application/stores/ux.store";
import { NavLinks } from "./NavLinks";

interface AppFooterProps {
    handleClick?: () => void;
    mainPage?: boolean;
    listPage?: boolean;
    detailPage?: boolean;
    singlePage?: boolean;
    addFab?: boolean;
    color?: string;
}

export const AppFooter: React.FC<AppFooterProps> = ({ mainPage, listPage, addFab }) => {
    const { } = useNotificationStore((state) => state);
    const { setNavBottom, navBottom } = useUxStore((state) => state)

    if (navBottom) return (
        <>
            <footer className={` -mb-[1px] bottom-0 ${mainPage ? 'fixed' : 'fixed'}`}
                onDrag={() => setNavBottom(!navBottom)}>
                {((mainPage || listPage) && navBottom) &&
                    <NavLinks mainPage={mainPage} addFab={addFab} placement="bottom" />}
            </footer>
        </>
    );


};
