import { Icon } from "./IconComp";
import { Typography } from "@material-tailwind/react";
import { GroupLink } from "./GroupLink";
import { Group } from "../../../domain/entities/Group";

/// Button to flag usable in any component
export function FlagIcon(props: { flagged: boolean, id: number, type: string }) {
    const { flagged, id, type } = props;
    const to = `/flag${flagged ? '/edit' : ''}/${type}/${id}`
    return (
        <Icon
            bg clear
            icon="flag_2"
            link={to}
            color={flagged ? 'red' : 'gray'}
            fill={flagged} size="md"
            title={"signaler " + type}
            style="hover:!bg-red-500/30 hover:text-red-700 pb-1 pt-1" />
    )
}
export function Title(props: { title: string, flagged?: boolean, id?: number, CreatedAt?: string | Date, subTitle?: string, type?: string, group?: Group, }) {
    const { flagged, id, CreatedAt, subTitle, type, group, title } = props

    return (
        <div className="min-h-max pt-1.5">
            <div className="flex items-center w-full justify-between gap-2">
                <div className="flex items-center gap-4 !max-w-[calc(100%-1.5rem)] w-full">
                    <Typography
                        id={title}
                        as="h6"
                        className="w-full flex !line-clamp-1 leading-[1] pt-1"
                        title={title}>
                        {title}
                    </Typography>
                    {CreatedAt &&
                        <span className="hidden lg:flex text-xs text-gray-500 italic">{new Date(CreatedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}</span>}
                </div>
                {id &&
                    <FlagIcon
                        flagged={flagged ? true : false}
                        id={id}
                        type={type ?? ''} />
                }
            </div>
            {subTitle &&
                <div className="flex  flex-col justify-between pr-1">
                    <Typography
                        variant="small"
                        className="truncate font-normal">
                        {subTitle}
                    </Typography>
                    {group &&
                        <GroupLink group={group ?? {} as Group} />}
                </div>}
            {group && !subTitle &&

                <GroupLink group={group ?? {} as Group} />}
        </div>)
}