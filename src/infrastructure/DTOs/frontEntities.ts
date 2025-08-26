import { JSX } from "react";
import { EventCategory } from "../../domain/entities/Event";
import { EventView } from "../../presenter/views/viewsEntities/eventViewEntities";


//// for front only 
export class Action {
    icon?: string;
    title?: string;
    body?: string | Element | JSX.Element | Element[] | JSX.Element[];
    function?: () => void;
}
export class Label {
    label: string = '';
    value: string | any = '';
}

export class TabLabel {
    label: string = '';
    value: string | any = '';
    result: any;
}



export class ModalValues {
    confirm: any;
    title: string = '';
    element: any = '';
}

export const defaultEventImage = [
    { type: "", image: "https://images.squarespace-cdn.com/content/v1/53dd6676e4b0fedfbc26ea91/b5511a07-a9b9-4c65-aa14-474e3698b8f8/6254751079_46a4340650_h.jpg" },
    { type: EventCategory.CATEGORY_1, image: "https://miro.medium.com/v2/resize:fit:828/format:webp/1*wWopwRHXQsuwUXAxwdShWw.png" },
    { type: EventCategory.CATEGORY_2, image: "https://blog.nextdoor.com/wp-content/uploads/2020/01/nextdoorevent3-22-2018-287-1.jpg" },
    { type: EventCategory.CATEGORY_3, image: "https://worldculturefest.org/wp-content/uploads/2023/06/Home_Carousel-3.jpg" },
    { type: EventCategory.CATEGORY_4, image: "https://museum.toulouse-metropole.fr/wp-content/uploads/sites/6/2023/09/blob.png" },
    { type: EventCategory.CATEGORY_5, image: "https://blog.collinsdictionary.com/wp-content/uploads/sites/39/2023/03/autre-blog.jpg" }
]


export const dayMS = 24 * 60 * 60 * 1000;

export type day = { date: Date, events: EventView[], text: String }


export class
    MessageBack {
    message: string;
    code?: number;

    constructor(message: string, code?: number) {
        this.message = message;
        this.code = code
    }
}

