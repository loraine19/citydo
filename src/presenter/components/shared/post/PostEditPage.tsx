import { useFormik } from 'formik';
import { object, string, array } from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PostFormCard } from './PostComps/PostFormCard';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { PostDTO } from '../../../../infrastructure/DTOs/PostDTO';
import { Share } from '../../../../domain/entities/Post';
import { PostView } from '../../../views/viewsEntities/postViewEntities';
import { useAlertStore } from '../../../../application/stores/alert.store';
import PostCard from './PostComps/PostCard';
import { TextLength } from '../../../../domain/entities/utilsEntity';

export default function PostEditPage() {
    //// PARAMS
    const { id } = useParams()
    const navigate = useNavigate();

    //// VIEW MODEL
    const updatePost = (id: number, data: PostDTO) => DI.resolve('updatePostUseCase').execute(id, data);
    const idS = id ? parseInt(id) : 0;
    const postIdViewModelFactory = DI.resolve('postIdViewModel');
    const { post, error, isLoading, refetch } = postIdViewModelFactory(idS);
    const [initialValues, setInitialValues] = useState<PostView>({} as PostView);

    //// STORES
    const { setOpen, setAlertValues, handleApiError } = useAlertStore()

    const formSchema = object({
        category: string().required("Catégorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres").max(TextLength.MAX_LONGTEXT, "le texte est trop long"),
        shareA: array().required("Partager est obligatoire").min(1, "minmum 1 contact"),
        groupId: string().required("Groupe est obligatoire").notOneOf(["0"], "Groupe est obligatoire"),
    })

    useEffect(() => {
        if (!isLoading && post && !post?.isMine) throw new Error("Vous n'avez pas le droit de modifier ce post");
        post && setInitialValues(post)
    }, [isLoading]);


    const updateFunction = async () => {
        const shareArray = formik.values.shareA as string[];
        const share = shareArray.sort().join('_').toUpperCase() as unknown as Share;
        const updateData = new PostDTO({ ...formik.values as PostDTO, share });
        try {
            const data = await updatePost(post.id, updateData)
            if (data?.id) { navigate(`/annonce/${data?.id}`); refetch(); setOpen(false); }
            else handleApiError("Erreur lors de la modification de l'annonce");
        } catch (error) {
            handleApiError(error ?? "Erreur lors de la modification de l'annonce");
        }
    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues as any,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
            setAlertValues({
                handleConfirm: async () => await updateFunction(),
                confirmString: "Enregistrer ",
                title: "Confimrer la modification",
                element: (
                    <div className='flex flex-col gap-8 max-h-[80vh]  bg-gray-200 rounded-2xl pt-10 p-5'>
                        <PostCard
                            post={new PostView({ ...formik.values, image: formik.values?.blob || formik.values?.image }, post.userId ?? 0)}
                            change={() => { }}
                            update={() => { }}
                        />
                    </div>
                )
            })
        }
    })



    return (
        <>

            {isLoading || error ?
                <Skeleton /> :
                <PostFormCard
                    formik={formik} />}
        </ >
    )
}