import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SubHeader from "../../../common/appComps/SubHeader";
import TabsMenu from "../../../common/appComps/TabsMenu";
import { Label, TabLabel } from "../../../../../domain/entities/frontEntities";
import { SkeletonGrid } from "../../../common/Skeleton";
import DI from '../../../../../di/ioc';
import { LoadMoreButton } from "../../../common/LoadMoreBtn";
import IssueCard from "./IssueCard";
import { IssueView } from "../../../../views/viewsEntities/issueViewEntity";
import { useUserStore } from "../../../../../application/stores/user.store";
import { Role } from "../../../../../domain/entities/GroupUser";
import { IssueFilter } from '../../../../../domain/entities/Issue';
import { Icon } from "../../../common/IconComp";
import { useUxStore } from "../../../../../application/stores/ux.store";
import { HandleHideParams, HandleScrollParams } from "../../../../../application/useCases/utils.useCase";

export default function ConciationListPage() {
    const [notif, setNotif] = useState<string>('');
    const [tabSelected] = useState<string>('');
    const [step, setStep] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    //// PARAMS
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), category: Params.get("category") }
    useEffect(() => { setFilter(params.filter || '') }, []);

    //// VIEW MODEL
    const issueViewModelFactory = DI.resolve('issueViewModel');
    const { issues, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = issueViewModelFactory(step)

    //// STATE
    const user = useUserStore().user
    const ImModo = (user?.GroupUser?.map(g => g.role).includes(Role.MODO))

    //// NAMING
    const filterName = (): string => filter === IssueFilter.FINISH && 'resolus' || filter === IssueFilter.PENDING && 'demande' || filter === IssueFilter.WAITING && 'en cours' || ''

    //// FILTER TAB
    const filterTab = async (value?: IssueFilter) => {
        setParams({ filter: value as string ?? '', category });
        value !== filter && setCategory('')
        setFilter(value ?? '');
        setStep(value ?? '')
        setParams({ filter: value as string ?? '', category })
    }

    const serviceTabs: TabLabel[] = [
        { label: "tous", value: '', result: () => filterTab() },
        { label: "demande", value: IssueFilter.WAITING, result: () => filterTab(IssueFilter.WAITING) },
        { label: "en cours", value: IssueFilter.PENDING, result: () => filterTab(IssueFilter.PENDING) },
        { label: "terminés", value: IssueFilter.FINISH, result: () => filterTab(IssueFilter.FINISH) },
        { label: "me concerne", value: IssueFilter.MINE, result: () => filterTab(IssueFilter.MINE) }
    ]

    //// TODO KEEP SEARCH ? ADD SORT ?
    //// SEARCH
    const search = (searchLabel: Label) => {
        const value = searchLabel.value;
        if (value) {
            setCategory(value);
            setParams({ search: tabSelected, category: value });
        }
    }

    //// NOTIFICATION
    useEffect(() => {
        switch (true) {
            case (count === 0): setNotif(`Aucun ${filterName()} n'a été trouvé`); break;
            case (error): setNotif("Erreur lors du chargement, veuillez réessayer plus tard"); break;
            default: setNotif('');
        }
    }, [issues, isLoading, error, filter, category, count, ImModo]);

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

    //// RENDER
    return (
        <main>
            <div className="sectionHeader">
                <TabsMenu labels={serviceTabs} />
                <SubHeader

                    qty={count}
                    link="/"
                    type={`${count > 0 ? 'conciliations' : 'aucune conciliation'} ${filterName()}`} />
                {notif &&
                    <div className={'notif'}>
                        {notif}
                        <Icon
                            bg={!isLoading}
                            textIcon={isLoading ? '...' : 'refresh'}
                            onClick={() => refetch()} />
                    </div>}
            </div>
            {isLoading ?
                <SkeletonGrid />
                : <section
                    ref={divRef}
                    onScroll={() => {
                        onScroll();
                        handleHideCallback()
                    }}
                    className="Grid">
                    {issues && issues?.map((issue: IssueView, index: number) => (
                        <div className="SubGrid" key={index}>
                            <IssueCard
                                issue={issue}
                                change={search}
                                update={refetch} />
                        </div>))}
                    <LoadMoreButton
                        isBottom={isBottom}
                        hasNextPage={hasNextPage}
                        handleScroll={onScroll} />
                </section>}
        </main>
    );
}
