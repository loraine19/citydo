import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { useUxStore } from "../../../../application/stores/ux.store";
import { HandleHideParams, HandleScrollParams } from "../../../../application/useCases/utils.useCase";
import TabsMenu from "../../common/appComps/TabsMenu";
import DetailsHeadSection from "../base/baseComps/DetailsHeadSection";
import { useNavStore } from "../../../../application/stores/nav.store";

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



    ////FOR APPBAR
    const { setTabSection } = useNavStore((state) => state);

    const TabSection = useMemo(() => (
        <div className="grid  overflow-y-hidden overflow-x-auto max-w-[190%]">
            <TabsMenu
                labels={notifTabs} />
        </div>
    ), [filter]);

    useEffect(() => {
        setTabSection(TabSection);
        return () => {
            setTabSection(null);
        };
    }, [TabSection]);





    return (

        <main>
            <DetailsHeadSection
                hidden={hideNavBottom && !isLoading && !error && !notifFind}
                infosChipValue={"Notifications " + `/ ${PathElement[filter as keyof typeof PathElement] ?? ""}`} notif={notifFind}
                error={error}
                isLoading={isLoading}
                refetch={refetch}
            >
                <ReadAllButton
                    update={refetch} />
            </DetailsHeadSection>
            {isLoading ?
                <SkeletonGrid small /> :
                <section
                    ref={divRef}
                    onScroll={() => { onScroll(); handleHideCallback() }}
                    className="GridSmall ">
                    {
                        notifs?.map((notif: NotifView, index: number) => notif.read === false &&

                            <NotifCard
                                key={index}
                                notif={notif}
                                handleClick={async (notif: NotifView) => {
                                    readNotif(notif.id)
                                    setUnReadNotif(count - 1);
                                    await refetch();
                                }} />
                        )}
                    <LoadMoreButton
                        isBottom={isBottom}
                        hasNextPage={hasNextPage}
                        handleScroll={onScroll} />
                </section>}
        </main>
    )

}