import { useNavigate, useParams } from 'react-router-dom';
import CTAMines from '../../common/CTA';
import SubHeader from '../../common/SubHeader';
import PostDetailCard from './PostComps/PostDetailCard';
import { Action } from '../../../../domain/entities/frontEntities';
import { GenereMyActions, } from '../../../views/viewsEntities/utilsService';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { useAlertStore } from '../../../../application/stores/alert.store';

export default function PostDetailPage() {
    //// PARAMS
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0;

    //// VIEW MODEL
    const postIdViewModelFactory = DI.resolve('postIdViewModel');
    const { post, isLoading, error } = postIdViewModelFactory(idS);
    const deletePost = async (id: number) => await DI.resolve('deletePostUseCase').execute(id);

    const { setOpen, open } = useAlertStore(state => state);
    const handleOpen = () => setOpen(!open)
    const myActions = post && GenereMyActions(post, "annonce", deletePost)
    const navigate = useNavigate();

    //// CONTACT ACTIONS
    const ContactActions: Action[] = !post ? [] : [
        {
            iconImage: 'call',
            icon: 'Appel',
            title: "Confirmer mon appel à " + post?.User?.Profile?.firstName,
            body: `<a href="tel:${post?.User?.Profile?.phone}" target="_blank" rel="noopener noreferrer" class="text-orange-500 font-medium underline">Confirmer mon appel ${post?.User?.Profile?.phone}</a>`,
            function: () => { window.open(`tel:${post?.User?.Profile?.phone}`); handleOpen(); },
        },
        {
            iconImage: 'mail',
            icon: 'Email',
            title: "Envoyer un email à " + post?.User?.Profile?.firstName,
            body: `<a href="mailto:${post?.User?.email}?subject=${post?.title} target="_blank" rel="noopener noreferrer" class="text-orange-500 font-medium underline">Envoyer un email à ${post?.User?.Profile?.firstName}</a>`,
            function: () => { window.open(`mailto:${post?.User?.email}?subject=${post?.title}`); handleOpen(); },
        },
        {
            iconImage: 'forum',
            icon: 'Chat',
            title: "Envoyer le message suivant à " + post?.User?.Profile?.firstName,
            body: ` Bonjour ${post?.User?.Profile?.firstName}, je suis intéressé par votre annonce "${post?.title}`,
            function: () => { navigate(`/chat?with=${post?.User?.Profile?.userId ?? 0}&text=${ContactActions[2].body}`); handleOpen(); }
        },
    ]

    return (
        <>
            <main>
                <div className="sectionHeader ">
                    <SubHeader type={`annonce ${post?.categoryS ?? ""}`} closeBtn />
                </div>
                <section>
                    {!isLoading && !error && post ?
                        <PostDetailCard
                            post={post}
                            mines={post?.isMine}
                            change={() => { }} /> :
                        <Skeleton />}
                </section>
            </main>
            <footer>
                {(!isLoading && !error && post) &&
                    <>
                        {post?.isMine ?
                            <CTAMines
                                actions={myActions} /> :
                            <CTAMines
                                actions={ContactActions}
                                disabled1={post?.shareA?.find((s: string) => s === "PHONE") ?
                                    false : true}
                                disabled2={post?.shareA?.find((s: string) => s === "EMAIL") ?
                                    false : true} />
                        }
                    </>}
            </footer>
        </>
    )
}

