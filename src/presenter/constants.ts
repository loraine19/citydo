import { EventCategory } from "../domain/entities/Event";
import { FlagReason } from "../domain/entities/Flag";
import { Label } from "../domain/entities/frontEntities";
import { SurveyCategory } from "../domain/entities/PoolSurvey";
import { PostCategory } from "../domain/entities/Post";
import { ServiceCategory, SkillLevel, HardLevel } from "../domain/entities/Service";

export const getEnumLabel = (enumArray: any, all?: boolean): Label[] => {
    const allLabel = { label: 'tous', value: '' }
    const array = [...Object.keys(enumArray).map(key => ({
        label: enumArray[key as keyof typeof enumArray],
        value: key,
    }))];
    all && array.unshift(allLabel as Label);
    return array
};

export const eventCategoriesS = getEnumLabel(EventCategory, true);
export const eventCategories = getEnumLabel(EventCategory);
export const flagReasons = getEnumLabel(FlagReason)
export const serviceCategoriesS: Label[] = getEnumLabel(ServiceCategory, true);
export const surveyCategories: Label[] = getEnumLabel(SurveyCategory);
export const serviceCategories: Label[] = getEnumLabel(ServiceCategory);
export const skillLevels: Label[] = getEnumLabel(SkillLevel);
export const hardLevels: Label[] = getEnumLabel(HardLevel);
export const postCategories: Label[] = getEnumLabel(PostCategory);

export enum PathElement {
    EVENT = 'evenement',
    SERVICE = 'service',
    POST = 'annonce',
    SURVEY = 'sondage',
    POOL = 'cagnotte',
    FLAG = 'signalement',
    ISSUE = 'conciliation',
    NOTIF = 'notification',
    VOTE = 'vote',
    PARTICIPANT = 'evenement',
    LIKE = 'annonce',
    MESSAGE = 'message',
}

export enum EventImage {
    CATEGORY_1 = "https://miro.medium.com/v2/resize:fit:828/format:webp/1*wWopwRHXQsuwUXAxwdShWw.png",
    CATEGORY_2 = "https://blog.nextdoor.com/wp-content/uploads/2020/01/nextdoorevent3-22-2018-287-1.jpg",
    CATEGORY_3 = "https://worldculturefest.org/wp-content/uploads/2023/06/Home_Carousel-3.jpg",
    CATEGORY_4 = "https://museum.toulouse-metropole.fr/wp-content/uploads/sites/6/2023/09/blob.png",
    CATEGORY_5 = "https://blog.collinsdictionary.com/wp-content/uploads/sites/39/2023/03/autre-blog.jpg",
    default = "https://images.squarespace-cdn.com/content/v1/53dd6676e4b0fedfbc26ea91/b5511a07-a9b9-4c65-aa14-474e3698b8f8/6254751079_46a4340650_h.jpg"
}