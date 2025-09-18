import { useCallback, useEffect, useRef, useState } from "react";
import { EventCategory, EventFilter, EventFindParams, EventSort } from "../../../../domain/entities/Event";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import CalendarComp from "../../common/CalendarComp";
import { EventCard } from "./eventComps/EventCard";
import DI from "../../../../di/ioc";
import { Icon } from "../../common/IconComp";
import { SkeletonGrid } from "../../common/Skeleton";
import { useSearchParams } from "react-router-dom";
import { Label, SortLabel, TabLabel } from "../../../../domain/entities/frontEntities";
import { getValue } from "../../../views/viewsEntities/utilsService";
import { eventCategories, eventCategoriesS } from "../../../constants";
import { EventView } from "../../../views/viewsEntities/eventViewEntities";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import NotifDiv from "../../common/NotifDiv";
import { useUxStore } from "../../../../application/stores/ux.store";
import { HandleHideParams, HandleScrollParams } from "../../../../application/useCases/utils.useCase";
import SelectSearch from "../../common/SelectSearch";

export default function EventListPage() {
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [sort, setSort] = useState<EventSort>(EventSort.CREATED_AT);
    const [reverse, setReverse] = useState<boolean>(false);
    const [view, setView] = useState("view_agenda");
    const [notif, setNotif] = useState<string>("");
    const [mines, setMines] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>('');

    //// PARAMS
    const [Params, setParams] = useSearchParams();
    const params = {
        filter: Params.get("filter"),
        category: Params.get("category"),
        eventView: Params.get("eventView")
    };
    useEffect(() => {
        setCategory(params.category || '');
        setFilter(params.filter || '');
        setView(params.eventView || 'view_agenda')
        setParams({ filter: params.filter || '', category: params.category || '', eventView: params.eventView || 'view_agenda' })
    }, []);

    //// VIEW MODEL
    const eventViewModelFactory = (params: EventFindParams) => DI.resolve('eventViewModel')(params);
    const { events, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = eventViewModelFactory(
        {
            filter: filter as EventFilter,
            category: category as EventCategory,
            sort: sort as EventSort,
            reverse,
            search: searchString
        });

    //// FILTER TAB 
    const filterTab = async (value?: EventFilter) => {
        setParams({ filter: value as string || '', category: category });
        value !== filter && setCategory('')
        setFilter(value || '');
        value === EventFilter.MINE ? setMines(true) : setMines(false);
        setParams({ filter: value as string || '', category: category, eventView: view });
        await refetch();
    }

    const eventTabs: TabLabel[] = [
        { label: "tous", value: "", result: () => filterTab(), icon: { icon: "list" } },
        { label: "validé", value: EventFilter.VALIDATED, result: () => filterTab(EventFilter.VALIDATED), icon: { icon: "event_available" } },
        { label: "j'y vais", value: EventFilter.IGO, result: () => filterTab(EventFilter.IGO), icon: { icon: "event" } },
        { label: "j'organise", value: EventFilter.MINE, result: () => filterTab(EventFilter.MINE), icon: { icon: "person" } },
    ]

    //// SEARCH
    const [searchCat, setSearchCat] = useState<Label>({ label: 'tous', value: '' });
    const [tabSelected] = useState<string>('');
    const search = (searchLabel: Label) => {
        const value = searchLabel.value;
        const label = searchLabel.label;
        if (value) {
            setCategory(value);
            setParams({ search: tabSelected, category: value, eventView: view });
        }
        else if (label !== 'tous') setSearchString(label)
    };

    //// NAMING
    const filterName = (): string => {
        switch (filter) {
            case EventFilter.MINE: return 'que j\'organise';
            case EventFilter.IGO: return 'où je vais';
            case EventFilter.VALIDATED: return 'validé';
            default: return '';
        }
    }

    //// HANDLE CATEGORY CHANGE
    const change = async (e: string | React.ChangeEvent<HTMLSelectElement> | any) => {
        const selectedCategory = typeof e !== "object" ?
            e.toUpperCase() : getValue(e.target.innerText.toLowerCase(), eventCategories).toLowerCase();
        setCategory(selectedCategory);
        setParams({ filter: filter as string || '', category: selectedCategory, eventView: view });
        await refetch();
    }

    //// NOTIFICATION
    useEffect(() => {
        switch (true) {
            case error: setNotif('Erreur de chargement'); break;
            case (count === 0 && !isLoading): setNotif(`Aucun événement ${filterName()} trouvé`); break;
            default: setNotif('');
        }
    }, [isLoading, error, filter, category, count]);

    //// HANDLE VIEW CHANGE
    const switchClick = () => {
        const nextView = view === "view_agenda" ? "event" : "view_agenda";
        setView(nextView);
        setParams({
            eventView: nextView,
            filter: filter as string || '',
            category: category || ''
        });
        setCategory('');
        filterTab("" as EventFilter)
        setHideNavBottom(false)
    }

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
    ]


    //// HANDLE COMPACT VIEW
    const [compact, setCompact] = useState<boolean>(false);

    //// RENDER
    return (
        <main>
            <div className="sectionHeader">
                <div className={`flex items-center justify-center gap-2 `}>
                    <SelectSearch
                        searchCat={searchCat}
                        setSearchCat={setSearchCat}
                        category={eventCategoriesS}
                        search={search} />
                    <Icon
                        onClick={switchClick}
                        icon={view === "view_agenda" ? "calendar_month" : "view_agenda"}
                        size="lg"
                        color="cyan"
                        fill
                        title={view === "view_agenda" ? "voir en mode calendrier" : "voir en mode liste"} />
                    <Icon
                        onClick={() => setCompact(!compact)}
                        icon={compact ? "grid_view" : "view_column"}
                        size="lg"
                        color="cyan"
                        fill
                        style={(view !== "view_agenda" ? "hidden" : "flex sm:hidden lg:flex")}
                        title={compact ? "voir en mode liste" : "voir en mode grille"} />
                </div>
                {view === "view_agenda" &&
                    <TabsMenu
                        labels={eventTabs}
                        defaultTab={params.filter || ''}
                        sortList={sortList}
                        selectedSort={sort}
                        setSelectedSort={setSort}
                        reverse={reverse}
                        setReverse={setReverse}
                        action={refetch}
                    />}
                <SubHeader
                    qty={count > 0 ? count : 'pas d\''}
                    type={` évènements ${filterName()} ${EventCategory[category as keyof typeof EventCategory] ?? ''}`} />
                {(view === "view_agenda" && notif) &&
                    <NotifDiv
                        error={error}
                        notif={notif}
                        isLoading={isLoading}
                        refetch={refetch} />
                }
            </div>
            {view === "view_agenda" &&
                <>
                    {isLoading ?
                        <SkeletonGrid compact={compact} /> :
                        <section
                            id='refDiv'
                            ref={divRef}
                            onScroll={() => {
                                onScroll()
                                handleHideCallback()
                            }}
                            className={"Grid " + (!compact ? ' GridCompact' : '')}>
                            {events.map((event: EventView, index: number) => (
                                <div className="SubGrid "
                                    key={index + 'div'}>
                                    <EventCard
                                        autoFit={!compact}
                                        key={index}
                                        event={event}
                                        change={change}
                                        mines={mines}
                                        refetch={refetch} /></div>
                            ))}
                            <LoadMoreButton
                                isBottom={isBottom}
                                hasNextPage={hasNextPage}
                                handleScroll={onScroll} />
                        </section>}
                </>
            }
            {view === "event" && !isLoading &&
                <section id='refDiv' className="!pt-14 pb-4  max-h-[calc(100dvh_-_11rem)]">
                    <CalendarComp />
                </section>}

        </main>
    );
}
