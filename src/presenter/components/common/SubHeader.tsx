import { useLocation } from "react-router-dom"
import { Icon } from "./IconComp"
import { useUxStore } from "../../../application/stores/ux.store"

type SubHeaderProps = { type: string, qty?: (number | string), place?: any, closeBtn?: boolean, link?: string, form?: boolean }
export default function SubHeader({ type, qty, place, closeBtn, link, form = false }: SubHeaderProps) {


    const { color, hideNavBottom, setHideNavBottom, navIcons, haveTitle } = useUxStore((state) => state);
    let goBack = link ?? '/' + (new URLSearchParams(useLocation().pathname.split("/")[1])).toString().replace("=", '')

    const parentDiv = (document.querySelector('#root > div > main > section') as HTMLElement) ?? undefined

    const scrollToTop = () => {
        if (parentDiv) {
            parentDiv.scrollTo({ top: 0, behavior: 'smooth' });
            setHideNavBottom(false);
        }
    }

    return (
        <div className={`flex flex-col relative -ml-4  w-[calc(100%_+_2rem)] ]`}>
            {/* TITLE DIV  */}
            <div className={`flex w-full h-full px-4 flex-1  gap-x-2 justify-end lg:justify-between`}>
                {(!hideNavBottom || !navIcons) &&
                    <div className={`flex flex-1 h-full w-full items-center`}>
                        <div className={`text-center justify-center 
                        ${closeBtn ? ' truncate ' : ''} flex flex-1 md3-${color}-outlined h-[30px] rounded-full items-center`}>

                            {closeBtn &&
                                <div className={`${(hideNavBottom && !haveTitle && !form) ? '-bottom-14 absolute z-[9999]' : 'pl-2'} flex`}>
                                    <Icon
                                        reverse={hideNavBottom && !haveTitle && !form}
                                        style={(hideNavBottom && !haveTitle && !form) ? "shadow" : ""}
                                        bg={(hideNavBottom && !haveTitle && !form)}
                                        icon={(hideNavBottom && !haveTitle) ? "close" : "arrow_back"}
                                        color={color ?? 'slate'}
                                        size={(hideNavBottom && !haveTitle && !form) ? "2xl" : "lg"}
                                        fill
                                        link={goBack}
                                        title={"retour " + goBack?.replace("/", "")}
                                    />
                                </div>}
                            <div className="flex flex-1 justify-center items-center gap-x-1 px-2 py-1">
                                <span className={`capitalize font-normal`}>{qty} {type}</span>
                                <span className="hidden sm:inline-block !lowercase !font-normal opacity-75">
                                    &nbsp;{place ?? ""}
                                </span>
                            </div>
                        </div>
                    </div>}

                {/* BUTTON UP  */}
                {(hideNavBottom && !form) &&
                    <div className={`${(hideNavBottom && !haveTitle) ? '-bottom-14 ' : '-bottom-14 '} flex flex-1 absolute z-[9999] right-4 `}>
                        <Icon
                            key={type + 'top'}
                            style={'!shadow-lg'}
                            reverse
                            icon="vertical_align_top"
                            color={color ?? 'gray'}
                            size="2xl"
                            fill bg
                            onClick={() => scrollToTop()}
                            title="retour en haut" />
                    </div>}
            </div>
            <hr className={` !border-${color}-500 border-b border-t-0 w-full !opacity-0 `} />
        </div>
    )
}