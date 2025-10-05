import { dayMS } from "../../../domain/entities/frontEntities";
import Chip from "./adaptatersComps/Chip";
import { Icon, IconName } from "./IconComp";

export function DateChip({ start, end, prefix, ended, size }: { start: Date | string, end?: Date | string, ended?: boolean, prefix?: string, size?: 'small' | 'medium' | 'large' }) {
    const now = new Date();
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
    let icon: IconName | undefined = undefined;
    const value = (() => {
        switch (true) {
            case prefix && !ended && !end:
                return `${prefix} ${new Date(start).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })} `;
            case ended:
                icon = 'cancel';
                return ` ${new Date(end ?? start).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}`;
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
        <div className="max-h-max ">
            {value &&
                <Chip
                    className={`${ended ? '!opacity-60' : ''}`}
                    icon={icon && <Icon icon={icon} size={'md'} />}
                    size={size || 'small'}
                    variant="tonal"
                    value={value}
                    color={dateClass}>
                </Chip>}
        </div>
    )
}