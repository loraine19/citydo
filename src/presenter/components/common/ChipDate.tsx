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
                return "green";
            case endDays >= 4 && endDays <= 7:
                return "orange";
            case endDays <= 4 && endDays >= 1:
                return "error";
            default:
                return "primary";
        }
    })();
    const value = (() => {
        switch (true) {
            case prefix && !ended && !end:
                return `${prefix} ${new Date(start).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}`;
            case ended:
                return `⛌ ${new Date(endDate).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}`;
            case endDays > 9:
                return null;
            case endDays > 0:
                return `J - ${endDays}`;
            case endDays === 0:
                return `aujourd'hui`;
            case endDays < 0:
                return `en cours`;
            default:
                return `${prefix} ${new Date(start).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}`;
        }
    })();
    if (!value) return null;
    return (
        <div className="max-h-max opacity-80 ">
            {value && <Chip
                value={value}
                color={dateClass}>
            </Chip>}
        </div>
    )
}