import { useCallback, useEffect, useRef, useState } from "react";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import { NotifCard } from "./NotifCard";
import { TabLabel } from "../../../../domain/entities/frontEntities";
import { SkeletonGrid } from "../../common/Skeleton";
import { NotifView } from "../../../views/viewsEntities/notifViewEntity";
import DI from "../../../../di/ioc";
import { useSearchParams } from "react-router-dom";
import { ElementNotif } from "../../../../domain/entities/Notif";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { PathElement } from "../../../constants";
import { ReadAllButton } from "../../common/ReadAllBtn";
import { useNotificationStore } from "../../../../application/stores/notification.store";
import NotifDiv from "../../common/NotifDiv";
import { useUxStore } from "../../../../application/stores/ux.store";
import { HandleHideParams, HandleScrollParams } from "../../../../application/useCases/utils.useCase";

export default function NotificationPage() {
    const [notifFind, setNotifFind] = useState<string>('');
    const [filter, setFilter] = useState<string>('');

    const readNotif = async (id: number) => await DI.resolve('readNotifUseCase').execute(id);
    const notifViewModelFactory = DI.resolve('notifViewModel');
    const { notifs, isLoading, refetch, count, fetchNextPage, hasNextPage, error } = notifViewModelFactory(filter)

    const { setUnReadNotif } = useNotificationStore()

    //// PARAMS
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter") }
    useEffect(() => { setFilter(params.filter || '') }, [])


    //// FILTER TAB
    const notifTabs: TabLabel[] = [
        { label: "tous", value: "", result: () => filterTab() },
        { label: "message", value: ElementNotif.MESSAGE, result: () => filterTab(ElementNotif.MESSAGE) },
        { label: "service", value: ElementNotif.SERVICE, result: () => filterTab(ElementNotif.SERVICE) },
        { label: 'Conciliation', value: ElementNotif.ISSUE, result: () => filterTab(ElementNotif.ISSUE) },
        { label: "évenement", value: ElementNotif.EVENT, result: () => filterTab(ElementNotif.EVENT) },
        { label: 'Participation', value: ElementNotif.PARTICIPANT, result: () => filterTab(ElementNotif.PARTICIPANT) },
        { label: "annonce", value: ElementNotif.POST, result: () => filterTab(ElementNotif.POST) },
        { label: "like", value: ElementNotif.LIKE, result: () => filterTab(ElementNotif.LIKE) },
        { label: "sondage", value: ElementNotif.SURVEY, result: () => filterTab(ElementNotif.SURVEY) }, { label: "cagnotte", value: ElementNotif.POOL, result: () => filterTab(ElementNotif.POOL) },
        { label: "vote", value: ElementNotif.VOTE, result: () => filterTab(ElementNotif.VOTE) },
        { label: "signalement", value: ElementNotif.FLAG, result: () => filterTab(ElementNotif.FLAG) }
    ]

    const filterTab = async (value?: ElementNotif) => {
        setParams({ filter: String(value) || '' });
        setFilter(value ? String(value) : '');
        setParams({ filter: (value as unknown as string) || '' })
        await refetch();
    };


    //// NOTIFICATION
    useEffect(() => {
        if (error) {
            setNotifFind(error.message || "Erreur inconnue");
            return;
        }
        count > 0 ?
            setNotifFind('') :
            setNotifFind(`Aucun Notification ${PathElement[filter as keyof typeof PathElement] ?? ""} na été trouvé`);
    }, [notifs, count, isLoading, filter])

    //// HANDLE SCROLL
    const utils = DI.resolve('utils')
    const handleScroll = (params: HandleScrollParams) => utils.handleScroll(params)
    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const onScroll = useCallback(() => {
        const params: HandleScrollParams = {
            divRef,
            hasNextPage,
            fetchNextPage,
            setIsBottom,
        }
        handleScroll(params)
    }, [divRef]);


    //// HANDLE HIDE  
    const handleHide = (params: HandleHideParams) => utils.handleHide(params)
    const { setHideNavBottom, hideNavBottom } = useUxStore((state) => state);
    const handleHideCallback = useCallback(() => {
        const params: HandleHideParams = { divRef, setHide }
        handleHide(params)
    }, [divRef]);
    const [hide, setHide] = useState<boolean>(false);
    useEffect(() => { (hide !== hideNavBottom) && setHideNavBottom(hide) }, [hide]);

    return (

        <main>
            <div className="sectionHeader gap-1">
                <div className="relative justify-center flex pr-4 ">
                    <div className="justify-center overflow-auto py-1 flex pr-6 rounded-full">
                        <TabsMenu
                            labels={notifTabs} />
                    </div>
                    <ReadAllButton
                        update={refetch} />
                </div>
                <SubHeader
                    qty={count}
                    type={"Notifications" + ` ${PathElement[filter as keyof typeof PathElement] ?? ""}`}
                    closeBtn
                    link={'/'} />

                {notifFind &&
                    <NotifDiv
                        notif={notifFind}
                        isLoading={isLoading}
                        refetch={refetch} />}
            </div>
            {isLoading ?
                <SkeletonGrid small /> :
                <section
                    ref={divRef}
                    onScroll={() => { onScroll(); handleHideCallback() }}
                    className="GridSmall ">
                    {
                        notifs?.map((notif: NotifView, index: number) => notif.read === false &&
                            <div className="SubGrid" key={'div' + index}>
                                <NotifCard
                                    key={index}
                                    notif={notif}
                                    handleClick={async (notif: NotifView) => {
                                        readNotif(notif.id)
                                        setUnReadNotif(count - 1);
                                        await refetch();
                                    }} />
                            </div>)}
                    <LoadMoreButton
                        isBottom={isBottom}
                        hasNextPage={hasNextPage}
                        handleScroll={onScroll} />
                </section>}
        </main>
    )

}