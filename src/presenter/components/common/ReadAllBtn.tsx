import { Icon } from "./IconComp";
import DI from "../../../di/ioc";
import { useNotificationStore } from "../../../application/stores/notification.store";
import Chip from "./adaptatersComps/Chip";

export const ReadAllButton = ({ update }: { update?: any }) => {
    const { fetchNotif, setUnReadNotif } = useNotificationStore();
    const readAll = () => DI.resolve('readAllNotifUseCase').execute();
    return (

        <Chip
            size="medium"
            iconPlacement="end"
            value='Tout lire'
            color='error'
            icon={<Icon title="marquer tout comme lu , vous ne verrez plus de notifications" size='md' icon="delete" />}
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

        />
    );
}