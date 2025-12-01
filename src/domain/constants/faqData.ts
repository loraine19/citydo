import { IconName } from "../../presenter/components/common/IconComp";
import { Md3Colors } from "../../presenter/components/shared/base/baseComps/Buttons";

export interface FaqItem {
    question: string;
    answer: string;
    icon: IconName;
}

export interface FaqSection {
    category: string;
    icon: IconName;
    color?: Md3Colors;
    items: FaqItem[];
}

export const faqData: FaqSection[] = [
    {
        category: "Gestion de Compte & Profil",
        icon: "person",
        color: 'secondary',
        items: [
            {
                question: "Comment m'inscrire et rejoindre mon quartier ?",
                answer: "L'inscription se fait par email. Une fois inscrit, vous rejoignez la communauté de votre résidence ou village pour interagir avec vos voisins.",
                icon: "person_add"
            },
            {
                question: "Puis-je modifier mes compétences après l'inscription ?",
                answer: "Oui, vous pouvez mettre à jour votre profil à tout moment pour ajouter de nouvelles compétences ou modifier votre niveau d'assistance proposé.",
                icon: "manage_accounts" // [cite: 216]
            },
            {
                question: "Que faire en cas d'oubli de mot de passe ?",
                answer: "Une procédure de réinitialisation sécurisée est disponible via email pour définir un nouveau mot de passe.",
                icon: "lock_reset" // [cite: 212]
            },
            {
                question: "Comment supprimer mon compte ?",
                answer: "Vous pouvez supprimer votre compte et toutes vos données personnelles définitivement depuis les paramètres de votre profil.",
                icon: "no_accounts" // [cite: 219]
            }
        ]
    },
    {
        category: "Géolocalisation & Carte",
        icon: "map",
        color: 'green',
        items: [
            {
                question: "Mon adresse exacte est-elle visible ?",
                answer: "Vous avez le contrôle. Vous pouvez choisir de partager votre adresse ou non. L'application utilise la géolocalisation pour afficher les services et événements à proximité.",
                icon: "share_location" // [cite: 216, 759]
            },
            {
                question: "Comment voir ce qui se passe autour de moi ?",
                answer: "Le Tableau de Bord intègre une carte interactive qui affiche les nouveaux services et événements localisés dans votre quartier.",
                icon: "map" // [cite: 223, 757]
            },
            {
                question: "L'application propose-t-elle un guidage ?",
                answer: "Oui, les cartes intègrent des fonctionnalités permettant de localiser précisément un événement ou un service.",
                icon: "near_me" // [cite: 761]
            }
        ]
    },
    {
        category: "Services & Points",
        icon: "partner_exchange",
        color: 'sky',
        items: [
            {
                question: "Comment sont calculés les points d'un service ?",
                answer: "Le calcul prend en compte une base fixe (1 point) + des coefficients liés au niveau de compétence, à la pénibilité et à l'assistance requise.",
                icon: "toll" // [cite: 238, 240]
            },
            {
                question: "Que faire si mon service ne trouve pas preneur ?",
                answer: "Vous pouvez utiliser la fonction 'Booster' pour renvoyer une notification aux habitants et remonter votre demande.",
                icon: "rocket_launch" // [cite: 242]
            },
            {
                question: "Comment résoudre un litige sur un service ?",
                answer: "En cas de désaccord, vous pouvez déclencher une 'Conciliation'. Chaque partie choisit un conciliateur parmi les membres pour répartir les points équitablement.",
                icon: "gavel" // [cite: 243, 292]
            }
        ]
    },
    {
        category: "Événements & Agenda",
        icon: "event",
        color: 'cyan',
        items: [
            {
                question: "Pourquoi mon événement est-il en attente ?",
                answer: "Un événement n'est validé et visible de tous que lorsque le nombre minimum de participants (que vous avez défini) est atteint.",
                icon: "hourglass_bottom" // [cite: 254]
            },
            {
                question: "Puis-je ajouter un événement à mon agenda personnel ?",
                answer: "Oui, un bouton dédié vous permet d'exporter directement un événement City'Zen vers votre Google Agenda.",
                icon: "calendar_month" // [cite: 258]
            },
            {
                question: "Comment suivre les événements à venir ?",
                answer: "Le tableau de bord dispose d'un calendrier interactif récapitulant toutes les activités validées du quartier.",
                icon: "event" // [cite: 224]
            }
        ]
    },
    {
        category: "Votes (Sondages & Cagnottes)",
        icon: "how_to_vote",
        color: 'orange',
        items: [
            {
                question: "Comment une cagnotte est-elle validée ?",
                answer: "Pour qu'une cagnotte soit débloquée (crédit de points), elle doit obtenir 51% de votes favorables de la part des inscrits du quartier.",
                icon: "savings" // [cite: 282]
            },
            {
                question: "Quelle est la durée d'un sondage ?",
                answer: "Les sondages et cagnottes restent ouverts 15 jours. Si le quorum n'est pas atteint passé ce délai, ils sont considérés comme non approuvés.",
                icon: "timer" // [cite: 276]
            },
            {
                question: "À quoi servent les sondages ?",
                answer: "Ils permettent de prendre des décisions collectives pour la gestion du quartier ou l'organisation de la vie commune.",
                icon: "how_to_vote" // [cite: 274]
            }
        ]
    },
    {
        category: "Annonces & Messagerie",
        icon: 'dashboard',
        color: 'rose',
        items: [
            {
                question: "Que peut-on poster dans les annonces ?",
                answer: "Cette section sert aux prêts/dons d'objets, aux objets perdus/trouvés ou au partage d'informations générales.",
                icon: "campaign" // [cite: 264]
            },
            {
                question: "Comment mettre en avant une annonce ?",
                answer: "Les utilisateurs peuvent 'Aimer' une annonce, ce qui améliore sa visibilité dans le fil d'actualité.",
                icon: "favorite" // [cite: 268]
            },
            {
                question: "Puis-je discuter en privé avec un voisin ?",
                answer: "Oui, une messagerie instantanée privée avec historique est intégrée pour faciliter les échanges entre habitants.",
                icon: "chat" // [cite: 302]
            }
        ]
    },
    {
        category: "Modération & Sécurité",
        icon: "support_agent",
        color: 'error',
        items: [
            {
                question: "Comment fonctionne la modération ?",
                answer: "La modération est collaborative. Si un contenu reçoit 3 signalements (flags) cohérents, il est automatiquement supprimé par le système.",
                icon: "report" // [cite: 308]
            },
            {
                question: "Qu'est-ce qu'un Conciliateur ?",
                answer: "C'est un habitant volontaire (rôle activable dans le profil) qui aide à résoudre les conflits liés aux échanges de services.",
                icon: "support_agent" // [cite: 206]
            }
        ]
    }
];