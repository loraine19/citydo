import { Icon } from "./IconComp";

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
export function Title(props: { title: string, large?: boolean }) {
    const { title } = props

    return (

        <h4
            id={title}
            className={"md3-headline"}
            title={title}>
            {title}
        </h4>
    )
}