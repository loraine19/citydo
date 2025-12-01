import { Flag } from "./Flag";
import { Group } from "./Group";
import { Like } from "./Like";
import { User } from "./User";

export enum Share {
    EMAIL,
    PHONE,
    EMAIL_PHONE
}

export enum PostCategory {
    CATEGORY_1 = "perdu-trouvé",
    CATEGORY_2 = "animaux",
    CATEGORY_3 = "à vendre",
    CATEGORY_4 = "je donne",
    CATEGORY_5 = "autre"
}
export const postCategory = Object.values(PostCategory).filter(category => typeof category === 'string');

export enum PostFilter {
    MINE = 'MINE',
    ILIKE = 'ILIKE',
}

export enum PostSort {
    CREATED_AT = 'CREATED_AT',
    USER = 'USER',
    TITLE = 'TITLE',
    LIKE = 'LIKE',

}

export interface PostFindParams {
    filter?: PostFilter;
    category?: PostCategory;
    sort?: PostSort;
    reverse?: boolean;
    search?: string;
    groupId?: string;
}

export class Post {
    error?: string;
    id: number = 0;
    User: User = {} as User;
    userId: number = 0;
    Group: Group = {} as Group;
    groupId: number = 0;
    image: string | File | Blob = '';
    title: string = '';
    description: string = '';
    category: PostCategory = PostCategory.CATEGORY_1;
    share: Share = Share.EMAIL;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    Likes: Like[] = [];
    Flags: Flag[] = [];
    constructor(data?: Partial<Post>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}

export type PostPage = { events: Post[], count: number };