import { Profile } from './Profile'
import { GroupUser } from './GroupUser';

export enum UserStatus {
    ACTIVE,
    INACTIVE,
}

export class User {
    id: number = 0;
    email: string = '';
    Profile: Profile = {} as Profile;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    lastConnection: Date = new Date();
    status: UserStatus = UserStatus.INACTIVE;
    GroupUser: GroupUser[] = [{} as GroupUser];
    password: string = '';

    constructor(init?: User) {
        if (init) {
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof User];
                }
            });
        }
    }
}



