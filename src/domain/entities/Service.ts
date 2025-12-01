import { Address } from './Address';
import { User } from './User';
import { Flag } from './Flag';
import { Label } from './frontEntities';
import { getEnumLabel } from './utilsEntity';
import { Group } from './Group';

export enum ServiceType {
    GET = 'demande',
    DO = 'offre'
}
export const serviceType = Object.values(ServiceType).filter(type => typeof type === 'string');

export enum ServiceStep {
    STEP_0 = "nouveau",
    STEP_1 = "en attente",
    STEP_2 = "en cours",
    STEP_3 = "terminé",
    STEP_4 = "litige"
}

export const serviceSteps: Label[] = getEnumLabel(ServiceStep);


export enum SkillLevel {
    LEVEL_0 = '0',
    LEVEL_1 = '1',
    LEVEL_2 = '2',
    LEVEL_3 = '3',
    LEVEL_4 = '4'
}

export enum HardLevel {
    LEVEL_0 = '0',
    LEVEL_1 = '1',
    LEVEL_2 = '2',
    LEVEL_3 = '3',
    LEVEL_4 = '4'
}

export enum ServiceCategory {
    CATEGORY_1 = 'bricolage',
    CATEGORY_2 = 'cours',
    CATEGORY_3 = 'animaux',
    CATEGORY_4 = 'enfants',
    CATEGORY_5 = 'autre',
}

export enum ServiceSort {
    CREATED_AT = 'CREATED_AT',
    USER = 'USER',
    TITLE = 'TITLE',
    SKILL = 'SKILL',
    HARD = 'HARD',
}



export class Service {
    id: number = 0;
    description: string = '';
    address: Address = {} as Address;
    userId: number = 0;
    User: User = {} as User;
    image?: string | File = '';
    title: string = '';
    category: ServiceCategory = ServiceCategory.CATEGORY_1;
    userIdResp?: number = 0;
    UserResp?: User = {} as User;
    type: ServiceType = ServiceType.GET;
    skill: SkillLevel = SkillLevel.LEVEL_0;
    hard: HardLevel = HardLevel.LEVEL_0;
    status: ServiceStep = ServiceStep.STEP_0;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    Flags?: Flag[] = [{} as Flag];
    Group: Group = {} as Group;
    groupId: number = 0;
    constructor(data?: Partial<Service>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}




export class ServiceRespDTO {
    userIdResp?: number;
}

export enum ServiceUpdate {
    POST_RESP = 'POST_RESP',
    VALID_RESP = 'VALIDATE_RESP',
    CANCEL_RESP = 'CANCEL_RESP',
    FINISH = 'FINISH',
}

export enum ServiceFilter {
    GET = 'GET',
    DO = 'DO',
    MINE = 'MINE'
}

export enum ServiceStepFilter {
    STEP_0 = 'STEP_0',
    STEP_1 = 'STEP_1',
    STEP_2 = 'STEP_2',
    STEP_3 = 'STEP_3',
    STEP_4 = 'STEP_4'

}


export type ServicePage = {
    services: Service[],
    count: number
}

export interface ServiceFindParams {
    page?: number;
    mine?: boolean;
    type?: ServiceType;
    step?: ServiceStep;
    filter?: ServiceFilter;
    category?: ServiceCategory;
    sort?: ServiceSort;
    reverse?: boolean;
    search?: string;
    groupId?: string;
}

