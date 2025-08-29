import { Menu, MenuTrigger, MenuContent, Typography, MenuItem } from "@material-tailwind/react"
import { Icon } from "./IconComp"
import { NotifView } from "../../views/viewsEntities/notifViewEntity";
import { useNavigate } from "react-router";
import DI from "../../../di/ioc";
import { LoadMoreButton } from "./LoadMoreBtn";
import { useEffect, useRef, useState } from "react";
import { useNotificationStore } from "../../../application/stores/notification.store";
import Chip from "./adaptatersComps/Chip";

export function NotifBadge({ onBoard }: { onBoard?: boolean }) {
    const notifViewModelFactory = DI.resolve('notifViewModel');
    const readNotif = async (id: number) => await DI.resolve('readNotifUseCase').execute(id);
    const { isLoading, refetch, fetchNextPage, hasNextPage, count, countMsg, countOther, notifsMsg, notifsOther } = notifViewModelFactory()
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
        { count: countMsg, notifs: notifsMsg, color: 'cyan', icon: 'chat', link: '/chat' },
        { count: countOther, notifs: notifsOther, color: 'orange', icon: 'notifications', link: '/notification' }
    ];
    const [badgeMap, setBadgeMap] = useState<NotifBadgeProps[]>(badgeMapGenerator());

    useEffect(() => {
        setBadgeMap(badgeMapGenerator());
    }, [count])


    return (
        <div className={` gap-3 md:gap-4 flex h-full  `}>
            {!isLoading && badgeMap.map((list: NotifBadgeProps, index: number) =>
                <div key={index}
                    className={`relative w-max flex items-center justify-center ${onBoard ? 'lg:hidden' : ''}`}>
                    <div id='notifList'
                        key={index + '1'}
                        ref={divRef}>
                        <Menu placement="bottom-end" >
                            <MenuTrigger title="Notifications">
                                <span className={`${!list.count || list.count === 0 ? 'hidden' : `text-white absolute flex font-medium items-center justify-center w-[1.4rem] h-[1.4rem] text-[0.75rem] !min-w-max pt-[0.3rem] pb-1 bg-${list.color}-500 rounded-full bottom-0 -left-2.5 shadow z-50`}`}>
                                    {list.count >= 99 ? '⁺99 ' :
                                        (list.count ? list.count.toString() : '0')}
                                </span>
                            </MenuTrigger>
                            <MenuContent className="flex flex-col max-h-[calc(100vh-9rem)] !w-[450px] !max-w-[calc(100vw-2rem)] ml-1 rounded-2xl backdropBlur !border border-slate-100">
                                <div onScroll={handleScroll}
                                    className="relative overflow-auto !border-none hover:!border-none flex flex-col gap-1">
                                    {list.count === 0 ? (
                                        <div className="flex items-center justify-center p-4">
                                            <Typography
                                                variant="small"
                                                className="font-normal">
                                                Aucun nouveau message
                                            </Typography>
                                        </div>)
                                        : (list.notifs.map((notif: NotifView, index2: number) => notif?.read === false &&
                                            <MenuItem className="flex flex-col w-full max-w-[calc(100vw-2rem)] "
                                                key={index2 + list.color}>
                                                <div className="flex items-center w-full justify-between">
                                                    <Chip
                                                        value={notif.typeS}
                                                        className="rounded-full scale-90 !opacity-80 w-max h-max text-ellipsis pt-1 "
                                                        size='sm'
                                                        color={list.color as any}>
                                                    </Chip>
                                                    <Typography
                                                        className="flex items-center gap-1 px-4 text-xs font-normal text-gray-500">
                                                        {notif.update}
                                                    </Typography></div>
                                                <div className="flex items-center justify-between gap-1">
                                                    <Typography
                                                        variant="small"
                                                        className="max-w-[calc(100%-2rem)] truncate">
                                                        {notif.description}
                                                    </Typography>
                                                    {notif.link &&
                                                        <Icon
                                                            icon="chevron_right"
                                                            fill
                                                            onClick={
                                                                async () => {
                                                                    await readNotif(notif.id);
                                                                    await refetch();
                                                                    setUnReadNotif(list.notifs.length - 1);
                                                                    notif.link && navigate(notif.link)
                                                                }}
                                                            size="xl"
                                                            style="bg-white"
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
                            </MenuContent>
                        </Menu>
                    </div>
                    <Icon
                        link={list.link}
                        icon={list.icon}
                        color={list.color}
                        fill bg
                        size="xl"
                        title={'ouvrir la page'}
                        style={` z-40 relative 
                            ${list.count > 0 ? 'opacity-100' : 'opacity-90'}`
                        } />
                </div>)

            }
        </div>
    )
}