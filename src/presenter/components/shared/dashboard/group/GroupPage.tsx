import { useCallback, useEffect, useRef, useState } from "react";
import SubHeader from '../../../common/SubHeader';
import DI from '../../../../../di/ioc';
import { useSearchParams } from 'react-router-dom';
import { GroupView } from '../../../../views/viewsEntities/GroupViewEntity';
import { LoadMoreButton } from '../../../common/LoadMoreBtn';
import { SkeletonGrid } from '../../../common/Skeleton';
import { GroupCard } from "./GroupCard";
import TabsMenu from "../../../common/TabsMenu";
import { TabLabel } from "../../../../../domain/entities/frontEntities";
import { GroupCategory, GroupFilter } from "../../../../../domain/entities/Group";
import { groupCategories } from "../../../../constants";
import { getValue } from "../../../../views/viewsEntities/utilsService";
import { useUxStore } from "../../../../../application/stores/ux.store";
import { HandleHideParams, HandleScrollParams } from "../../../../../application/useCases/utils.useCase";
import NotifDiv from "../../../common/NotifDiv";
import { Select } from "../../../common/adaptatersComps/Select";

export default function GroupPage() {
    const [notif, setNotif] = useState<string>('');
    const [selectedSort, setSelectedSort] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const groupViewModelFactory = DI.resolve('groupViewModel');
    const { groups, count, isLoading, refetch, fetchNextPage, hasNextPage, error } = groupViewModelFactory(filter, category);
    const [mines, setMines] = useState<boolean>(false);
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), category: Params.get("category") }
    useEffect(() => { setCategory(params.category || ''); setFilter(params.filter || '') }, []);

    //// TABS 
    const filterTab = async (value?: GroupFilter) => {
        setParams({ filter: value as string || '', category });
        if (value !== filter) { setCategory('') }
        setFilter(value || '');
        value === GroupFilter.MINE ? setMines(true) : setMines(false);
        setParams({ filter: value as string || '', category })
        await refetch();
    }


    const Tabs: TabLabel[] = [
        { label: "tous", value: "", result: () => filterTab() },
        { label: "Je suis membre", value: GroupFilter.IMIN, result: () => filterTab(GroupFilter.IMIN) },
        { label: "Je suis conciliateur", value: GroupFilter.IMODO, result: () => filterTab(GroupFilter.IMODO) },
        { label: "j'ai créé", value: GroupFilter.MINE, result: () => filterTab(GroupFilter.MINE) },
    ]

    /// CATEGORIES SELECT 
    const change = async (e: string | React.ChangeEvent<HTMLSelectElement> | any) => {
        const selectedCategory = typeof e !== "object" ?
            e.toUpperCase() : getValue(e.target.innerText.toLowerCase(), groupCategories).toLowerCase()
        setCategory(selectedCategory);
        setParams({ filter: filter as string || '', category: selectedCategory });
        await refetch()
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
    useEffect(() => { (hide !== hideNavBottom) && setHideNavBottom(hide) }, [hide])

    //// SETNOTIF
    const filterName = (): string => {
        switch (filter) {
            case GroupFilter.MINE: return 'que vous avez créé';
            case GroupFilter.IMIN: return 'où vous êtes membre';
            case GroupFilter.IMODO: return 'où vous êtes conciliateur';
            default: return '';
        }
    }
    const categorieName = (category: string): string => GroupCategory[category as keyof typeof GroupCategory] ?? '';

    useEffect(() => {
        if (error) {
            setNotif(error.message || "Erreur inconnue");
            return;
        }
        switch (true) {
            case count === 0: setNotif(`Aucun groupe ${filterName()} ${categorieName(category)} trouvé`); break;
            default: setNotif('');
        }
    }, [groups, isLoading, error, filter, category]);

    //// RENDER
    return (
        <main>
            <div className="sectionHeader ">

                <div className={` flex flex-col items-center justify-center `}>
                    <TabsMenu
                        labels={Tabs}
                        selectedSort={selectedSort}
                        setSelectedSort={setSelectedSort} />
                    <Select
                        setValue={change}
                        options={groupCategories}
                        placeholder="Choisir une catégorie"
                        name={"category"}
                        value={category} />
                </div>
                <SubHeader
                    closeBtn
                    link={`/`}
                    qty={count}
                    type={`Groupes `}
                    place={`${filterName() ?? 'proche de chez vous'}`}
                />

                {notif &&
                    <NotifDiv
                        error={error}
                        notif={notif}
                        isLoading={isLoading}
                        refetch={refetch} />}
            </div>
            {isLoading || error ?
                <SkeletonGrid />
                : <section
                    ref={divRef}
                    onScroll={() => { onScroll(); handleHideCallback() }}
                    className="Grid">


                    {groups.map((group: GroupView, index: number) => (
                        <div className="SubGrid" key={index}>
                            <GroupCard
                                key={index}
                                mines={mines}
                                group={group}
                            />
                        </div>))}
                    <LoadMoreButton
                        isBottom={isBottom}
                        hasNextPage={hasNextPage}
                        handleScroll={onScroll} />
                </section>}
        </main>
    )
}

