import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Label, SortLabel, TabLabel } from "../../../../domain/entities/frontEntities";
import CheckCard from "../../common/CheckCard";
import SelectSearch from "../../common/appComps/SelectSearch";
import TabsMenu from "../../common/appComps/TabsMenu";
import { PoolCard } from "./voteCards/PoolCard";
import { SurveyCard } from "./voteCards/SurveyCard";
import { SkeletonGrid } from "../../common/Skeleton";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import DI from "../../../../di/ioc";
import { PoolSurveyFilter, PoolSurveysFindParams, PoolSurveySort, PoolSurveyStep, SurveyCategory } from "../../../../domain/entities/PoolSurvey";
import { PoolSurveyView } from "../../../views/viewsEntities/poolSurveyViewEntity";
import { VoteTarget } from "../../../../domain/entities/Vote";
import { surveyCategoriesS } from "../../../constants";
import { useUxStore } from "../../../../application/stores/ux.store";
import { HandleHideParams, HandleScrollParams } from "../../../../application/useCases/utils.useCase";
import { useAlertStore } from "../../../../application/stores/alert.store";
import { AlertValues } from "../../../../domain/entities/Error";
import { Icon } from "../../common/IconComp";
import { useNavStore } from "../../../../application/stores/nav.store";
import DetailsHeadSection from "../base/baseComps/DetailsHeadSection";
import { SortButtonProps } from "../../common/appComps/SortBtn";
import { ViewButtonProps } from "../../common/appComps/ViewBtn";

export default function VoteListPage() {
    const [notif, setNotif] = useState<string>('');
    const [tabSelected] = useState<string>('');
    const [searchCat, setSearchCat] = useState<Label>({ label: 'tous', value: '' });
    const [mine, setMine] = useState<boolean>(false);
    const [step, setStep] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [sort, setSort] = useState<PoolSurveySort>(PoolSurveySort.CREATED_AT);
    const [reverse, setReverse] = useState<boolean>(true);
    const [searchString, setSearchString] = useState<string>('');

    //// PARAMS
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), step: Params.get("step"), category: Params.get("category") };

    //// VIEW MODEL
    const voteViewModelFactory = (params: PoolSurveysFindParams) => DI.resolve('voteViewModel')(params);
    const { poolsSurveys, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = voteViewModelFactory({
        filter: filter as PoolSurveyFilter,
        step: step as PoolSurveyStep,
        sort,
        reverse,
        search: searchString,
        category: category as SurveyCategory,
    });
    useEffect(() => {
        setStep(params.step || '');
        setFilter(params.filter || '');
        setCategory(params.category || '');
    }, []);

    //// NAMING
    const filterName = (): string => {
        switch (filter) {
            case PoolSurveyFilter.MINE: return 'que j\'ai posté';
            case PoolSurveyFilter.POOL: return 'cagnottes';
            case PoolSurveyFilter.SURVEY: return 'sondages';
            default: return '';
        }
    }
    const stepName = (): string => {
        switch (step) {
            case PoolSurveyStep.NEW: return 'nouveau';
            case PoolSurveyStep.PENDING: return 'en attente';
            case PoolSurveyStep.VALIDATED: return 'validé';
            case PoolSurveyStep.REJECTED: return 'rejeté';
            default: return '';
        }
    }
    const categoryName = (): string => {
        if (!category) return '';
        const found = surveyCategoriesS.find(c => c.value === category);
        return found ? found.label : '';
    }

    //// BOXES FILTER
    const boxArray = ["nouveau", "en attente", "validé", "rejeté"];
    const [boxSelected, setBoxSelected] = useState<string[]>(boxArray);
    const CheckboxesFilter = () => {
        let steps = [];
        boxSelected.includes(boxArray[0]) && steps.push(PoolSurveyStep.NEW);
        boxSelected.includes(boxArray[1]) && steps.push(PoolSurveyStep.PENDING);
        boxSelected.includes(boxArray[2]) && steps.push(PoolSurveyStep.VALIDATED);
        boxSelected.includes(boxArray[3]) && steps.push(PoolSurveyStep.REJECTED);
        boxSelected.length === 0 ? setStep('') : setStep(steps.join(','));
        refetch();
    }
    useEffect(() => { CheckboxesFilter() }, [boxSelected]);
    //// ACTIVE FILTER
    const [filterBox, setFilterBox] = useState<boolean>(false);

    //// FILTER TAB
    const filterTab = async (value?: PoolSurveyFilter) => {
        setParams({ filter: value as string || '', step, category });
        value !== filter && setStep('');
        setFilter(value || '');
        setBoxSelected(boxArray);
        setMine(value === PoolSurveyFilter.MINE);
        setParams({ filter: value as string || '', step, category });
        await refetch();
    };

    const tabs: TabLabel[] = [
        { label: "tous", value: '', result: () => filterTab(), icon: { icon: 'list' } },
        { label: "cagnotte", value: PoolSurveyFilter.POOL, result: () => filterTab(PoolSurveyFilter.POOL), icon: { icon: "person_heart" } },
        { label: "sondage", value: PoolSurveyFilter.SURVEY, result: () => filterTab(PoolSurveyFilter.SURVEY), icon: { icon: 'ballot' } },
        { label: "les miens", value: PoolSurveyFilter.MINE, result: () => filterTab(PoolSurveyFilter.MINE), icon: { icon: 'person' } },
    ];

    //// SEARCH
    const search = (searchLabel: Label) => {
        const value = searchLabel.value;
        const label = searchLabel.label;
        if (value) {
            setCategory(value);
            setParams({ search: tabSelected, category: value });
        }
        else if (label !== 'tous') setSearchString(label);
    };

    //// SORT LIST
    const sortList: SortLabel[] = [
        { label: "Créé le", icon: "event", key: PoolSurveySort.CREATED_AT },
        { label: "Titre", icon: "sort_by_alpha", key: PoolSurveySort.TITLE },
        { label: "Nombre de votes", icon: "smart_card_reader", key: PoolSurveySort.VOTES },
        { label: "Utilisateur", icon: "person", key: PoolSurveySort.USER }
    ];

    //// NOTIFICATION & ERROR
    useEffect(() => {
        if (error) setNotif(error.message || "Erreur inconnue");
        else if ((count === 0 || poolsSurveys.length === 0) && !isLoading && !error)
            setNotif(`Aucun vote ${filterName()} ${stepName()} n'a été trouvé`);
        else setNotif('');
    }, [isLoading, error, filter, step, category, count, poolsSurveys.length]);

    //// HANDLE SCROLL
    const utils = DI.resolve('utils');
    const handleScroll = (params: HandleScrollParams) => utils.handleScroll(params);
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
    const handleHide = (params: HandleHideParams) => utils.handleHide(params);
    const { setHideNavBottom, hideNavBottom } = useUxStore((state) => state);
    const handleHideCallback = useCallback(() => {
        const params: HandleHideParams = { divRef, setHide }
        handleHide(params)
    }, [divRef]);
    const [hide, setHide] = useState<boolean>(false);
    useEffect(() => {
        (hide !== hideNavBottom) && setHideNavBottom(hide)
    }, [hide]);

    //// HANDLE VOTE
    const { setAlertValues, setOpen } = useAlertStore(state => state);
    const handleVote = (values: AlertValues) => {
        setAlertValues(values);
        setOpen(true);
    }

    //// HANDLE VIEW CHANGE
    const [compact, setCompact] = useState<boolean>(true);

    ////FOR APPBAR
    const { setSearchSection, setTabSection } = useNavStore((state) => state);

    const SearchSection = useMemo(() => (
        <div className="flex items-center md:justify-end justify-between w-full gap-2">
            <SelectSearch
                searchCat={searchCat}
                setSearchCat={setSearchCat}
                category={filter === PoolSurveyFilter.SURVEY ? surveyCategoriesS : []}
                search={search}
            />
        </div>
    ), [searchCat, filter]);

    const TabSection = useMemo(() => (
        <TabsMenu
            labels={tabs}
            selectedSort={sort}
            setSelectedSort={setSort}
            reverse={reverse}
            setReverse={setReverse}
        />
    ), [sort, reverse, filter]);

    useEffect(() => {
        setSearchSection(SearchSection);
        setTabSection(TabSection);
        return () => {
            setSearchSection(null);
            setTabSection(null);
        };
    }, [SearchSection, TabSection]);

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
            { key: 'compact', label: 'Compact', icon: "grid_view", action: () => setCompact(true) },
            { key: 'large', label: 'Large', icon: "view_agenda", action: () => setCompact(false) }
        ],
        view: compact ? 'compact' : 'large'
    }

    //// RENDER
    return (
        <main>
            <DetailsHeadSection
                hidden={hideNavBottom && !isLoading && !error && !notif}
                infosChipValue={`${count ?? 0} ${filterName() ? filterName() : 'cagnottes et sondages'}${categoryName() ? ' / ' + categoryName() : ''}`}
                sortBtnProps={sortBtnProps}
                viewBtnProps={viewBtnProps}
                notif={notif}
                error={error}
                isLoading={isLoading}
                refetch={refetch}

            >   <Icon
                    onClick={() => setFilterBox(!filterBox)}
                    icon={!filterBox ? "filter_alt" : "filter_alt_off"}
                    size="lg"
                    color="orange"
                    fill
                    title={filterBox ? "reduire" : "voir les filtres"} />
            </DetailsHeadSection>

            {filterBox &&
                <CheckCard
                    categoriesArray={boxArray}
                    boxSelected={boxSelected}
                    setBoxSelected={setBoxSelected}
                    style={filterBox ? 'animRev' : 'anim '} />}
            {isLoading ?
                <SkeletonGrid />
                : <section
                    ref={divRef}
                    onScroll={() => {
                        onScroll();
                        handleHideCallback()
                    }}
                    className={"Grid anim " + (compact ? ' GridCompact' : '')}>
                    {poolsSurveys.map((element: PoolSurveyView, index: number) =>
                        <div className="SubGrid" key={element.id || index}>
                            {element.type === VoteTarget.SURVEY ?
                                <SurveyCard
                                    autoFit={compact}
                                    survey={element}
                                    key={element.id}
                                    change={search as any}
                                    mines={mine}
                                    vote={handleVote}
                                    update={refetch}
                                />
                                :
                                <PoolCard
                                    divRef={divRef}
                                    pool={element}
                                    key={element.id}
                                    change={search as any}
                                    vote={handleVote}
                                    mines={mine}
                                    update={refetch}
                                />
                            }
                        </div>
                    )}
                    <LoadMoreButton
                        isBottom={isBottom}
                        hasNextPage={hasNextPage}
                        handleScroll={onScroll}
                    />
                </section>
            }
        </main>
    );
}
