import { MenuItem, Dialog, Card } from "@material-tailwind/react"
import { Icon } from "./IconComp"
import { NotifView } from "../../views/viewsEntities/notifViewEntity";
import { useNavigate } from "react-router";
import DI from "../../../di/ioc";
import { LoadMoreButton } from "./LoadMoreBtn";
import { useEffect, useRef, useState } from "react";
import { useNotificationStore } from "../../../application/stores/notification.store";
import Chip from "./adaptatersComps/Chip";
import NotifDiv from "./NotifDiv";

export function NotifBadge({ onBoard }: { onBoard?: boolean }) {
    const notifViewModelFactory = DI.resolve('notifViewModel');
    const readNotif = async (id: number) => await DI.resolve('readNotifUseCase').execute(id);
    const { isLoading, refetch, fetchNextPage, hasNextPage, countMsg, countOther, notifsMsg, notifsOther, error } = notifViewModelFactory()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate()

    //// TODO SET UNREAD NOTIF BY TYPE ( UPDATE COUNT FROM VIEW )
    const { setUnReadNotif } = useNotificationStore();


    //// HANDLE SCROLL
    const divRef = useRef<HTMLDivElement>(null);
    const [isBottom, setIsBottom] = useState(false);
    const handleScroll = () => {
        setIsMenuOpen(true);
        if (isMenuOpen && divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 2 >= scrollHeight) {
                setIsBottom(true);
                if (hasNextPage) fetchNextPage()
            } else setIsBottom(false)
        }
    };
    type NotifBadgeProps = { count: number, notifs: NotifView[], color: string, icon: string, link: string }

    const badgeMapGenerator = () => [
        { count: countMsg, notifs: notifsMsg, color: 'cyan', icon: 'forum', link: '/chat' },
        { count: countOther, notifs: notifsOther, color: 'orange', icon: 'notifications', link: '/notification' }
    ];
    const [badgeMap, setBadgeMap] = useState<NotifBadgeProps[]>(badgeMapGenerator());

    useEffect(() => {
        setBadgeMap(badgeMapGenerator());
    }, [isLoading])


    return (
        <div className={` gap-2 flex h-full lg:-mr-2`}>
            {badgeMap.map((list: NotifBadgeProps, index: number) =>
                <div key={index}
                    className={`relative  w-full flex items-center justify-center ${onBoard ? 'lg:hidden' : ''}`}>
                    <Icon
                        link={list.link}
                        icon={list.icon}
                        color={list.color}
                        bg fill
                        size="xl"
                        title={'ouvrir la page'} />

                    <Dialog >
                        <Dialog.Trigger
                            className={` ${list.count > 0 ? '' : 'invisible'} h-full w-full -ml-3  pt-1 relative flex`}>
                            <div className={` font-medium justify-center w-[1.4rem] h-[1.4rem] text-[0.75rem] !min-w-[1.4rem] pt-[0.3rem] pb-1 ${list.color}StyleInv rounded-full px-1  shadow z-[9999]`}> {list.count >= 99 ? '⁺99 ' :
                                (list.count ? list.count.toString() : '0')}
                            </div>
                        </Dialog.Trigger>
                        <Dialog.Content className="h-[calc(100dvh-3rem)] top-[3rem] translate-y-[0%] !w-screen mx-auto flex-1 backdropBlur bg-transparent border-none px-[10%] !flex">

                            <Card className="wRespXL  bg-slate-50 overflow-hidden w-full h-full !flex card p-8 ">
                                <div className="flex flex-1 py-4 w-full h-full"
                                    id='notifList'
                                    key={index + '1'}
                                    ref={divRef}>
                                    <div onScroll={handleScroll}
                                        className="relative overflow-auto !border-none hover:!border-none flex flex-1 divide-y !divide-slate-300 p-4 w-full h-full flex-col">
                                        <NotifDiv
                                            isLoading={isLoading}
                                            refetch={refetch}
                                            notif={error} />
                                        {list.count === 0 ? (
                                            <div className="flex items-center justify-center p-4">
                                                <i>
                                                    Aucun nouveau message
                                                </i>
                                            </div>)
                                            : (list.notifs.map((notif: NotifView, index2: number) => notif?.read === false &&
                                                <MenuItem className="flex flex-col  flex-1  "
                                                    key={index2 + list.color}>
                                                    <div className="flex w-full py-1 gap-4">
                                                        <Chip
                                                            value={notif.typeS}
                                                            className={`${list.color}Chip`}
                                                            size='sm'>
                                                        </Chip>
                                                        <Chip
                                                            value={notif.update}
                                                            className={`slateChip`}
                                                            size='sm'>
                                                        </Chip>
                                                    </div>
                                                    <div className="flex items-center w-full justify-between gap-1 pt-1">
                                                        <i className="max-w-[calc(100%-2rem)] truncate">
                                                            {notif.description}
                                                        </i>
                                                        {notif.link &&
                                                            <Icon
                                                                style={'-mt-6'}
                                                                bg
                                                                icon="chevron_right"
                                                                fill
                                                                onClick={
                                                                    async () => {
                                                                        await readNotif(notif.id);
                                                                        await refetch();
                                                                        setUnReadNotif(list.notifs.length - 1);
                                                                        notif.link && navigate(notif.link)
                                                                    }}
                                                                size="lg"
                                                            />}
                                                    </div>
                                                </MenuItem>)
                                            )}
                                    </div>


                                    <LoadMoreButton
                                        color={list.color}
                                        style="-mb-3"
                                        size="2xl"
                                        isBottom={isBottom}
                                        hasNextPage={hasNextPage}
                                        handleScroll={() => handleScroll()} />


                                </div>
                            </Card>
                        </Dialog.Content>
                    </Dialog>
                </div>
            )}
        </div >
    )
}