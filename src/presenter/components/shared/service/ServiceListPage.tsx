import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ServiceCategory, ServiceFilter, ServiceFindParams, ServiceSort, ServiceStep, ServiceStepFilter, ServiceType } from "../../../../domain/entities/Service";
import CheckCard from "../../common/CheckCard";
import SelectSearch from "../../common/appComps/SelectSearch";
import TabsMenu from "../../common/appComps/TabsMenu";
import ServiceComp from "./serviceCards/ServiceCard";
import { Label, SortLabel, TabLabel } from "../../../../domain/entities/frontEntities";
import { SkeletonGrid } from "../../common/Skeleton";
import DI from '../../../../di/ioc';
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { ServiceView } from "../../../views/viewsEntities/serviceViewEntity";
import { serviceCategoriesS } from "../../../constants";
import { useUxStore } from "../../../../application/stores/ux.store";
import { HandleHideParams, HandleScrollParams } from "../../../../application/useCases/utils.useCase";
import { useNavStore } from "../../../../application/stores/nav.store";
import DetailsHeadSection from "../base/baseComps/DetailsHeadSection";
import { SortButtonProps } from "../../common/appComps/SortBtn";
import { ViewButtonProps } from "../../common/appComps/ViewBtn";
import { Icon } from "../../common/IconComp";

export default function ServicesPage() {
    const [notif, setNotif] = useState<string>('');
    const [tabSelected] = useState<string>('');
    const [searchCat, setSearchCat] = useState<Label>({ label: 'Chercher dans Service', value: '' });
    const [mine, setMine] = useState<boolean>(false);
    const [type, setType] = useState<string>('');
    const [step, setStep] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [sort, setSort] = useState<ServiceSort>(ServiceSort.CREATED_AT);
    const [reverse, setReverse] = useState<boolean>(true);
    const [searchString, setSearchString] = useState<string>('');
    const [selectedGroup, setSelectedGroup] = useState<string>('');

    //// PARAMS
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), category: Params.get("category") }

    //// VIEW MODEL
    const serviceViewModelFactory = (params: ServiceFindParams) => DI.resolve('serviceViewModel')(params);
    const { services, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = serviceViewModelFactory({
        mine,
        type: type as ServiceType,
        step: step as ServiceStep,
        filter: filter as ServiceFilter,
        category: category as ServiceCategory,
        sort,
        reverse,
        search: searchString,
        groupId: selectedGroup
    });
    useEffect(() => { setCategory(params.category || ''); setFilter(params.filter || '') }, []);

    //// NAMING
    const filterName = (): string => {
        switch (filter) {
            case ServiceFilter.MINE: return 'que j\'ai publié';
            case ServiceFilter.DO: return 'offres';
            case ServiceFilter.GET: return 'demandes';
            default: return '';
        }
    }
    const stepName = (): string => ServiceStepFilter[step as keyof typeof ServiceStepFilter] ?? ''
    const categoryName = (): string => ServiceCategory[category as string as keyof typeof ServiceCategory] ?? ''

    //// BOXES FILTER
    const boxArray = ["offre", "demande", "nouveau", "en attente", "en cours", "terminé", "litige"];
    const [boxSelected, setBoxSelected] = useState<string[]>(boxArray)

    const CheckboxesFilter = () => {
        let steps = [];
        let types = [];
        boxSelected.includes(boxArray[0]) && types.push(ServiceFilter.DO);
        boxSelected.includes(boxArray[1]) && types.push(ServiceFilter.GET);
        boxSelected.includes(boxArray[2]) && steps.push(ServiceStepFilter.STEP_0);
        boxSelected.includes(boxArray[3]) && steps.push(ServiceStepFilter.STEP_1);
        boxSelected.includes(boxArray[4]) && steps.push(ServiceStepFilter.STEP_2);
        boxSelected.includes(boxArray[5]) && steps.push(ServiceStepFilter.STEP_3);
        boxSelected.includes(boxArray[6]) && steps.push(ServiceStepFilter.STEP_4);
        if (boxSelected.length === 0) {
            setType('');
            setStep('');
        }
        else {
            setStep(steps.join(','));
            setType(types.join(','));
        }
        refetch();
    }
    useEffect(() => { mine && CheckboxesFilter() }, [boxSelected]);

    //// FILTER TAB
    const filterTab = async (value?: ServiceFilter) => {
        setParams({ filter: value as string || '', category });
        value !== filter && setCategory('')
        setFilter(value || '');
        setMine(false)
        switch (value) {
            case ServiceFilter.MINE: { setMine(true), setType(''), setStep(''), setBoxSelected(boxArray) } break;
            case ServiceFilter.GET: { setType('GET'), setStep('') }; break;
            case ServiceFilter.DO: { setType('DO'), setStep('') }; break;
            default: { setType(''), setStep('') }; break;
        }
        setParams({ filter: value as string || '', category })
        await refetch();
    };

    const serviceTabs: TabLabel[] = [
        { label: "tous", value: '', result: () => filterTab(), icon: { icon: "list" } },
        { label: "demande", value: ServiceFilter.GET, result: () => filterTab(ServiceFilter.GET), icon: { icon: "input" } },
        { label: "offre", value: ServiceFilter.DO, result: () => filterTab(ServiceFilter.DO), icon: { icon: "output" } },
        { label: "les miens", value: ServiceFilter.MINE, result: () => filterTab(ServiceFilter.MINE), icon: { icon: "person" } },
    ]

    //// SEARCH
    const search = (searchLabel: Label) => {
        const value = searchLabel.value;
        const label = searchLabel.label;
        if (value) {
            setCategory(value);
            setParams({ search: tabSelected, category: value });
        }
        else if (label !== 'tous') {
            setSearchString(label)
        }
    };

    //// NOTIFICATION & ERROR
    useEffect(() => {
        if (error) setNotif(error ?? 'Une erreur est survenue');
        else if ((count === 0 || services.length === 0) && !isLoading && !error)
            setNotif(`Aucun service ${filterName()} ${stepName()} n'a été trouvé`);
        else setNotif('');

    }, [isLoading, error, filter, step, category, count, services?.length, type]);

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
    useEffect(() => {
        (hide !== hideNavBottom) && setHideNavBottom(hide)
    }, [hide]);

    //// SORT LIST
    const sortList: SortLabel[] = [
        { key: ServiceSort.CREATED_AT, label: "Publié le", icon: "event" },
        { key: ServiceSort.USER, label: "Utilisateur", icon: "person" },
        { key: ServiceSort.TITLE, label: "Titre", icon: "sort_by_alpha" },
        { key: ServiceSort.SKILL, label: "Compétence", icon: "design_services" },
        { key: ServiceSort.HARD, label: "Difficulté", icon: "signal_cellular_alt" }
    ]

    //// HANDLE VIEW CHANGE
    const [compact, setCompact] = useState<boolean>(false);

    ////FOR APPBAR
    const { setSearchSection, setTabSection } = useNavStore((state) => state);
    const SearchSection = useMemo(() => (
        <div className={`flex items-center md:justify-end justify-between w-full gap-2`}>
            {/* {mine ?
                <CheckCard
                    categoriesArray={boxArray}
                    boxSelected={boxSelected}
                    setBoxSelected={setBoxSelected} />
                : */
                <SelectSearch
                    searchCat={searchCat}
                    setSearchCat={setSearchCat}
                    category={serviceCategoriesS}
                    search={search} />
            }
        </div>
    ), [mine, boxSelected, searchCat, serviceCategoriesS]);

    const TabSection = useMemo(() => (
        <TabsMenu
            labels={serviceTabs}
            selectedSort={sort}
            setSelectedSort={setSort}
            reverse={reverse}
            setReverse={setReverse}
        />
    ), [reverse, setReverse]);


    useEffect(() => {
        setSearchSection(SearchSection);
        setTabSection(TabSection);
        return () => {
            setSearchSection(null);
            setTabSection(null);
        };
    }, [notif, SearchSection, TabSection]);

    const sortBtnProps: SortButtonProps = {
        sortList: sortList,
        setSelectedSort: setSort,
        selectedSort: sort,
        reverse: reverse,
        setReverse: setReverse,
        action: () => refetch()
    }

    const viewBtnProps: ViewButtonProps = {
        viewList: [{ key: 'compact', label: 'Compact', icon: "grid_view", action: () => setCompact(true) }, { key: 'large', label: 'Large', icon: "view_agenda", action: () => setCompact(false) }],
        view: compact ? 'compact' : 'large'
    }


    const [filterBox, setFilterBox] = useState<boolean>(false);

    //// RENDER
    return (

        <main >
            <DetailsHeadSection
                hidden={hideNavBottom && !isLoading && !error && !notif}
                infosChipValue={`${count ?? 0} services ${filterName() ? '/ ' + filterName() : ''} ${categoryName() ? '/ ' + categoryName() : ''}`}
                sortBtnProps={sortBtnProps}
                viewBtnProps={viewBtnProps}
                groupBtnProps={{ setSelectedGroup, selectedGroup }}
                notif={notif}
                error={error}
                isLoading={isLoading}
                refetch={refetch}
            > {mine && services?.length > 0 &&
                <Icon
                    onClick={() => setFilterBox(!filterBox)}
                    icon={!filterBox ? "filter_alt" : "filter_alt_off"}
                    size="lg"
                    color="sky"
                    fill
                    title={filterBox ? "reduire" : "voir les filtres"} />}
            </DetailsHeadSection>
            {filterBox && mine && (
                <CheckCard
                    categoriesArray={boxArray}
                    boxSelected={boxSelected}
                    setBoxSelected={setBoxSelected} />)}
            {isLoading ?
                <SkeletonGrid />
                : <section
                    ref={divRef}
                    onScroll={() => {
                        onScroll();
                        handleHideCallback()
                    }}
                    className={"Grid anim " + (compact ? ' GridCompact' : '')}>

                    {services.map((service: ServiceView, index: number) => (

                        <div className={`SubGrid `} key={index}>
                            <ServiceComp
                                compact={!compact}
                                key={service?.id}
                                service={service}
                                change={search as any}
                                mines={mine}
                                update={refetch} />
                        </div>))
                    }
                    <LoadMoreButton
                        isBottom={isBottom}
                        hasNextPage={hasNextPage}
                        handleScroll={() => onScroll()} />
                </section>}
        </main>
    );
}
