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
import NotifDiv from '../../common/NotifDiv';


type ChatProps = {
    userRec: User,
    handleSendMessage: () => void,
    setMessage: any,
    message: string,
    messages: MessageView[], fetchNextPage: any, hasNextPage: boolean, isLoading: boolean,
    newConv?: boolean,
    setNewConv?: any,
    refetch: () => void
    error: string | null
}

const Chat: React.FC<ChatProps> = ({ userRec = {} as User, handleSendMessage, message, setMessage, messages, fetchNextPage, hasNextPage, isLoading, newConv, setNewConv, refetch, error }) => {

    const [imTyping, setImTyping] = useState(message ? true : false);
    const readConversationUseCase = async (id: number) => DI.resolve('readConversationUseCase').execute(id);
    const [notif, setNotif] = useState<string>('Chargement...');

    const { setAlertValues, setOpen, open } = useAlertStore(state => state);

    useEffect(() => {
        setNotif(isLoading ? 'Chargement...' : error ?? '');
        if (!newConv && userRec?.id && !messages[0]?.read && !isLoading) {
            const read = async () => await readConversationUseCase(userRec.id);
            read();
        }
    }, [userRec, newConv, messages, isLoading, error])

    useEffect(() => {
        if (error) setNotif(error);
        else if (messages.length == 0) {
            setNotif('aucun message');
        }
    }, [messages])


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
        <Card className='FixCardNoImage !bg-slate-200  !flex-col rounded-3xl  !flex !border-slate-50 !border-8 '>
            <CardHeader className={`${notif ? 'h-6' : ''} FixCardHeaderNoImage !rounded-b-none w-full px-3  pt-1 !relative !min-h-fit'`}>
                {newConv &&
                    <ProfileDiv profile={userRec} />}
                {notif && <div className=' !w-[22rem] !flex  !justify-end border opacity-60 absolute -translate-y-9 -translate-x-[50%] left-[50%]'>
                    <NotifDiv
                        notif={notif}
                        error={error}
                        isLoading={isLoading || messages.length !== 0}
                        refetch={refetch} />
                </div>}
            </CardHeader>
            <CardBody
                ref={divRef}
                onScroll={() => handleScroll()}
                className='rounded-3xl !flex flex-1 !overflow-auto flex-col-reverse px-4 '>
                <div className='gap-3  lg:px-2 flex-1 justify-end items-end flex flex-col-reverse' >
                    {!isLoading && messages && messages.map((msg: MessageView, index: number) => (
                        <div key={index}
                            className={`flex p-0 w-full items-start ${msg.userId === messages[index + 1]?.userId ? ' pt-0' : ' pt-4'}`} >
                            <div className={`flex flex-1 [overflow-wrap:anywhere] flex-col px-5 shadow-sm border pt-3 pb-6 justify-between relative  
                                    ${msg.isDeleted ? 'italic text-slate-400' : ''} 
                                    ${msg.IWrite ?
                                    'bg-cyan-100 !text-right justify-end rounded-s-[1.5rem] rounded-tr-[1.5rem] !ml-[28%] ' :
                                    'bg-orange-100 rounded-ss-[1.5rem] rounded-r-[1.5rem] !mr-[28%]'}`}>
                                <div className='text-xs font-light items-center flex flex-row-reverse justify-between'>
                                    {msg.formatedDate}
                                    {(msg.IWrite && !msg.isDeleted) &&
                                        <Icon
                                            style='!-ml-1.5 mb-1'
                                            key={'remove' + msg.id}
                                            size='sm'
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
            <CardFooter className=' !p-0'>
                <div
                    className={`${imTyping ? '-top-2' : '-top-1'} bg-white flex justify-between rounded-[2rem] relative p-2 shadow-md m-2 min-h-min `}>
                    <div className='flex-0 flex top-0' >
                        <Icon
                            onClick={() => setOpenEmoji(!openEmoji)}
                            color='slate'
                            title='Emoji'
                            size='3xl'
                            icon='mood'
                            style={`max-h-max relative`}
                        />
                        <div className='absolute flex overflow-auto items-end w-full pr-3 -ml-3 z-50 mb-14 bottom-0 '>
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
                    <textarea
                        onFocus={() => setImTyping(true)}
                        className='rounded-3xl h-10 py-2.5 bg-slate-200/70 pl-4 mx-1 w-full focus:outline-none resize-none '
                        rows={1}
                        value={message}
                        placeholder='Ecrivez un message...'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey && message.trim() !== '') {
                                e.preventDefault();
                                handleSendMessage();
                                setNewConv(false);
                                setImTyping(false);
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = `40px`;
                                target.style.height = `${target.scrollHeight}px`;
                            }
                        }}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            setImTyping(true);
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = `40px`;
                            target.style.height = `${target.scrollHeight}px`;
                        }}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            if (target.value.trim() === '') {
                                setImTyping(false);
                            } else {
                                setImTyping(true);
                                setMessage(target.value);
                            }
                            target.style.height = '40px';
                            target.style.height = `${target.scrollHeight}px`;
                        }}
                        style={{ maxHeight: '40vh' }}
                    />
                    <Icon
                        color='slate'
                        title='Envoyer'
                        onClick={() => {
                            handleSendMessage();
                            setNewConv(false);
                            setImTyping(false)
                        }}
                        icon='send'
                        size='3xl' />
                </div>
            </CardFooter>
        </Card >
    );

};

export default Chat;