import { useState, useEffect } from "react";
import { connectedUsersStore } from "../../../application/stores/connectedUsers.store";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { Notif } from "../../../domain/entities/Notif";
import DI from "../../../di/ioc";
import { Icon } from "./IconComp";
import { useUserStore } from "../../../application/stores/user.store";
import { CardMD } from "../shared/base/baseComps/Cards";
import { useNavigate } from "react-router-dom";
import Chip from "./adaptatersComps/Chip";

export const AlertNotif = () => {
    const { isLoggedIn } = useUserStore(state => state);
    const notifViewModelFactory = DI.resolve('notifViewModel');
    const { refetch, countMsg, countOther } = notifViewModelFactory()
    const nameSpace = 'notifs';
    const [notif, setNotif] = useState<string | null>(null);
    const [link, setLink] = useState<string>('/')
    const socketService = DI.resolve('socketService');
    const { setConnectedUsers } = connectedUsersStore();
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const { setUnReadMsgNotif, setUnReadNotMessages } = useNotificationStore();
    const navigate = useNavigate()

    //// SOCKET CONNECTION
    const connexion = () => {
        console.warn('CONNECTION')
        socketService.connect(nameSpace);
        socketService.onConnect(() => { setIsConnected(true) });
    }

    const up = async () => await socketService.sendMessage({ message: 'connexion au notif' }, nameSpace);

    useEffect(() => {
        if (!isLoggedIn) return;
        console.warn('mounted CHAT')
        if (!isConnected) {
            connexion();
            up();
        }

        socketService.onConnectError((error: Error) => {
            console.error("Connection Error:", error);
        })

        return () => {
            console.warn('unmounted CHAT')
            socketService.disconnect(nameSpace);
            setIsConnected(false);
        }
    }, [isLoggedIn])



    useEffect(() => {
        const handleNewMessage = async (newMessage: any) => {
            console.log('new message in AlertNotif', newMessage)
            socketService.onNewMessage(async (newMessage: Notif | { users: number[] }) => {
                if (newMessage && typeof newMessage === 'object' && 'description' in newMessage) {
                    const notifMessage = newMessage as Notif;
                    setNotif(notifMessage.description);
                    notifMessage.link && setLink(notifMessage.link);
                    setTimeout(() => { setNotif('') }, 7000);
                    if (notifMessage.type === 'MESSAGE') {
                        await refetch();
                        setUnReadMsgNotif(countMsg + 1);
                    } else {
                        await refetch();
                        setUnReadNotMessages(countOther + 1);
                    }
                } else if (newMessage && typeof newMessage === 'object' && 'users' in newMessage) {
                    setConnectedUsers((newMessage as { users: number[] }).users);
                }
            })
        }
        socketService.onNewMessage(handleNewMessage);
    }, [refetch, setUnReadMsgNotif, socketService]);



    return (
        <div className={`h-max w-full z-[1000] absolute left-0 top-0 flex justify-center `}>
            <div className="relative z-50 w-[90%] max-w-[600px] mx-auto justify-center items-center">
                <CardMD className={`w-full  h-max mt-6  transition-all duration-1000 ease-in-out transform  
                 ${notif ?
                        'md3-animation-slide-down' :
                        'md3-animation-slide-out-up '} `}>
                    <CardMD.Subhead
                        className=" gap-4 flex   decoration-gray-300">

                        {notif}

                    </CardMD.Subhead>
                    <CardMD.Divider />
                    <CardMD.Footer className="px-4 !pt-0">
                        {link && <Chip onClick={() => navigate(link)} value='Voir' />}
                    </CardMD.Footer>
                    <Icon
                        bg
                        color='error'
                        style='absolute right-3 top-3 '
                        icon='close'
                        size='sm'
                        onClick={() => setNotif(null)}
                    />
                </CardMD>
            </div>
        </div>
    );
}
