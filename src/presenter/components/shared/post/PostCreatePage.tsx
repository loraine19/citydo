import { useFormik } from 'formik';
import { object, string, array } from 'yup';
import { useNavigate } from 'react-router-dom';
import { Share } from '../../../../domain/entities/Post';;
import { PostFormCard } from './PostComps/PostForm';
import { PostDTO } from '../../../../infrastructure/DTOs/PostDTO';
import { PostView } from '../../../views/viewsEntities/postViewEntities';
import DI from '../../../../di/ioc';
import { TextLength } from '../../../../domain/entities/utilsEntity';
import { useAlertStore } from '../../../../application/stores/alert.store';
import { CardConfirmForm } from '../../common/CardConfirmForm';


export default function PostCreatePage() {
    const navigate = useNavigate();
    const postPost = async (data: PostDTO) => DI.resolve('postPostUseCase').execute(data);
    const { setOpen, setAlertValues, handleApiError } = useAlertStore(state => state);

    const formSchema = object({
        category: string().required("Categorie est obligatoire"),
        title: string().required("Le titre est obligatoire").min(5, "minmum 5 lettres"),
        description: string().required("Description est obligatoire").min(2, "minmum 2 lettres").max(TextLength.MAX_LONGTEXT, "le texte est trop long"),
        shareA: array().required("1 contact est obligatoire").min(1, "minmum 1 contact"),
        groupId: string().required("Groupe est obligatoire").notOneOf(["0"], "Groupe est obligatoire"),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {} as PostView,
        validationSchema: formSchema,
        onSubmit: values => {
            formik.values = values
            setOpen(true)
            setAlertValues({
                disableConfirm: false,
                handleConfirm: async () => await postFunction(),
                confirmString: "Enregistrer ",
                title: "Confimrer la création de l'annonce",
                element: (
                    <CardConfirmForm
                        title={values.title}
                        content={
                            <>
                                <div className='font-semibold'>Description:</div>
                                <div>{values.description}</div>
                                <div className='font-semibold'>Catégorie:</div>
                                <div>{values.categoryS}</div>
                                <div className='font-semibold'>Contact partagé(s):</div>
                                <div>{values.shareA.includes('EMAIL') && 'email' + ' '}{values.shareA.includes('PHONE') && 'telephone'}</div>

                            </>
                        }
                    />
                )
            })
        }
    });

    const postFunction = async () => {
        const shareArray = formik.values.shareA as string[];
        const share = shareArray.sort().join('_').toUpperCase() as unknown as Share;
        const dto = new PostDTO({ ...formik.values as PostDTO, share });
        try {
            const data = await postPost(dto)
            if (data?.id) navigate(`/annonce/${data?.id}`)
            else handleApiError("Erreur lors de la création de l'annonce");
        } catch (error) {
            handleApiError(error ?? "Erreur lors de la création de l'annonce");
        }
    }


    return (
        <PostFormCard formik={formik} />
    )
}