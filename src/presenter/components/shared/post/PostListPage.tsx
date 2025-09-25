import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PostCategory, PostFilter, PostFindParams, PostSort } from "../../../../domain/entities/Post";
import { Label, SortLabel, TabLabel } from "../../../../domain/entities/frontEntities";
import { getValue } from "../../../views/viewsEntities/utilsService";
import { postCategories, postCategoriesS } from "../../../constants";
import { PostView } from "../../../views/viewsEntities/postViewEntities";
import { SkeletonGrid } from "../../common/Skeleton";
import DI from "../../../../di/ioc";
import { LoadMoreButton } from "../../common/LoadMoreBtn";
import { useUxStore } from "../../../../application/stores/ux.store";
import { HandleHideParams, HandleScrollParams } from "../../../../application/useCases/utils.useCase";
import { useNavStore } from "../../../../application/stores/nav.store";
import DetailsHeadSection from "../base/baseComps/DetailsHeadSection";
import SelectSearch from "../../common/appComps/SelectSearch";
import TabsMenu from "../../common/appComps/TabsMenu";
import PostCard from "./PostComps/PostCard";
import PostGridComp from "./PostComps/PostGridComp";

export default function PostListPage() {
    const [notif, setNotif] = useState<string>("");
    const [tabSelected] = useState<string>('');
    const [searchCat, setSearchCat] = useState<Label>({ label: 'tous', value: '' });
    const [mines, setMines] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [sort, setSort] = useState<PostSort>(PostSort.CREATED_AT);
    const [reverse, setReverse] = useState<boolean>(true);
    const [searchString, setSearchString] = useState<string>('');
    const [view, setView] = useState<'compact' | 'dashboard' | 'large'>("compact");

    //// PARAMS
    const [Params, setParams] = useSearchParams();
    const params = {
        filter: Params.get("filter"),
        category: Params.get("category"),
        postView: Params.get("postView")
    };

    //// VIEW MODEL
    const postViewModelFactory = (params: PostFindParams) => DI.resolve('postViewModel')(params);
    const { posts, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = postViewModelFactory({
        filter: filter as PostFilter,
        category: category as PostCategory,
        sort: sort as PostSort,
        reverse,
        search: searchString
    });

    useEffect(() => {
        setCategory(params.category || '');
        setFilter(params.filter || '');
        setView(params.postView as 'compact' | 'dashboard' | 'large' || 'compact');
        setParams({ filter: params.filter || '', category: params.category || '', postView: params.postView || 'compact' });
        // eslint-disable-next-line
    }, []);

    //// NAMING
    const filterName = (): string => {
        switch (filter) {
            case PostFilter.MINE: return 'que j\'ai posté';
            case PostFilter.ILIKE: return 'que j\'aime';
            default: return '';
        }
    }
    const categoryName = (): string => PostCategory[category as keyof typeof PostCategory] ?? '';

    //// FILTER TAB
    const filterTab = async (value?: PostFilter) => {
        setParams({ filter: value as string || '', category: category, postView: view });
        value !== filter && setCategory('');
        setFilter(value || '');
        setMines(value === PostFilter.MINE);
        setParams({ filter: value as string || '', category: category, postView: view });
        await refetch();
    }

    const postTabs: TabLabel[] = [
        { label: "tous", value: "", result: () => filterTab(), icon: { icon: "list" } },
        { label: "J'aime", value: PostFilter.ILIKE, result: () => filterTab(PostFilter.ILIKE), icon: { icon: "favorite" } },
        { label: "Mes annonces", value: PostFilter.MINE, result: () => filterTab(PostFilter.MINE), icon: { icon: "person" } }
    ];

    //// SEARCH
    const search = (searchLabel: Label) => {
        const value = searchLabel.value;
        const label = searchLabel.label;
        if (value) {
            setCategory(value);
            setParams({ search: tabSelected, category: value, postView: view });
        }
        else if (label !== 'tous') setSearchString(label)
    };

    //// HANDLE CATEGORY CHANGE
    const change = async (e: string | React.ChangeEvent<HTMLSelectElement> | any) => {
        const selectedCategory = typeof e !== "object"
            ? e.toUpperCase()
            : getValue(e.target.innerText.toLowerCase(), postCategories).toLowerCase();
        setCategory(selectedCategory);
        setParams({ filter: filter as string || '', category: selectedCategory, postView: view });
        await refetch();
    }

    //// NOTIFICATION
    useEffect(() => {
        if (error) setNotif(error.message || 'Erreur inconnue');
        else if ((count === 0 || !posts || posts?.length === 0) && !isLoading && !error)
            setNotif(`Aucune annonce ${filterName()} ${categoryName()} n'a été trouvée`);
        else setNotif('');
    }, [isLoading, error, filter, category, count, posts?.length]);



    //// FORMAT POSTS FOR GRID VIEW
    const AnnouncesByFour = (array: PostView[]) => {
        const arrayTotal: PostView[][] = [];
        for (let i = 0; i < array?.length; i += 4)  arrayTotal.push(array.slice(i, i + 4))
        return arrayTotal;
    }
    const announcesToGrid = AnnouncesByFour(posts);


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
        { key: PostSort.LIKE, label: "Nombre de likes", icon: "thumb_up" },
        { key: PostSort.CREATED_AT, label: "Créé le", icon: "event" },
        { key: PostSort.TITLE, label: "Titre", icon: "sort_by_alpha" },
        { key: PostSort.USER, label: "Utilisateur", icon: "person" }
    ];

    //// HANDLE COMPACT VIEW
    const [compact, setCompact] = useState<boolean>(true);

    //// APPBAR SECTIONS
    const { setSearchSection, setTabSection } = useNavStore((state) => state);

    const SearchSection = useMemo(() => (
        <SelectSearch
            searchCat={searchCat}
            setSearchCat={setSearchCat}
            category={postCategoriesS}
            search={search}
        />
    ), [searchCat, view, compact]);

    const TabSection = useMemo(() => (
        <TabsMenu
            labels={postTabs}
            defaultTab={params.filter || ''}
            action={refetch}
        />
        // eslint-disable-next-line
    ), [sort, reverse, params.filter]);

    useEffect(() => {
        setSearchSection(SearchSection);
        setTabSection(TabSection);
        return () => {
            setSearchSection(null);
            setTabSection(null);
        };
    }, [SearchSection, TabSection, setSearchSection, setTabSection]);




    const dashboardViewItem = {

        key: 'dashboard',
        label: 'Card',
        icon: "dashboard",
        action: () => {
            setCompact(false);
            setView('dashboard');
        }

    }

    //// HANDLE VIEW
    const viewList: any[] = [
        {
            key: 'compact', label: 'Compact', icon: "grid_view", action: () => {
                setCompact(true);
                setView('compact')
            }
        },
        {
            key: 'large', label: 'Large', icon: "view_agenda", action: () => {
                setCompact(false);
                setView('large')
            }
        },
    ]
    useEffect(() => {

        const handleResize = () => {
            setView(window.innerWidth > 768 ? "dashboard" : "compact");
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [view]);


    //// RENDER
    return (
        <main>

            <DetailsHeadSection
                hidden={hideNavBottom && !isLoading && !error && !notif}
                infosChipValue={`${count ?? 0} annonces${filterName() ? ' / ' + filterName() : ''}${categoryName() ? ' / ' + categoryName() : ''}`}
                sortBtnProps={{
                    sortList: sortList,
                    setSelectedSort: setSort,
                    selectedSort: sort,
                    reverse: reverse,
                    setReverse: setReverse,
                    action: () => refetch()
                }}
                viewBtnProps={{
                    viewList: viewList.concat(window.innerWidth > 768 && dashboardViewItem ? [dashboardViewItem] : []),
                    view: view,
                }

                }
                notif={notif}
                error={error}
                isLoading={isLoading}
                refetch={refetch}
            />
            <section
                id='refDiv'
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
                        {(view === "dashboard" && !compact) ?
                            announcesToGrid.map((line, index) => (
                                <PostGridComp
                                    autoFit={false}
                                    key={index}
                                    line={line}
                                    update={refetch}
                                    change={change}
                                    mines={mines}
                                    view={view} />))
                            :
                            <div className={"Grid anim " + ((compact && view !== 'dashboard') ? ' GridCompact' : '')}>
                                {posts?.map((post: PostView, index: number) => (
                                    post && <div
                                        className="SubGrid"
                                        key={index}>
                                        <PostCard

                                            autoFit={compact}
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
                    </>}
                <LoadMoreButton
                    isBottom={isBottom}
                    hasNextPage={hasNextPage}
                    handleScroll={onScroll}
                />
            </section>
        </main>
    );
}
