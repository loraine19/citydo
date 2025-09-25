import { Icon, IconName } from "../IconComp"
import { NotifView } from "../../../views/viewsEntities/notifViewEntity";
import { useNavigate } from "react-router-dom";
import DI from "../../../../di/ioc";
import { useEffect, useState } from "react";
import { useNotificationStore } from "../../../../application/stores/notification.store";
import Chip from "../adaptatersComps/Chip";
import NotifDiv from "../NotifDiv";
import { useUxStore } from "../../../../application/stores/ux.store";
import { Md3Colors } from "../../shared/base/baseComps/Buttons";
import { Menu, MenuItem } from "../../shared/base/baseComps/Menu";

export function NotifBadge({ onBoard }: { onBoard?: boolean }) {
    const readNotif = async (id: number) => await DI.resolve('readNotifUseCase').execute(id);
    const notifViewModelFactory = DI.resolve('notifViewModel');
    const { notifsMsg, notifsOther, refetch, countMsg, countOther, isLoading, error } = notifViewModelFactory();
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate()

    const { navBottom } = useUxStore()

    //// TODO SET UNREAD NOTIF BY TYPE ( UPDATE COUNT FROM VIEW )
    const { setUnReadNotif } = useNotificationStore();


    //// HANDLE SCROLL
    // const divRef = useRef<HTMLDivElement>(null);
    // const [isBottom, setIsBottom] = useState(false);
    // const handleScroll = () => {
    //     setIsMenuOpen(true);
    //     if (isMenuOpen && divRef.current) {
    //         const { scrollTop, scrollHeight, clientHeight } = divRef.current;
    //         if (scrollTop + clientHeight + 2 >= scrollHeight) {
    //             setIsBottom(true);
    //             if (hasNextPage) fetchNextPage()
    //         } else setIsBottom(false)
    //     }
    // };
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
        <div className={` pb-0.5 pl-1.5 gap-4  flex  items-center `}>
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

                    <Menu
                        title="Notifications"
                        MenuKey='notif-menu'
                        className={` min-h-[12rem] max-h-[80vh] overflow-y-auto  w-respLarge max-w-[80vw] `}
                        trigger={<Icon
                            title={'ouvrir le popup'}
                            fill
                            style='absolute -top-2 -right-2 !bg-[var(--md3-primary-container)] rounded-full !p-[0.5px]'
                            reverse
                            icon='fiber_manual_record'
                            color={list.color}
                            size={'md'} />}>

                        {/* <div className="flex flex-1 py-4 w-full h-full"
                            id='notifList'
                            key={index + '1'}
                            ref={divRef}>
                            <div onScroll={handleScroll}
                                className="relative overflow-auto !border-none hover:!border-none flex flex-1 divide-y !divide-slate-300 p-4 w-full h-full flex-col">*/}
                        {(error || list.notifs.length === 0) &&


                            <NotifDiv
                                className="!relative"
                                isLoading={isLoading}
                                refetch={refetch}
                                notif={error ?? "Aucune notification"} />
                        }
                        {list.notifs.map((notif: NotifView, index2: number) => notif?.read === false &&
                            <MenuItem
                                className="flex -ml-4 !pl-0 overflow-hidden"
                                key={index2 + list.color}
                                leadingIcon={
                                    <></>}
                                trailingIcon={notif.link &&
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
                            >

                                <div className=" flex flex-col gap-1 line-clamp-3 ">
                                    <div className="flex max-w-max gap-2 ">

                                        <Chip
                                            value={notif.typeS}
                                            color={`${list.color}` as Md3Colors}>
                                        </Chip>
                                        <Chip
                                            value={notif.update}>
                                        </Chip>

                                    </div>
                                    <span className="md3-card-subhead">{notif.title}</span>
                                    <span className="md3-card-supporting-text line-clamp-1">{notif.description}</span>

                                </div>

                            </MenuItem>)}
                        {/* </div>
                            <LoadMoreButton
                                color={list.color}
                                style="-mb-3"
                                size="2xl"
                                isBottom={isBottom}
                                hasNextPage={hasNextPage}
                                handleScroll={() => handleScroll()} />
                        </div> */}
                    </Menu>
                </div>
            )}
        </div >
    )
}