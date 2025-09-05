import { Icon } from "./IconComp";
import DI from "../../../di/ioc";
import { useNotificationStore } from "../../../application/stores/notification.store";

export const ReadAllButton = ({ update }: { update?: any }) => {
    const { fetchNotif, setUnReadNotif } = useNotificationStore();
    const readAll = () => DI.resolve('readAllNotifUseCase').execute();
    return (
        <div className="absolute top-0 right-0 z-10 rounded-full m-1 shadow-md">
            <Icon
                reverse
                bg
                color='red'
                icon="delete"
                size="lg"
                onClick={
                    async () => {
                        const notifs = await readAll();
                        if (notifs) {
                            //// TODO verifier 
                            fetchNotif();
                            update();
                        }
                        setUnReadNotif(0);
                    }}
                title="marquer tout comme lu , vous ne verrez plus de notifications"
            />
        </div>
    );
}