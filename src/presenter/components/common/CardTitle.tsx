import { Icon } from "./IconComp";
import { GroupLink } from "./GroupLink";
import { Group } from "../../../domain/entities/Group";

/// Button to flag usable in any component
export function FlagIcon(props: { flagged: boolean, id: number, type: string }) {
    const { flagged, id, type } = props;
    const to = `/flag${flagged ? '/edit' : ''}/${type}/${id}`
    return (
        <Icon
            icon="flag_2"
            link={to}
            color={flagged ? 'red' : 'gray'}
            fill={flagged} size="md"
            title={"signaler " + type}
            style="hover:!bg-red-500/30 hover:text-red-700 bg-white " />
    )
}
export function Title(props: { title: string, flagged?: boolean, id?: number, CreatedAt?: string | Date, subTitle?: string, type?: string, group?: Group, }) {
    const { flagged, id, CreatedAt, subTitle, type, group, title } = props

    return (
        <div className="min-h-max relative pt-1 gap-1 flex flex-col">
            <div className="flex items-center w-full justify-between gap-2">
                <div className="flex flex-1 py-1 items-center gap-4 w-full">
                    <h4
                        id={title}
                        className="w-full flex !line-clamp-1 "
                        title={title}>
                        {title}
                    </h4>
                    {CreatedAt &&
                        <i className="hidden lg:flex pt-1 -mr-2">{new Date(CreatedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                        </i>}
                </div>
                {id &&
                    <div className="relative flex h-full w-max ">   <FlagIcon
                        flagged={flagged ? true : false}
                        id={id}
                        type={type ?? ''} />
                    </div>}
            </div>
            {(group || subTitle) &&
                <div className="flex flex-col justify-between gap-1 ">
                    {subTitle &&
                        <h6 className="truncate">
                            {subTitle}
                        </h6>}
                    {group && <GroupLink group={group ?? {} as Group} />}
                </div>}
        </div>)
}