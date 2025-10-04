import { useEffect, useMemo, useState } from 'react';
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
import { useNavStore } from '../../../../application/stores/nav.store';
import FormHeadSection from '../base/baseComps/FormHeadSection';
import { CardMD } from '../base/baseComps/Cards';
import { List, ListItem } from '../base/baseComps/Lists';


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
    const { getColor } = useUxStore()


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
            getColor();
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
            if (newMessage.userIdRec === userRec?.id || newMessage.userId === userRec?.id) {
                await refetch()
            }
        }
        socketService.onNewMessage(handleNewMessage)
    }, [userRec?.id, refetch, refetchConv, socketService]);

    useEffect(() => {
        if (params.with && params.with !== '0') {
            setOpen(true);
            setUserIdRec(parseInt(params.with || '0'));
            getUserById(parseInt(params.with || '0')).then((user) => setUserRec(user));
        } else {
            setOpen(false);
            setUserIdRec(0);
            setUserRec({} as User);
        }
    }, [params.with]);

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


    //// TO NAV BAR
    const { setSearchSection } = useNavStore((state) => state);

    const SearchSection = useMemo(() => (
        <FormHeadSection
            isLoading={isLoading}
            notif={notif}
            refetch={refetch}
            error={error}
            infosChipValue={`${open ? `Chat avec ${userRec?.Profile?.firstName ?? ''}` : 'Chat '}
           ${open ? `${messages?.length} messages` : `${conversations?.length} conversations`}`} >
            {open &&
                <Icon
                    bg
                    style='absolute z-[999] -bottom-[3.5rem] md:!-right-4  right-2 animSlide border-4 md3-border-primary-container'
                    color={'slate'}
                    size='md'
                    icon='close'
                    title='fermer'
                    onClick={() => {
                        setParams({ with: '0' })
                        setUserIdRec(0)
                        setUserRec({} as User)
                        setOpen(false)
                    }}
                />
            }
        </FormHeadSection>
    ), [isLoading, open,]);

    useEffect(() => {
        setSearchSection(SearchSection);
        return () => {
            setSearchSection(undefined);
        }
    }, [SearchSection, isLoading, open]);

    return (
        <main className={`h-[calc(100%-6rem)] max-h-[calc(100%-7rem)] sm:max-h-[calc(100%-5rem)] `}>
            <section
                id='refDiv'
                className='flex !px-3 pt-3 pb-2  !overflow-hidden '>
                {isLoadingConv ?
                    <Skeleton className='m-auto !h-full' /> :
                    <CardMD className={`${open ? 'md3-surface' : ''} 
                        '!min-h-full !min-h-[100%] p!-0 grid !static '`}>
                        <div className='my-0 grid max-h-full h-full relative'>
                            <div className='overflow-y-auto overflow-x-hidden  '>
                                <List className='px-3 gap-1.5 flex !rounded-3xl'>
                                    {conversations &&
                                        conversations.map((message: MessageView, index: number) =>
                                            <div key={index + 'div'}>
                                                <ListItem
                                                    className={`gap-4 rounded-full overflow-hidden 
                                                        ${(userIdRec === message?.isWith.id) ?
                                                            'md3-primary-container !border md3-border py-2.5 px-2.5 md3-elevation-1 my-0.5 -ml-2 ' :
                                                            'md3-surface -ml-1.5 py-1 '}`}
                                                    key={index}
                                                    onClick={() => {
                                                        setOpen(true)
                                                        const userRec = message?.IWrite ? message?.UserRec : message?.User
                                                        setUserRec(userRec)
                                                        setUserIdRec(userRec.id)
                                                        setParams({ with: userRec.id.toString() })
                                                    }}
                                                    ItemStart={<div className='relative flex min-w-max'>
                                                        <AvatarUser
                                                            avatarSize={(userIdRec === message?.isWith.id) ? '2xl' : 'lg'}
                                                            Profile={message?.isWith?.Profile}
                                                        />
                                                        {(online.length > 0 &&
                                                            online.includes(message.isWith.id)) &&
                                                            <span className='absolute top-0 -right-2 md3-green rounded-full border-4 p-1.5 md3-border-surface '>
                                                            </span>
                                                        }
                                                    </div>}>
                                                    <div className="font-normal overflow-hidden w-full flex flex-col">
                                                        <div className='flex justify-between items-center flex-1 w-full'>
                                                            <h6>
                                                                {message.isWith?.Profile?.firstName}
                                                            </h6>
                                                            <span className='px-4 !text-xs opacity-70'>
                                                                {message.formatedDate}
                                                            </span>
                                                        </div>
                                                        <p className="font-normal !pr-2 !line-clamp-1">
                                                            {message.IWrite &&
                                                                <span className='opacity-70'>
                                                                    {message.read && '🗸'}
                                                                    {' vous : '}
                                                                </span>}
                                                            {message?.message ?? '...'}
                                                        </p>
                                                    </div>
                                                </ListItem>
                                            </div>)}
                                    {!connected &&
                                        <Icon
                                            fill
                                            color='red'
                                            icon='progress_activity'
                                            title='actualiser'
                                            onClick={() => connexion()} />}
                                    {(notifConv || errorConv) &&
                                        <NotifDiv
                                            notif={notifConv}
                                            error={errorConv}
                                            isLoading={isLoadingConv}
                                            refetch={refetchConv}
                                        />}

                                </List>
                            </div>
                            {/* CONVERSATION DIV */}
                            {open &&
                                <div className='absolute left-[4rem] right-0 flex-1 h-[calc(100%_+_1.25rem)] md3-surface rounded-l-3xl backdrop:opacity-5 -mt-3 flex  bg-clip-border '>
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
                                </div>
                            }
                        </div>
                    </CardMD>
                }
            </section>
        </main >
    )
}
