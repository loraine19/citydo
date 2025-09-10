import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PostCategory, PostFilter, PostFindParams, PostSort } from "../../../../domain/entities/Post";
import SubHeader from "../../common/SubHeader";
import TabsMenu from "../../common/TabsMenu";
import PostGridComp from "./PostComps/PostGridComp";
import { SkeletonGrid } from "../../common/Skeleton";
import { getValue } from "../../../views/viewsEntities/utilsService";
import DI from "../../../../di/ioc";
import { PostView } from "../../../views/viewsEntities/postViewEntities";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { postCategories } from "../../../constants";
import PostCard from "./PostComps/PostCard";
import { Label, SortLabel, TabLabel } from "../../../../domain/entities/frontEntities";
import { Icon } from "../../common/IconComp";
import NotifDiv from "../../common/NotifDiv";
import { useUxStore } from "../../../../application/stores/ux.store";
import { HandleHideParams, HandleScrollParams } from "../../../../application/useCases/utils.useCase";
import SelectSearch from "../../common/SelectSearch";

export default function PostListPage() {

    //// INITIAL STATE
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [sort, setSort] = useState<PostSort>(PostSort.CREATED_AT);
    const [reverse, setReverse] = useState<boolean>(true);
    const [notif, setNotif] = useState<string>('')
    const [mines, setMines] = useState<boolean>(false);
    const [view, setView] = useState(window.innerWidth > 768 ? "list" : "dashboard");
    const [searchString, setSearchString] = useState<string>('');

    //// PARAMS
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), category: Params.get("category") }
    useEffect(() => { setCategory(params.category ?? ''); setFilter(params.filter ?? ''); }, []);

    //// VIEW MODEL
    const postViewModelFactory = (paramsFind: PostFindParams) => DI.resolve('postViewModel')(paramsFind);
    const { posts, isLoading, error, refetch, count, fetchNextPage, hasNextPage } = postViewModelFactory(
        {
            filter: filter as PostFilter,
            category: category as PostCategory,
            sort: sort as PostSort,
            reverse,
            search: searchString
        }
    )

    //// FILTER TAB
    const filterTab = async (value?: PostFilter) => {
        setParams({ filter: value as string ?? '', category });
        value !== filter && setCategory('')
        setFilter(value || '')
        value === PostFilter.MINE ? setMines(true) : setMines(false);
        setParams({ filter: value as string ?? '', category })
        await refetch();
    }

    const postTabs: TabLabel[] = [
        { label: "tous", value: "", result: () => filterTab(), icon: { icon: "list" } },
        { label: "J'aime", value: PostFilter.ILIKE, result: () => filterTab(PostFilter.ILIKE), icon: { icon: "thumb_up" } },
        {
            label: "Mes annonces", value: PostFilter.MINE, result: () => filterTab(PostFilter.MINE),
            icon: { icon: "person" }
        }
    ]

    const change = async (e: string | React.ChangeEvent<HTMLSelectElement> | any) => {
        const selectedCategory = typeof e !== "object" ?
            e.toUpperCase() : getValue(e.target.innerText.toLowerCase(), postCategories).toLowerCase();
        setCategory(selectedCategory);
        setParams({ filter: filter as string || '', category: selectedCategory });
        await refetch()
    }

    //// SEARCH
    const [searchCat, setSearchCat] = useState<Label>({ label: 'tous', value: '' });
    const [tabSelected] = useState<string>('');
    const search = (searchLabel: Label) => {
        const value = searchLabel.value;
        const label = searchLabel.label;
        if (value) {
            setCategory(value);
            setParams({ search: tabSelected, category: value });
        }
        else if (label !== 'tous') setSearchString(label)
    };

    //// NAMING
    const filterName = (): string => {
        switch (filter) {
            case PostFilter.MINE: return 'que j\'ai posté';
            case PostFilter.ILIKE: return 'que j\'aime';
            default: return '';
        }
    }
    const categoryName = (): string => PostCategory[category as keyof typeof PostCategory] ?? '';

    //// NOTIFICATION
    useEffect(() => {
        if (error) {
            setNotif(error.message || "Erreur inconnue");
            return;
        }
        switch (true) {
            case (count === 0 && !isLoading && !error): setNotif(`Aucune annonce ${filterName()} ${categoryName()} n'a été trouvé`); break;
            default: setNotif('');
        }
    }, [isLoading, error, filter, category, sort, reverse, count]);


    //// HANDLE VIEW
    useEffect(() => {
        const handleResize = () => setView(window.innerWidth > 768 ? "list" : "dashboard");
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const AnnouncesByFour = (array: PostView[]) => {
        const arrayTotal: PostView[][] = [];
        for (let i = 0; i < array?.length; i += 4)  arrayTotal.push(array.slice(i, i + 4))
        return arrayTotal;
    }
    const announcesToGrid = AnnouncesByFour(posts);
    const switchClick = () => setView(view === "dashboard" ? "list" : "dashboard");


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
        { key: PostSort.LIKE, label: "Nombre de likes", icon: "thumb_up" },
        { key: PostSort.CREATED_AT, label: "Créé le", icon: "event" },
        { key: PostSort.TITLE, label: "Titre", icon: "sort_by_alpha" },
        { key: PostSort.USER, label: "Utilisateur", icon: "person" }
    ]


    //// HANDLE COMPACT VIEW
    const [compact, setCompact] = useState<boolean>(false);

    //// RENDER
    return (

        <main>
            <div className="sectionHeader">

                <div className={` flex items-center justify-end gap-2 py-1`}>
                    <SelectSearch
                        searchCat={searchCat}
                        setSearchCat={setSearchCat}
                        category={postCategories}
                        search={search} />
                    <Icon
                        icon={view === "list" ? "grid_view" : "dashboard"}
                        onClick={switchClick}
                        size="xl"
                        fill
                        color="rose"
                        style={"hidden sm:flex"}
                    />
                    <Icon
                        onClick={() => setCompact(!compact)}
                        icon={compact ? "view_column" : "view_agenda"}
                        size="xl"
                        color="rose"
                        fill
                        style={(view === "list" ? "hidden" : "flex sm:hidden lg:flex") + "  "}
                        title={!compact ? "voir en mode liste" : "voir en mode grille"} />
                </div>
                <TabsMenu
                    labels={postTabs}
                    sortList={sortList}
                    selectedSort={sort}
                    setSelectedSort={setSort}
                    reverse={reverse}
                    setReverse={setReverse}
                    action={refetch}
                />
                <SubHeader
                    qty={count}
                    type={`annonces ${filterName() ?? ''} ${PostCategory[category as keyof typeof PostCategory] ?? ''}`} />
                {notif &&
                    <NotifDiv
                        error={error}
                        notif={notif}
                        isLoading={isLoading}
                        refetch={refetch} />}
            </div>
            <section
                ref={divRef}
                onScroll={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onScroll();
                    handleHideCallback();
                }}>
                {isLoading ?
                    <SkeletonGrid />
                    : <>
                        {view === "list" ?
                            announcesToGrid.map((line, index) => (
                                <PostGridComp
                                    autoFit={!compact}
                                    key={index}
                                    line={line}
                                    update={refetch}
                                    change={change}
                                    mines={mines}
                                    view={view} />))
                            :
                            <div className={"Grid " + (!compact ? ' GridCompact' : '')}>
                                {posts?.map((post: PostView, index: number) => (
                                    <div
                                        className="SubGrid"
                                        key={index}>
                                        <PostCard
                                            autoFit={!compact}
                                            short
                                            key={post?.id}
                                            post={post}
                                            change={change}
                                            update={refetch}
                                            mines={mines} />
                                    </div>
                                ))}
                            </div>
                        }
                    </>
                }
                <LoadMoreButton
                    color={'rose'}
                    isBottom={isBottom}
                    hasNextPage={true}
                    handleScroll={onScroll} />
            </section>
        </main>
    );
}
