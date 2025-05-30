import { useState, useEffect, useRef } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';
import { MessageView } from '../../../views/viewsEntities/messageViewEntity';
import { User } from '../../../../domain/entities/User';
import { LoadMoreButton } from '../../common/LoadMoreBtn';
import { Icon } from '../../common/IconComp';
import { ProfileDiv } from '../../common/ProfilDiv';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import DI from '../../../../di/ioc';
import { useAlertStore } from '../../../../application/stores/alert.store';


type ChatProps = {
    userRec: User,
    handleSendMessage: () => void,
    setMessage: any,
    message: string,
    messages: MessageView[], fetchNextPage: any, hasNextPage: boolean, isLoading: boolean,
    newConv?: boolean,
    setNewConv?: any,
    refetch?: () => void
}

const Chat: React.FC<ChatProps> = ({ userRec = {} as User, handleSendMessage, message, setMessage, messages, fetchNextPage, hasNextPage, isLoading, newConv, setNewConv, refetch }) => {

    const [imTyping, setImTyping] = useState(message ? true : false);
    const readConversationUseCase = async (id: number) => DI.resolve('readConversationUseCase').execute(id);
    const [notif, setNotif] = useState<string>('Chargement...');

    const { setAlertValues, setOpen, open } = useAlertStore(state => state);

    useEffect(() => {
        setNotif(userRec?.Profile?.firstName ? `Conversation avec ${userRec?.Profile?.firstName}` : 'Chargement...');
        if (!newConv && userRec?.id && !messages[0]?.read && !isLoading) {
            const read = async () => await readConversationUseCase(userRec.id);
            read();
        }
    }, [userRec])


    const removeMessage = async (id: number) => await DI.resolve('removeMessageUseCase').execute(id)
    const [notifRemove, setNotifRemove] = useState<string>('');
    const handleRemoveMessage = (id: number, index: number) => {
        setOpen(true);
        setAlertValues({
            title: 'Supprimer le message',
            element: <Typography className='text-center'>Êtes-vous sûr de vouloir supprimer ce message ?</Typography>,
            isOpen: open,
            disableConfirm: false,
            close: () => setOpen(false),
            confirmString: 'Ok',
            notif: notifRemove,
            handleConfirm: async () => {
                const data = await removeMessage(id);
                if (!data) setNotifRemove('Erreur lors de la suppression du message')
                else {
                    messages[index].message = data.message;
                    refetch && refetch();
                    setOpen(false)
                }
            }
        })
    }



    //// HANDLE SCROLL
    const divRef = useRef<HTMLDivElement>(null);
    const [isBottom, setIsBottom] = useState(false);
    const handleScroll = () => {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current
            if ((scrollHeight + scrollTop) <= clientHeight + 4) {
                setIsBottom(true);
                if (hasNextPage) fetchNextPage()
            } else setIsBottom(false)
        }
    }

    const [openEmoji, setOpenEmoji] = useState(false);

    return (
        <div className={' pt-6 flex h-full flex-1 '}>
            <Card className='FixCardNoImage flex bg-blue-gray-50  border-white border-8'>
                <CardHeader className='FixCardHeaderNoImage min-h-max  !bg-transparent px-3 pt-2'
                    floated={false}>
                    {newConv ?
                        <ProfileDiv profile={userRec} /> :
                        <Typography
                            variant="h6">
                            {notif}
                        </Typography>}
                </CardHeader>
                <CardBody
                    ref={divRef}
                    onScroll={() => handleScroll()}
                    className='overflow-auto flex-1 flex flex-col-reverse pt-4'>
                    <div className='gap-4 p-3 justify-end items-end flex flex-col-reverse' >
                        {!isLoading && messages && messages.map((msg: MessageView, index: number) => (
                            <div className={`flex p-0 w-full items-start ${msg.userId === messages[index + 1]?.userId ? ' pt-0' : ' pt-4'}`}
                                key={index}>

                                <div className={`flex flex-1 flex-col px-5 shadow-sm pt-3 pb-6 justify-between relative  ${msg.isDeleted ? 'italic text-blue-gray-400' : ''} ${msg.IWrite ?
                                    'bg-cyan-100 !text-right justify-end rounded-s-[1.5rem] rounded-tr-[1.5rem] !ml-[30%] ' :
                                    'bg-orange-100 rounded-ss-[1.5rem] rounded-r-[1.5rem] !mr-[30%]'}`}>
                                    <div className='text-xs font-light items-center flex flex-row-reverse justify-between'>
                                        {msg.formatedDate}
                                        {(msg.IWrite && !msg.isDeleted) &&
                                            <Icon
                                                style='-ml-2'
                                                key={'remove' + msg.id}
                                                size='sm'
                                                fill
                                                bg
                                                onClick={() => handleRemoveMessage(msg.id, index)}
                                                color='cyan'
                                                title='Supprimer le texte du message'
                                                icon='close' />}
                                    </div>
                                    {msg.message}
                                </div>
                            </div>
                        ))}
                    </div>
                    <LoadMoreButton
                        revers
                        isBottom={isBottom}
                        hasNextPage={hasNextPage}
                        handleScroll={handleScroll} />
                </CardBody >
                <CardFooter
                    className={`${imTyping ? '-top-4' : '-top-2'} flex justify-between rounded-[2rem] relative  bg-white p-2 shadow-md m-2 h-14`}>
                    <div className='flex-0 flex' >
                        <Icon
                            onClick={() => setOpenEmoji(!openEmoji)}
                            style='relative'
                            color='blue-gray'
                            title='Emoji'
                            size='3xl'
                            icon='mood'
                        />
                        <div className='absolute flex overflow-auto items-end w-full  pr-3 -ml-3 z-50 mb-14 bottom-0 '>
                            <EmojiPicker
                                className='bg-cyan-600 !overflow-auto max-h-[85%] z-40 p-1 mr-2 flex flex-1'
                                previewConfig={{ showPreview: false }}
                                searchPlaceHolder='Rechercher un emoji'
                                skinTonesDisabled={true}
                                searchDisabled={false}
                                emojiStyle={EmojiStyle.GOOGLE}
                                open={openEmoji}
                                onEmojiClick={(emoji) => {
                                    setMessage(message + ' ' + emoji.emoji + ' ');
                                    setOpenEmoji(false)
                                }} />
                        </div>
                    </div>
                    <input
                        className='rounded-full w-full pl-4 focus:outline-none '
                        type="text"
                        value={message}
                        placeholder='Ecrivez un message...'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && message.trim() !== '') {
                                handleSendMessage();
                                setNewConv(false);
                                setImTyping(false);
                            }
                        }}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            setImTyping(true)
                        }}
                        onInput={(e) => {
                            if ((e.target as HTMLInputElement).value.trim() === '') {
                                setImTyping(false)
                            } else {
                                setImTyping(true);
                                setMessage((e.target as HTMLInputElement).value);
                            }
                        }}
                    />
                    <Icon
                        color='blue-gray'
                        title='Envoyer'
                        onClick={() => {
                            handleSendMessage();
                            setNewConv(false);
                            setImTyping(false)
                        }}
                        icon='send'
                        size='3xl'
                    />

                </CardFooter>
            </Card >
        </div >
    );

};

export default Chat;