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
        <div className={`flex flex-col relative border-t-0 w-[calc(100%_+_1.6rem)] -ml-[0.8rem] `}>
            <hr className={` border-black/20 border-b z-[1] border-t-0 w-[calc(100%_+_4rem)] -ml-[2rem]  !opacity-90 pb-2 shadow-md `} />
            {/* TITLE DIV  */}
            <div className={`flex w-full h-full px-[3rem]  bg-slate-200/90  flex-1 gap-x-2 justify-end lg:justify-between`}>
                {(!hideNavBottom || !navIcons) &&
                    <div className={`flex flex-1 h-full w-full items-center  
                        ${closeBtn ? 'truncate !justify-between pt-3 ' : 'pt-2 '}`}>

                        <div className="flex gap-x-1 !text-[1.5rem] text-slate-700">
                            <span className={`font-semibold`}>{qty} {type}</span>
                            <span className="hidden sm:inline-block !lowercase !font-light">
                                &nbsp;{place ?? ""}
                            </span>
                        </div>

                        {closeBtn &&
                            <div className={`${(hideNavBottom && !haveTitle && !form) ?
                                '-bottom-14 absolute z-[9999]' : 'pl-2'} flex`}>
                                <Icon
                                    reverse={hideNavBottom && !haveTitle && !form}
                                    style={(hideNavBottom && !haveTitle && !form) ? "shadow" : ""}
                                    bg={(hideNavBottom && !haveTitle && !form)}
                                    icon={"close"}
                                    color={'primary'}
                                    size={(hideNavBottom && !haveTitle && !form) ? "2xl" : "lg"}
                                    fill
                                    link={goBack}
                                    title={"retour " + goBack?.replace("/", "")}
                                />
                            </div>}

                    </div>}

                {/* BUTTON UP  */}
                {(hideNavBottom && !form) &&
                    <div className={`${(hideNavBottom && !haveTitle) ? '-bottom-14 ' : '-bottom-14 '} flex flex-1 absolute z-[9999] right-1 top-4 `}>
                        <Icon
                            key={type + 'top'}
                            style={'!shadow-lg'}
                            reverse
                            icon="vertical_align_top"
                            color={color ?? 'gray'}
                            size="3xl"
                            fill bg
                            onClick={() => scrollToTop()}
                            title="retour en haut" />
                    </div>}
            </div>

        </div>
    )
}