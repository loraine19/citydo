import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EventCategory, EventFilter, EventFindParams, EventSort } from "../../../../domain/entities/Event";
import { Label, SortLabel, TabLabel } from "../../../../domain/entities/frontEntities";
import { getValue } from "../../../views/viewsEntities/utilsService";
import { eventCategories, eventCategoriesS } from "../../../constants";
import { EventView } from "../../../views/viewsEntities/eventViewEntities";
import { SkeletonGrid } from "../../common/Skeleton";
import DI from "../../../../di/ioc";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { useUxStore } from "../../../../application/stores/ux.store";
import { HandleHideParams, HandleScrollParams } from "../../../../application/useCases/utils.useCase";
import { useNavStore } from "../../../../application/stores/nav.store";
import DetailsHeadSection from "../base/baseComps/DetailsHeadSection";
import SelectSearch from "../../common/appComps/SelectSearch";
import TabsMenu from "../../common/appComps/TabsMenu";
import { EventCard } from "./eventComps/EventCard";
import CalendarComp from "../../common/CalendarComp";
import { CardMD } from "../base/baseComps/Cards";
import { SortButtonProps } from "../../common/appComps/SortBtn";
import { ViewButtonProps } from "../../common/appComps/ViewBtn";

export default function EventListPage() {
    const [notif, setNotif] = useState<string>("");
    const [tabSelected] = useState<string>('');
    const [searchCat, setSearchCat] = useState<Label>({ label: 'Chercher dans Événement', value: '' });
    const [mines, setMines] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [sort, setSort] = useState<EventSort>(EventSort.CREATED_AT);
    const [reverse, setReverse] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>('');
    const [view, setView] = useState("view_agenda");
    const [groupId, setGroupId] = useState<string>('');


    //// PARAMS
    const [Params, setParams] = useSearchParams();
    const params = {
        filter: Params.get("filter"),
        category: Params.get("category"),
        eventView: Params.get("eventView")
    };

    //// VIEW MODEL
    const eventViewModelFactory = (params: EventFindParams) => DI.resolve('eventViewModel')(params);
    const { events, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = eventViewModelFactory({
        filter: filter as EventFilter,
        category: category as EventCategory,
        sort: sort as EventSort,
        reverse,
        groupId,
        search: searchString
    });

    useEffect(() => {
        setCategory(params.category || '');
        setFilter(params.filter || '');
        setView(params.eventView || 'view_agenda');
        setParams({ filter: params.filter || '', category: params.category || '', eventView: params.eventView || 'view_agenda' });
        // eslint-disable-next-line
    }, []);

    //// NAMING
    const filterName = (): string => {
        switch (filter) {
            case EventFilter.MINE: return 'que j\'organise';
            case EventFilter.IGO: return 'où je vais';
            case EventFilter.VALIDATED: return 'validé';
            default: return '';
        }
    }
    const categoryName = (): string => EventCategory[category as keyof typeof EventCategory] ?? '';

    //// FILTER TAB
    const filterTab = async (value?: EventFilter) => {
        setParams({ filter: value as string || '', category: category, eventView: view });
        value !== filter && setCategory('');
        setFilter(value || '');
        setMines(value === EventFilter.MINE);
        setParams({ filter: value as string || '', category: category, eventView: view });
        await refetch();
    }

    const eventTabs: TabLabel[] = [
        { label: "tous", value: "", result: () => filterTab(), icon: { icon: "list" } },
        { label: "validé", value: EventFilter.VALIDATED, result: () => filterTab(EventFilter.VALIDATED), icon: { icon: "event_available" } },
        { label: "j'y vais", value: EventFilter.IGO, result: () => filterTab(EventFilter.IGO), icon: { icon: "event" } },
        { label: "j'organise", value: EventFilter.MINE, result: () => filterTab(EventFilter.MINE), icon: { icon: "person" } },
    ];

    //// SEARCH
    const search = (searchLabel: Label) => {
        const value = searchLabel.value;
        const label = searchLabel.label;
        if (value) {
            setCategory(value);
            setParams({ search: tabSelected, category: value, eventView: view });
        }
        else if (label !== 'tous') setSearchString(label)
    };

    //// HANDLE CATEGORY CHANGE
    const change = async (e: string | React.ChangeEvent<HTMLSelectElement> | any) => {
        const selectedCategory = typeof e !== "object"
            ? e.toUpperCase()
            : getValue(e.target.innerText.toLowerCase(), eventCategories).toLowerCase();
        setCategory(selectedCategory);
        setParams({ filter: filter as string || '', category: selectedCategory, eventView: view });
        await refetch();
    }

    //// NOTIFICATION
    useEffect(() => {
        if (error) setNotif('Erreur de chargement');
        else if ((count === 0 || events?.length === 0) && !isLoading && !error && view !== "event")
            setNotif(`Aucun événement ${filterName()} trouvé`);
        else setNotif('');
    }, [isLoading, error, filter, category, count, events?.length]);

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
            setIsBottom
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

    //// SORT LIST
    const sortList: SortLabel[] = [
        { label: 'créé le', key: EventSort.CREATED_AT, icon: "event" },
        { label: 'titre', key: EventSort.AZ, icon: 'sort_by_alpha' },
        { label: 'participants', key: EventSort.PARTICIPANTS, icon: 'person' },
        { label: 'jours', key: EventSort.INDAYS, icon: 'calendar_month' }
    ];

    //// HANDLE COMPACT VIEW
    const [compact, setCompact] = useState<boolean>(true);

    //// APPBAR SECTIONS
    const { setSearchSection, setTabSection } = useNavStore((state) => state);

    const SearchSection = useMemo(() => (

        <SelectSearch
            searchCat={searchCat}
            setSearchCat={setSearchCat}
            category={eventCategoriesS}
            search={search}
        />

    ), [searchCat, view, compact]);

    const TabSection = useMemo(() => (
        <TabsMenu
            labels={eventTabs}
            defaultTab={params.filter || ''}
            action={refetch}
        />
    ), [sort, reverse, params.filter]);

    useEffect(() => {
        setSearchSection(SearchSection);
        setTabSection(TabSection);
        return () => {
            setSearchSection(null);
            setTabSection(null);
        };
    }, [SearchSection, TabSection, setSearchSection, setTabSection]);

    const sortBtnProps: SortButtonProps = {
        sortList: sortList,
        setSelectedSort: setSort,
        selectedSort: sort,
        reverse: reverse,
        setReverse: setReverse,
        action: () => refetch()
    }

    const viewBtnProps: ViewButtonProps = {
        viewList: [
            { key: 'compact', label: 'Compact', icon: "grid_view", action: () => { setCompact(true); setView('view_agenda') } },
            {
                key: 'large', label: 'Large', icon: "view_agenda", action: () => { setCompact(false); setView('view_agenda') }
            },
            { key: 'calendar', label: 'Calendrier', icon: "calendar_month", action: () => { setView('event'); setParams({ eventView: 'event', filter: filter as string || '', category: category || '' }); } },

        ],
        view: view === "event" ? "calendar" : view === "view_agenda" ? (compact ? "compact" : "large") : view
    }

    const groupBtnProps: any = {
        selectedGroup: groupId,
        setSelectedGroup: setGroupId,
    }



    //// RENDER
    return (
        <main>
            <DetailsHeadSection
                hidden={hideNavBottom && !isLoading && !error && !notif}
                infosChipValue={`${count ?? 0} événements${filterName() ? ' / ' + filterName() : ''}${categoryName() ? ' / ' + categoryName() : ''}`}
                sortBtnProps={sortBtnProps}
                viewBtnProps={viewBtnProps}
                groupBtnProps={groupBtnProps}
                notif={notif}
                error={error}
                isLoading={isLoading}
                refetch={refetch}
            />
            {view === "view_agenda" && (
                isLoading ? (
                    <SkeletonGrid compact={compact} />
                ) : (
                    <section
                        id='refDiv'
                        ref={divRef}
                        onScroll={() => {
                            onScroll();
                            handleHideCallback();
                        }}
                        className={"Grid anim " + (compact ? ' GridCompact' : '')}
                    >
                        {events.map((event: EventView, index: number) => (
                            <div className="SubGrid" key={index + 'div'}>
                                <EventCard
                                    autoFit={!compact}
                                    key={index}
                                    event={event}
                                    change={change}
                                    mines={mines}
                                    refetch={refetch}
                                />
                            </div>
                        ))}
                        <LoadMoreButton
                            isBottom={isBottom}
                            hasNextPage={hasNextPage}
                            handleScroll={onScroll}
                        />
                    </section>
                )
            )}
            {view === "event" && !isLoading && (
                <section id='refDiv' className="!p-3 flex max-h-[calc(100dvh_-_16rem)] sm:max-h-[calc(100dvh_-_17rem)] ">
                    <CardMD className="min-h-full grid pb-2">
                        <CalendarComp />
                    </CardMD>
                </section>
            )}

        </main>
    );
}
