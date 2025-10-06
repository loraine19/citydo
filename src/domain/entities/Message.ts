import { User } from "./User";


export class Message {
    id: number = 0;
    User: User = {} as User;
    userId: number = 0
    UserRec: User = {} as User;
    userIdRec: number = 0
    message: string = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    read: boolean = false;
    unreadCount?: number = 0;
    constructor(data?: Partial<Message>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}


export type MessagePage = {
    messages: Message[],
    count: number
}
