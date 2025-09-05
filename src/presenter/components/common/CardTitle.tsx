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
            style="hover:!text-red-500 bg-white " />
    )
}
export function Title(props: { title: string, flagged?: boolean, id?: number, CreatedAt?: string | Date, subTitle?: string, type?: string, group?: Group, large?: boolean }) {
    const { flagged, id, CreatedAt, subTitle, type, group, title, large } = props

    return (
        <div className="min-h-max relative gap-1 flex flex-col ">
            <div className="flex items-center w-full justify-between gap-2">
                <div className="flex flex-1 items-center gap-4 w-full">
                    <h4
                        id={title}
                        className={"w-full flex  " + (large ? "!line-clamp-2" : "!line-clamp-1")}
                        title={title}>
                        {title}
                    </h4>
                    {CreatedAt &&
                        <i className="hidden lg:flex pt-1 -mr-2">{new Date(CreatedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                        </i>}
                </div>
                {id &&
                    <div className="relative flex h-full w-max pt-1 pl-1">
                        <FlagIcon
                            flagged={flagged ? true : false}
                            id={id}
                            type={type ?? ''} />
                    </div>}
            </div>
            {(group || subTitle) &&
                <div className="grid flex-col   justify-between  ">
                    {subTitle &&
                        <i className="truncate   !text-base">
                            {subTitle}
                        </i>}
                    {group &&
                        <div className="truncate">
                            <GroupLink group={group ?? {} as Group} />
                        </div>}
                </div>}
        </div>)
}