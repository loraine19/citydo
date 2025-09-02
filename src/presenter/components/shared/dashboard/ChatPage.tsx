import { useEffect, useState } from 'react';
import { Card, Typography, CardBody, List } from '@material-tailwind/react';
import SubHeader from '../../common/SubHeader';
import { Skeleton } from '../../common/Skeleton';
import DI from '../../../../di/ioc';
import { MessageView } from '../../../views/viewsEntities/messageViewEntity';
import Chat from './Chat';
import { User } from '../../../../domain/entities/User';
import { Icon } from '../../common/IconComp';
import { useSearchParams } from 'react-router-dom';
import { AvatarUser } from '../../common/AvatarUser';
import NotifDiv from '../../common/NotifDiv';
import { useUxStore } from '../../../../application/stores/ux.store';


export default function ChatPage() {

    //// PARAMS
    const [Params, setParams] = useSearchParams();
    const params = { with: Params.get("with"), text: Params.get("text") }
    const [userIdRec, setUserIdRec] = useState(parseInt(params.with || '0'));

    //// VIEW MODEL
    const { conversations, countConv, isLoadingConv, refetchConv, errorConv } = DI.resolve('conversationsViewModel')()
    const [notif, setNotif] = useState<string>('');
    const conversationViewModelFactory = DI.resolve('conversationViewModel')
    const { messages, isLoading, refetch, fetchNextPage, hasNextPage, error } = conversationViewModelFactory(userIdRec)
    const getUserById = async (id: number) => await DI.resolve('getUserByIdUseCase').execute(id);
    const { setColor } = useUxStore()


    //// OPEN CHAT
    const [open, setOpen] = useState(params.with ? true : false);
    const [userRec, setUserRec] = useState<User>({} as User);
    useEffect(() => {
        if (params.with && params.with !== '0') {
            const convMap = conversations.filter((conv: MessageView) => conv?.isWith?.id === parseInt(params.with || '0'));
            if (conversations && convMap.length === 0) {
                newUserConv();
                setNewConv(true);
            }
        }
    }, [params.with])

    const newUserConv = async () => {
        const UserRec = await getUserById(parseInt(params.with || '0'));
        setUserRec(UserRec)
    }

    //// SOCKET CONNECTION
    const nameSpace = 'chat';
    const [online, setOnline] = useState<number[]>([]);
    const [newConv, setNewConv] = useState<boolean>(false);
    const [connected, setConnected] = useState<boolean>(false);
    const socketService = DI.resolve('socketService');

    const connexion = () => {
        socketService.connect(nameSpace);
        socketService.onConnect(() => { setConnected(true) });
    }

    const up = async () => await socketService.sendMessage({ message: 'connexion au chat' }, nameSpace);
    useEffect(() => {
        console.warn('mounted CHAT')
        if (!connected) {
            connexion();
            up();
            setColor(connected ? 'cyan' : 'slate')
        }
        socketService.onConnectError((error: Error) => {
            console.error("Connection Error:", error);
        })

        return () => {
            console.warn('unmounted CHAT')
            socketService.disconnect(nameSpace)
            setConnected(false);
        }
    }, [])

    useEffect(() => {
        const handleNewMessage = async (newMessage: any) => {
            console.log('new message received', newMessage);
            if (newMessage?.users) { setOnline(newMessage.users); return }
            refetchConv()
            if (newMessage.userIdRec === userRec.id || newMessage.userId === userRec.id) {
                await refetch()
            }
        }
        socketService.onNewMessage(handleNewMessage)
    }, [userRec.id, refetch, refetchConv, socketService]);



    const [message, setMessage] = useState(params?.text ?? '');
    const handleSendMessage = async () => {
        !connected && connexion()
        if (message.trim() !== '') {
            const messageData = { userIdRec, message };
            const ret = await socketService.sendMessage(messageData, nameSpace);
            if (ret) {
                await refetch();
                setMessage('')
                setParams({ with: userIdRec.toString(), text: '' });
            }
            else {
                setMessage(message)
                setConnected(false);
                setNotif('Erreur de connexion à la conversation');
            }

        }
    }

    //// NOTIFICATION CONVERSATION
    const [notifConv, setNotifConv] = useState<string>('');
    useEffect(() => {
        if (errorConv) {
            setNotifConv(error ?? 'Erreur lors du chargement des conversations');
            console.error('Error loading conversations:', errorConv);
        } else if (isLoadingConv) {
            setNotifConv('Chargement des conversations...');
        } else if (conversations && conversations.length === 0) {
            setNotifConv('Aucune conversation trouvée');
        } else {
            setNotifConv('');
        }
    }, [conversations, countConv, isLoadingConv, errorConv])


    return (
        <>
            <main>
                <div className='sectionHeader '>
                    <SubHeader
                        qty={open ? messages?.length : countConv}
                        type={open ? 'messages ' : 'conversation '}
                        place={' avec ' + (userRec?.Profile?.firstName ?? 'des membres')}
                        closeBtn
                        link='/' />
                    {notif}
                    {!connected &&
                        <Icon
                            fill
                            color='red'
                            icon='sync_problem'
                            title='actualiser'
                            onClick={() => connexion()} />}

                </div>
                <section className='flex !px-0 pb-4 !pt-7'>
                    {notifConv &&
                        <NotifDiv
                            notif={notifConv}
                            error={errorConv}
                            isLoading={isLoadingConv}
                            refetch={refetchConv}
                        />}
                    {isLoadingConv ?
                        <Skeleton className=' m-auto !h-full !rounded-3xl' /> :
                        <Card className='FixCardNoImage !flex !pb-0 !px-0 h-full'>
                            <CardBody className=' !p-0.5  h-full'>
                                <div className='flex flex-1 h-full  '>
                                    <div className='flex-1 overflow-y-auto overflow-x-hidden'>
                                        <List className='flex-1 !border-8 gap-1 border-white'>
                                            {conversations &&
                                                conversations.map((message: MessageView, index: number) =>
                                                    <div key={index + 'div'}>
                                                        <List.Item
                                                            className={`p-1 gap-1 ${(userIdRec === message?.isWith.id) ? '!bg-slate-200 !border-white !border-8 shadow-md -mt-1 -ml-2' : 'bg-white '}`}
                                                            key={index}
                                                            onClick={() => {
                                                                setOpen(true)
                                                                const userRec = message?.IWrite ? message?.UserRec : message?.User
                                                                setUserRec(userRec)
                                                                setUserIdRec(userRec.id)
                                                                setParams({ with: userRec.id.toString() })
                                                            }} >
                                                            <List.ItemStart className='relative flex min-w-max'>
                                                                <AvatarUser
                                                                    avatarSize='md'
                                                                    Profile={message?.isWith?.Profile}
                                                                />
                                                                {(online.length > 0 &&
                                                                    online.includes(message.isWith.id)) &&
                                                                    <span className='absolute top-0 -right-2 bg-green-500 rounded-full
                                                                border-4  p-1.5 border-white'>
                                                                    </span>
                                                                }
                                                            </List.ItemStart>
                                                            <div className="font-normal w-full flex flex-col">
                                                                <div className='flex justify-between items-center flex-1 w-full'>
                                                                    <Typography as="h6" >
                                                                        {message.isWith?.Profile?.firstName}
                                                                    </Typography>
                                                                    <span
                                                                        className='px-4 !text-xs text-slate-400'>
                                                                        {message.formatedDate}
                                                                    </span>
                                                                </div>
                                                                <Typography
                                                                    variant="small"
                                                                    className="font-normal !line-clamp-1">
                                                                    {message.IWrite &&
                                                                        <span className='text-slate-400'>
                                                                            {message.read && '🗸'}
                                                                            {' vous : '}
                                                                        </span>}
                                                                    {message?.message ?? '...'}
                                                                </Typography>
                                                            </div>
                                                        </List.Item>
                                                        <hr className='border-b-[1px] border-t-0 !border-slate-400/90'></hr>
                                                    </div>
                                                )}
                                        </List>
                                    </div>
                                    {open &&
                                        <div className='relative mt-6 !w-[calc(100%-4rem)]'>
                                            <Chat
                                                refetch={refetch}
                                                setNewConv={setNewConv}
                                                newConv={newConv}
                                                isLoading={isLoading}
                                                fetchNextPage={fetchNextPage}
                                                hasNextPage={hasNextPage}
                                                messages={messages}
                                                message={message}
                                                setMessage={setMessage}
                                                handleSendMessage={handleSendMessage}
                                                userRec={userRec}
                                                error={error}
                                            />
                                            <Icon
                                                style='absolute z-[999] -top-5 !right-1'
                                                size='md'
                                                bg clear
                                                icon='close'
                                                title='fermer'
                                                onClick={() => {
                                                    setParams({ with: '0' })
                                                    setUserIdRec(0)
                                                    setUserRec({} as User)
                                                    setOpen(false)
                                                }}
                                            />
                                        </div>
                                    }
                                </div>
                            </CardBody>
                        </Card>}
                </section>
            </main >
        </ >
    )
}
