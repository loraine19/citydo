import { Icon } from "./IconComp";
import DI from "../../../di/ioc";
import { useNotificationStore } from "../../../application/stores/notification.store";

export const ReadAllButton = ({ update }: { update?: any }) => {
    const { fetchNotif, setUnReadNotif } = useNotificationStore();
    const readAll = () => DI.resolve('readAllNotifUseCase').execute();
    return <Icon
        bg fill
        color='red'
        icon="delete"
        size="md"
        style="absolute !shadow-md right-2 top-0.5 z-30 "
        onClick={
            async () => {
                const notifs = await readAll();
                if (notifs) {
                    //// TODO verifier 
                    fetchNotif();
                    update();
                }
                setUnReadNotif(0);
            }} title="marquer tout comme lu , vous ne verrez plus de notifications" />
}