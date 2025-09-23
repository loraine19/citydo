import { useNavigate, useParams } from 'react-router-dom';
import CTAMines from '../../common/CTA';
import PostDetailCard from './PostComps/PostDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import { GenereMyActions, } from '../../../views/viewsEntities/utilsService';
import DI from '../../../../di/ioc';
import { Skeleton, SkeletonGrid } from '../../common/Skeleton';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { useRef, useCallback, useState, useEffect, useMemo } from 'react';
import { HandleHideParams } from '../../../../application/useCases/utils.useCase';
import { useUxStore } from '../../../../application/stores/ux.store';
import { useNavStore } from '../../../../application/stores/nav.store';
import FormHeadSection from '../base/baseComps/FormHeadSection';
import { PostCategory } from '../../../../domain/entities/Post';

export default function PostDetailPage() {
    //// PARAMS
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0;

    //// VIEW MODEL
    const postIdViewModelFactory = DI.resolve('postIdViewModel');
    const { post, isLoading, error, refetch } = postIdViewModelFactory(idS);
    const deletePost = async (id: number) => await DI.resolve('deletePostUseCase').execute(id);

    const { setOpen, open } = useAlertStore(state => state);
    const handleOpen = () => setOpen(!open)
    const myActions = post && GenereMyActions(post, "annonce", deletePost)
    const navigate = useNavigate()


    const [notif, setNotif] = useState<string>('');

    //// NOTIFICATION
    useEffect(() => {
        if (error) setNotif(error.message)
        else setNotif('');
    }, [isLoading, error]);

    //// HANDLE SCROLL
    const utils = DI.resolve('utils')
    const divRef = useRef(null);

    //// HANDLE HIDE 
    const { hideNavBottom, setHideNavBottom } = useUxStore()
    const handleHide = (params: HandleHideParams) => utils.handleHide(params)
    const handleHideCallback = useCallback(() => {
        const params: HandleHideParams = { divRef, setHide: setHideNavBottom }
        handleHide(params)
    }, [divRef]);

    //// CONTACT ACTIONS
    const ContactActions: Action[] = !post ? [] : [
        {
            iconImage: 'call',
            icon: 'Appel',
            disabled: post?.shareA?.find((s: string) => s === "PHONE") ? false : true,
            title: "Confirmer mon appel à " + post?.User?.Profile?.firstName,
            body: `<a href="tel:${post?.User?.Profile?.phone}" target="_blank" rel="noopener noreferrer" class="text-orange-500 font-medium underline">Confirmer mon appel ${post?.User?.Profile?.phone}</a>`,
            function: () => { window.open(`tel:${post?.User?.Profile?.phone}`); handleOpen(); },
        },
        {
            iconImage: 'mail',
            icon: 'Email',
            disabled: post?.shareA?.find((s: string) => s === "EMAIL") ?
                false : true,
            title: "Envoyer un email à " + post?.User?.Profile?.firstName,
            body: `<a href="mailto:${post?.User?.email}?subject=${post?.title} target="_blank" rel="noopener noreferrer" class="text-orange-500 font-medium underline">Envoyer un email à ${post?.User?.Profile?.firstName}</a>`,
            function: () => { window.open(`mailto:${post?.User?.email}?subject=${post?.title}`); handleOpen(); },
        },
        {
            iconImage: 'forum',
            icon: 'Chat',
            title: "Envoyer le message suivant à " + post?.User?.Profile?.firstName,
            body: ` Bonjour ${post?.User?.Profile?.firstName}, je suis intéressé par votre annonce "${post?.title}`,
            function: () => { navigate(`/chat?with=${post?.User?.Profile?.userId ?? 0}&text=${ContactActions[2].body}`) }
        },
    ]

    //// HANDLE EXPAND
    const [expand, setExpand] = useState<boolean>(false);


    //// TO NAV BAR
    const { setDetailSection } = useNavStore((state) => state);

    const SearchSection = useMemo(() => (
        <FormHeadSection
            isLoading={isLoading}
            notif={notif}
            refetch={refetch}
            error={error}
            infosChipValue={`annonce / ${PostCategory[post?.category as keyof typeof PostCategory] ?? '...'} `} >
        </FormHeadSection>
    ), [isLoading, hideNavBottom]);

    useEffect(() => {
        setDetailSection(SearchSection);
        return () => {
            setDetailSection(undefined);
        }
    }, [SearchSection, isLoading, hideNavBottom]);

    return (
        <>
            <main>

                <section
                    id='refDiv'
                    className={`${expand ? 'overflow-auto' : ''} `}
                    ref={divRef}
                    onScroll={() => {
                        handleHideCallback()
                    }}>

                    <div className={`DetailCardDiv ${!hideNavBottom ? post?.isMine ? "hideCTA2" : "hideCTA2" : ""}`}>
                        {!isLoading && post ?
                            <PostDetailCard
                                expand={expand}
                                setExpand={setExpand}
                                post={post}
                                mines={post?.isMine}
                                change={() => { }} /> :
                            <Skeleton />}
                    </div>

                    {/* ARTICLES */}
                    <article className='grid grid-rows-[auto,1fr] py-5  lg:-ml-5'>
                        <h3>Articles</h3>
                        <SkeletonGrid count={3} />
                    </article>
                </section>
            </main>
            <footer className={`footer ${hideNavBottom ? 'hidden' : ''}`} >
                {(!isLoading && !error && post) &&
                    <>
                        {post?.isMine ?
                            <CTAMines
                                actions={myActions} /> :
                            <CTAMines
                                actions={ContactActions} />
                        }
                    </>}
            </footer>
        </>
    )
}

