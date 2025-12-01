//import { getEnumLabel } from "../../infrastructure/services/utilsService";
import { EventView } from "../../presenter/views/viewsEntities/eventViewEntities";
import { Address } from "./Address";
import { Flag } from "./Flag";
import { Group } from "./Group";
import { Participant } from "./Participant";
import { User } from "./User";

export enum EventCategory {
    CATEGORY_1 = 'sport',
    CATEGORY_2 = 'social',
    CATEGORY_3 = 'culturelle',
    CATEGORY_4 = 'musique',
    CATEGORY_5 = 'autre',
}

export enum EventFilter {
    MINE = 'MINE',
    IGO = 'IGO',
    VALIDATED = 'VALIDATE'
}

export enum EventStatus {
    PENDING = 'PENDING',
    VALIDATED = 'VALIDATED',
    REJECTED = 'REJECTED'
}

export enum EventSort {
    CREATED_AT = 'CREATED_AT',
    INDAYS = 'INDAYS',
    PARTICIPANTS = 'PARTICIPANTS',
    AZ = 'AZ',
}

export interface EventFindParams {
    mine?: boolean;
    filter?: EventFilter;
    step?: EventStatus
    category?: EventCategory;
    groupId?: string;
    sort?: EventSort;
    reverse?: boolean;
    search?: string;
}

export class Event {
    Address: Address = {} as Address;
    Flags?: Flag[] = [];
    Participants: Participant[] = [];
    User: User = {} as User;
    addressId: number = 0;
    category: EventCategory | string = EventCategory.CATEGORY_1;
    createdAt: Date = new Date();
    description: string = '';
    end: Date | string = new Date();
    id: number = 0;
    image: string | File = '';
    participantsMin: number = 0;
    start: Date | string = new Date();
    title: string = '';
    updatedAt: Date = new Date();
    userId: number = 0;
    status: EventStatus = EventStatus.PENDING;
    Group: Group = {} as Group;
    groupId: number = 0;
    constructor(init?: Partial<Event>) {
        if (init) {
            Object.keys(init).forEach(key => {
                if (key in this) {
                    (this as any)[key] = init[key as keyof Event];
                }
            });
        }
    }
}

export type EventPage = { events: Event[], count: number };

export type EventViewPage = { events: EventView[], count: number };

export type EventFethOption = {
    page?: number, filter?: string, category?: string, sort?: string, reverse?: boolean
}
