import { useNavigate } from "react-router-dom";
import { useAlertStore } from "../../../application/stores/alert.store";
import { Flag } from "../../../domain/entities/Flag";
import { Action, Label } from "../../../domain/entities/frontEntities";
import { Issue } from "../../../domain/entities/Issue";
import { notifCategory } from "../../../domain/entities/Notif";
import { Pool, Survey } from "../../../domain/entities/PoolSurvey";
import { Post, postCategory } from "../../../domain/entities/Post";
import { Service } from "../../../domain/entities/Service";
import { User } from "../../../domain/entities/User";
import { LikeApi } from "../../../infrastructure/providers/http/likeApi";
import { PostApi } from "../../../infrastructure/providers/http/postApi";
import { EventView } from "./eventViewEntities";
import { PoolSurveyView } from "./poolSurveyViewEntity";
import { GroupView } from "./GroupViewEntity";


export const dayMS = 24 * 60 * 60 * 1000



//// GET CATEGORI SERVICE 
export const isLate = (date: Date, days: number) => new Date(date) < new Date((new Date().getTime() - days * 24 * 60 * 60 * 1000))

///// Convert Date 
export const shortDateString = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric' })
}
export const toggleLike = async (postId: number, userId: number, setPost: any) => {
    const { getPostById } = new PostApi();
    const { postLike, deleteLike } = new LikeApi();
    const response = await getPostById(postId);
    const isLiked = response.Likes.find((like: any) => like.userId === userId) ? true : false;
    isLiked ? await deleteLike(postId) : await postLike({ userId: userId, postId: postId });
    setPost(await getPostById(postId));
}

export const formatDateForDB = (date: any) => (new Date(date).toISOString().slice(0, 16).replace('Z', '').split('.')[0]);

//
export const GenereMyActions = (element: Post | EventView | Service | Survey | Issue | Pool | Flag | GroupView | PoolSurveyView, type: string, deleteRoute: (id: number) => Promise<any>, icon3?: boolean): Action[] => {
    let title = ''
    let id = 0;
    const { setOpen, handleApiError } = useAlertStore(state => state)
    const navigate = useNavigate()
    if (!element) return [];

    'title' in element ? title = element?.title ?? 'litige' : 'litige';
    'serviceId' in element && (id = element?.serviceId);
    'targetId' in element && (id = element?.targetId);
    'id' in element && (id = element?.id);

    const actions = [
        {
            iconImage: 'delete',
            NoPrimary: true,
            icon: 'Supprimer ',
            title: "Confirmer la suppression",
            body: "Voulez-vous vraiment supprimer " + title + " ?",
            function: async () => {
                try {
                    const data = await deleteRoute(id);
                    data && (navigate(`/${type}`))
                } catch (error) {
                    handleApiError(error ?? "Erreur lors de la suppression de " + title)
                }
            }
        },
        {
            iconImage: 'edit',
            icon: 'Modifier',
            title: "Confirmer la modification",
            body: "Vous serez rediriger vers la page de modification de " + title,
            direct: true,
            function: () => {
                navigate(`/${type}/edit/${id}`);
                setOpen(false);
            },
        },

    ];
    icon3 && actions.length < 3 && actions.push({
        iconImage: 'groups',
        icon: 'Relancer',
        title: "Relancer " + title,
        body: "Relancer " + title,
        direct: false,
        function: () => { console.log(`Voulez-vous relancer ${title}?`) },
    })
    return actions
}

//// GENERE LABELS 
export const getEnumLabel = (enumArray: any, all?: boolean): Label[] => {
    const allLabel = { label: 'tous', value: '' }
    const array = [...Object.keys(enumArray).map(key => ({
        label: enumArray[key as keyof typeof enumArray],
        value: key,
    }))];
    all && array.unshift(allLabel as Label);
    return array
};


const generateLabels = (categories: string[], labels: string[]) => {
    return categories.map((category, index) => ({ value: category, label: labels[index] }));
};

const labelsPost = ["perdu-trouvé", "animaux", "à vendre", "je donne", "autre"];
export const postCategories = generateLabels(postCategory, labelsPost);


const labelsFlagTarget = ["evenement", "annonce", "sondage", "service"];
export const flagTargets = generateLabels(labelsFlagTarget, labelsFlagTarget);

const reasonsFlag = ["illicite", "haineux", "dangereux", "irrespecteux", "atteinte à la vie privé"]
export const flagReasons = generateLabels(reasonsFlag, reasonsFlag);


const labelsNotif = ['annonce', 'evenement', 'service', 'litige', 'sondage', 'cagnotte', 'flag']
export const notifCategories = generateLabels(notifCategory, labelsNotif);

export const getLabel = (value: string | any, array: Label[]): string => {
    const find = array.find((cat) => cat.value === value?.toUpperCase())
    return find ? find.label : ' - '
}
export const getValue = (label: string, array: Label[]): string => {
    const find = (array.find((cat) => cat.label === label)?.value)
    return find ? find : ''
}
export const getEnumVal = (element: any, enumArray: any) => Object.values(enumArray).indexOf(element);




export const generateContact = (user: User): string => {
    return `
        <br><span className="font-medium">${user?.Profile.firstName} </span>
        <br> par mail :<br>
        <a href="mailto:${user?.email}"className="text-orange-500 font-medium underline">${user?.email}</a>
        <br> ou télèphone :
        <br><a href="tel:${user?.Profile.phone}" className="text-orange-500 font-medium underline">${user?.Profile.phone}
        </a>
        <br>`;
}

export const generateDivObject = (element: any) => {
    return Object.entries(element).map(([key, value]) => (value && `<b>${key} </b>: ${typeof value === 'object' ? Object.entries(value).map(([key, subvalue]) => `${key} : ${subvalue}`).join('') : value}<br>`)).join('')
}





