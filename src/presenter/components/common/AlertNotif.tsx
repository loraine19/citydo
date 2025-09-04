import { Card, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { connectedUsersStore } from "../../../application/stores/connectedUsers.store";
import { useNotificationStore } from "../../../application/stores/notification.store";
import { Notif } from "../../../domain/entities/Notif";
import DI from "../../../di/ioc";
import { Icon } from "./IconComp";
import { useUserStore } from "../../../application/stores/user.store";

export const AlertNotif = () => {
    const { isLoggedIn } = useUserStore(state => state);
    const notifViewModelFactory = DI.resolve('notifViewModel');
    const { refetch, countMsg, countOther } = notifViewModelFactory()
    const nameSpace = 'notifs';
    const [notif, setNotif] = useState<string | null>(null);
    const [link, setLink] = useState<string | null>('/')
    const socketService = DI.resolve('socketService');

    const { setConnectedUsers } = connectedUsersStore();
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const { setUnReadMsgNotif, setUnReadNotMessages } = useNotificationStore();

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
                    setLink(notifMessage.link || '/');
                    setTimeout(() => { setNotif('') }, 5000);
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
                <Card className={`w-full rounded-2xl h-max  shadow-lg transition-all duration-1000 ease-in-out transform bg-opacity-95 py-9 px-6 mt-2
                 ${notif ?
                        'scale-100 opacity-100 top-4 slide absolutme' :
                        'scale-80 opacity-0 top-0'} `}>
                    <Typography
                        className="underline underline-offset-8  decoration-gray-300"
                        as="a"
                        href={link ?? '/'}
                    >{notif}
                    </Typography>
                    <Icon
                        bg

                        style='absolute right-3 top-3 '
                        icon='close'
                        size='sm'
                        onClick={() => setNotif(null)}
                    />
                </Card>
            </div>
        </div>
    );
}
