import { Icon } from "./IconComp"

type LoadMoreButtonProps = { handleScroll: () => void, hasNextPage: boolean, isBottom: boolean, color?: string, size?: string, style?: string, revers?: boolean }
export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ handleScroll, hasNextPage, isBottom, color = "slate", size = "3xl", style = 'mb-2', revers = false }) => {
    return (
        <div className={`absolute !w-full flex items-center justify-center left-0 
        ${revers ? 'top-6' : 'bottom-4'}`}>
            <Icon
                color={color}
                fill
                icon={revers ? "keyboard_double_arrow_up" : "keyboard_double_arrow_down"}
                size={size}
                title="voir plus"
                style={(isBottom && hasNextPage) ? `${style} animate-bounce` : "hidden"}
                onClick={handleScroll} />
        </div>

    )
}