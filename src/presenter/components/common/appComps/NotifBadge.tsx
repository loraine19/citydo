import { MenuItem, Dialog, Card } from "@material-tailwind/react"
import { Icon, IconName } from "../IconComp"
import { NotifView } from "../../../views/viewsEntities/notifViewEntity";
import { useNavigate } from "react-router";
import DI from "../../../../di/ioc";
import { LoadMoreButton } from "../LoadMoreBtn";
import { useEffect, useRef, useState } from "react";
import { useNotificationStore } from "../../../../application/stores/notification.store";
import Chip from "../adaptatersComps/Chip";
import NotifDiv from "../NotifDiv";
import { useUxStore } from "../../../../application/stores/ux.store";
import { Md3Colors } from "../../shared/base/baseComps/Buttons";

export function NotifBadge({ onBoard }: { onBoard?: boolean }) {
    const notifViewModelFactory = DI.resolve('notifViewModel');
    const readNotif = async (id: number) => await DI.resolve('readNotifUseCase').execute(id);
    const { isLoading, refetch, fetchNextPage, hasNextPage, countMsg, countOther, notifsMsg, notifsOther, error } = notifViewModelFactory()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate()

    const { navBottom } = useUxStore()

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
    }, [isLoading, error])


    return (
        <div className={` pb-0.5 pl-2  md:gap-3  flex  items-center `}>
            {badgeMap.map((list: NotifBadgeProps, index: number) =>
                <div key={index}
                    className={`relative w-full flex items-center justify-center ${onBoard ? 'lg:hidden' : ''}`}>
                    <Icon
                        reverse={!navBottom}
                        onClick={() => navigate(list.link)}
                        icon={list.icon as IconName}
                        color={'slate'}
                        bg={navBottom ? false : false}
                        fill={(navBottom) ? false : false}
                        size={navBottom ? '2xl' : '2xl'}
                        title={'ouvrir la page'} />

                    <Dialog >
                        <Dialog.Trigger
                            className={` ${list.count > 0 ? '' : 'invisible'} 
                            ${navBottom ? '-ml-3 pr-2' : '-ml-4 pr-0.5 '} h-max w-full -mt-6  relative  flex`}>
                            <Icon
                                title={'ouvrir le popup'}
                                style={(' border-[5px] !border-current') + ' !font-semibold scale-[0.8] !pt-[1px]'}
                                bg
                                reverse
                                // icon={list.count >= 99 ? '⁺99 ' :
                                //     (list.count ? list.count.toString() : '0')}
                                textIcon=''
                                color={list.color}
                                fill={!navBottom}
                                size={'xs'} />
                        </Dialog.Trigger>
                        <Dialog.Content className="h-[calc(100dvh-8rem)] top-[calc(50vh-1rem)] !w-screen mx-auto flex-1 backdropBlur !bg-transparent border-none px-4 !flex">

                            <Card className="wRespXL bg-slate-50 overflow-hidden w-full h-full !flex card p-8 ">
                                <div className="flex flex-1 py-4 w-full h-full"
                                    id='notifList'
                                    key={index + '1'}
                                    ref={divRef}>
                                    <div onScroll={handleScroll}
                                        className="relative overflow-auto !border-none hover:!border-none flex flex-1 divide-y !divide-slate-300 p-4 w-full h-full flex-col">
                                        {(error || !list.notifs) && <NotifDiv
                                            isLoading={isLoading}
                                            refetch={refetch}
                                            notif={error ?? "Aucune notification"} />}
                                        {list.notifs.map((notif: NotifView, index2: number) => notif?.read === false &&
                                            <MenuItem className="flex flex-col  flex-1  "
                                                key={index2 + list.color}>
                                                <div className="flex w-full py-1 gap-4">
                                                    <Chip
                                                        value={notif.typeS}
                                                        color={`${list.color}` as Md3Colors}>
                                                    </Chip>
                                                    <Chip
                                                        value={notif.update}>
                                                    </Chip>
                                                </div>
                                                <div className="flex items-center w-full justify-between gap-1 pt-1">
                                                    <i className="max-w-[calc(100%-2rem)] truncate">
                                                        {notif.description}
                                                    </i>
                                                    {notif.link &&
                                                        <Icon
                                                            style={'-mt-6'}
                                                            icon="keyboard_arrow_right"
                                                            fill
                                                            onClick={
                                                                async () => {
                                                                    await readNotif(notif.id);
                                                                    await refetch();
                                                                    setUnReadNotif(list.notifs.length - 1);
                                                                    notif.link && navigate(notif.link)
                                                                }}
                                                            size="2xl"
                                                        />}
                                                </div>
                                            </MenuItem>)}
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