import { useState, useEffect, useRef } from 'react';
import { Typography } from '@material-tailwind/react';
import { MessageView } from '../../../views/viewsEntities/messageViewEntity';
import { User } from '../../../../domain/entities/User';
import { LoadMoreButton } from '../../common/LoadMoreBtn';
import { Icon } from '../../common/IconComp';
import { ProfileDiv } from '../../common/ProfilDiv';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import DI from '../../../../di/ioc';
import { useAlertStore } from '../../../../application/stores/alert.store';
import NotifDiv from '../../common/NotifDiv';
import { CardMD } from '../base/baseComps/Cards';


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

    useEffect(() => {
        const textarea = document.querySelector<HTMLTextAreaElement>('textarea');
        if (textarea) {
            textarea.style.height = '40px';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [message])


    const removeMessage = async (id: number) => await DI.resolve('removeMessageUseCase').execute(id)
    const [notifRemove, setNotifRemove] = useState<string>('');
    const handleRemoveMessage = (id: number, index: number) => {
        setOpen(true);
        setAlertValues({
            title: 'Supprimer le message',
            element: <Typography className='text-center'>Êtes-vous sûr de vouloir supprimer ce message ?</Typography>,
            isOpen: open,
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
        <div className='flex  flex-col h-full  '>
            <CardMD className='min-h-full grid w-full border border-[var(--md3-outline)] '>
                <CardMD.Header className={` w-full px-3  !relative !min-h-fit'`}>
                    {newConv &&
                        <ProfileDiv profile={userRec} />}
                    {notif && <div className=' !w-[22rem] !flex  !justify-end border  absolute -translate-y-8 -translate-x-[50%] left-[50%]'>
                        <NotifDiv
                            notif={notif}
                            error={error}
                            isLoading={isLoading || messages.length !== 0}
                            refetch={refetch} />
                    </div>}
                </CardMD.Header>
                <div
                    ref={divRef}
                    onScroll={() => handleScroll()}
                    className='rounded-3xl !flex flex-1  h-full !overflow-auto flex-col-reverse px-4 '>
                    <div className='gap-3  lg:px-2 flex-1 justify-end items-end flex flex-col-reverse' >
                        {!isLoading && messages && messages.map((msg: MessageView, index: number) => (
                            <div key={index}
                                className={`flex p-0 w-full items-start ${msg.userId === messages[index + 1]?.userId ? ' pt-0' : ' pt-4'}`} >
                                <div className={`flex flex-1 [overflow-wrap:anywhere] flex-col px-5 shadow-sm border border-[var(--md3-outline)] pt-3 pb-6 justify-between relative  
                                    ${msg.isDeleted ? 'italic opacity-50' : ''} 
                                    ${msg.IWrite ?
                                        'md3-cyan-container !text-right justify-end rounded-s-[1.5rem] rounded-tr-[1.5rem] !ml-[28%] ' :
                                        'md3-primary-container rounded-ss-[1.5rem] rounded-r-[1.5rem] !mr-[28%]'}`}>
                                    <div className='text-xs font-light items-center flex flex-row-reverse justify-between'>
                                        {msg.formatedDate}
                                        {(msg.IWrite && !msg.isDeleted) &&
                                            <Icon
                                                style='!-ml-1.5 mb-1'
                                                key={'remove' + msg.id}
                                                size='sm'
                                                onClick={() => handleRemoveMessage(msg?.id, index)}
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
                </div>
                <div className='pr-4'>
                    <div
                        className={`${imTyping ? '-top-2' : '-top-1'}  border border-[var(--md3-outline)] flex justify-between rounded-[2rem] w-full p-2 shadow-md m-2 min-h-min sticky `}>
                        <div className='flex-0 flex top-0 mt-1 ' >
                            <Icon
                                onClick={() => setOpenEmoji(!openEmoji)}
                                color='slate'
                                title='Emoji'
                                size='3xl'
                                icon='mood'
                                style={`max-h-max relative`}
                            />
                            <div className='!absolute flex overflow-auto  items-end w-full -ml-5 pr-2  z-50 mb-14 bottom-0 '>
                                <EmojiPicker
                                    className='!bg-[var(--md3-primary-container)] !border-[var(--md3-outline)] !overflow-auto !mb-2 !shadow-md !rounded-3xl max-h-[85%] z-40 p-1.5 ml-3 flex flex-1'
                                    previewConfig={{ showPreview: false }}
                                    searchPlaceHolder='Rechercher un emoji'
                                    skinTonesDisabled={true}
                                    height={350}
                                    searchDisabled={true}
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
                            className='rounded-3xl h-10 py-2.5 bg-[var(--md3-surface)] text-[var(--md3-on-surface)] pl-4 mx-1 w-full focus:outline-none resize-none '
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
                            style='!mt-0.5'
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
                </div>
            </CardMD >
        </div>
    );

};

export default Chat;