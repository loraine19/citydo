import { EventView } from "../../presenter/views/viewsEntities/eventViewEntities";


//// for front only 
export class Action {
    icon?: string;
    iconImage?: string;
    title?: string;
    body?: string | Element | JSX.Element | Element[] | JSX.Element[];
    function?: () => void;
    color?: string;
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

export class SortLabel {
    key?: string = '';
    label: string = '';
    icon: string = '';
    action: () => void;
    reverse?: () => void;

    constructor(label: string, icon: string, action: () => void, reverse: () => void) {
        this.label = label;
        this.icon = icon;
        this.action = action;
        this.reverse = reverse
    }


}



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

