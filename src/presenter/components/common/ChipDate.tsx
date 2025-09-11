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
                return "greenChip";
            case endDays >= 4 && endDays <= 7:
                return "orangeChip";
            case endDays <= 4 && endDays >= 1:
                return "redChip";
            default:
                return "grayChip";
        }
    })();
    const value = (() => {
        switch (true) {
            case prefix && !ended && !end:
                return `${prefix} ${new Date(start).toLocaleDateString('fr-FR')}`;
            case ended:
                return `✓ ${endDate}`;
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
        <div className="max-h-max">
            <Chip
                size="sm"
                value={value}
                className={`${dateClass} rounded-full w-max h-max lowercase`}>
            </Chip>
        </div>
    )
}