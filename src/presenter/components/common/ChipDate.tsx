import { dayMS } from "../../../domain/entities/frontEntities";
import Chip from "./adaptatersComps/Chip";

export function DateChip(props: { start: Date | string, end?: Date | string, ended?: boolean, prefix?: string }) {
    const { start, end, prefix, ended } = props
    const now = new Date();
    const endDate: string = end && new Date(end).toLocaleDateString('fr-FR') || ''
    const endDays: number = Math.ceil(((new Date(end ? end : start).getTime()) - (now.getTime())) / dayMS)
    const dateClass = (() => {
        switch (true) {
            case endDays >= 14:
                return "GreenChip";
            case endDays >= 4 && endDays <= 7:
                return "OrangeChip";
            case endDays <= 4 && endDays >= 1:
                return "RedChip";
            default:
                return "GrayChip";
        }
    })();
    const value = (() => {
        switch (true) {
            case prefix && !ended && !end:
                return `${prefix} ${new Date(start).toLocaleDateString('fr-FR')}`;
            case ended:
                return `finis le ${endDate}`;
            case endDays > 4:
                return `${prefix} ${endDays} jours`;
            case endDays > 0:
                return `il reste ${endDays} jours`;
            case endDays === 0:
                return `aujourd'hui`;
            case endDays < 0:
                return `en cours`;
            default:
                return `${prefix} ${new Date(start).toLocaleDateString('fr-FR')}`;
        }
    })();
    return (
        <div className="">
            <Chip
                size="sm"
                value={value}
                className={`${dateClass} rounded-full w-max h-max lowercase shadow`}>
            </Chip>
        </div>
    )
}