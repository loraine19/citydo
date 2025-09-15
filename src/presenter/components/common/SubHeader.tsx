import { useLocation } from "react-router-dom"
import { Icon } from "./IconComp"
import { useUxStore } from "../../../application/stores/ux.store"

type SubHeaderProps = { type: string, qty?: (number | string), place?: any, closeBtn?: boolean, link?: string, image?: string, hideImage?: boolean, form?: boolean }
export default function SubHeader({ type, qty, place, closeBtn, link, image, hideImage = true, form = false }: SubHeaderProps) {


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
        <div className={`flex flex-col py-1 relative -ml-4 h-full w-[calc(100%_+_2rem)] ]`}>
            {/* TITLE DIV  */}
            <div className={`flex w-full h-full px-4 flex-1  gap-x-2 justify-end lg:justify-between`}>
                {(!hideNavBottom || !navIcons) &&
                    <div className={`flex flex-1 h-full w-full items-center pl-12
                    ${hideImage ? '' : 'bg-white shadow-md rounded-3xl animRev mb-1 p-1 gap-2 border border-slate-400/40'}`}>
                        <div className={`${hideImage ? '!line-clamp-1 ' : '!line-clamp-3'}
                        ${closeBtn ? 'text-center pr-4 !pl-8 truncate' : ''} flex flex-1  md3-${color}-container max-w-max rounded-full py-1 px-8 `}>
                            <span className={`capitalize font-medium `}>{qty} {type}</span>
                            <span className="hidden sm:inline-block !lowercase !font-normal opacity-75">
                                &nbsp;{place ?? ""}
                            </span>
                        </div>
                        {image &&
                            <div className={`${hideImage ? 'hidden' : ' max-w-[50%]flex-1 w-max h-full'} `} >
                                <img src={image ?? '/image/placeholder.jpg'}
                                    alt={type}
                                    className='border border-slate-400/60 !max-h-[6rem] w-full object-cover rounded-2xl shadow'
                                />
                            </div>}
                    </div>}
                {/* BUTTON DIV  */}
                {(hideNavBottom) &&
                    <div className="absolute flex h-full w-full left-0"></div>}
                {(hideNavBottom && !form) &&
                    <div className={`${(hideNavBottom && !haveTitle) ? '-bottom-14 ' : '-bottom-14 '}flex flex-1 absolute z-[9999] right-0.5 `}>
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
                {closeBtn &&
                    <div className={`${(hideNavBottom && !haveTitle && !form) ? '-bottom-14 ' : 'top-0'} flex flex-1 absolute z-[9999]  left-1 `}>
                        <Icon
                            reverse={hideNavBottom && !haveTitle && !form}
                            style={'!shadow border-slate-900/10 '}
                            bg
                            icon={(hideNavBottom && !haveTitle) ? "close" : "arrow_back"}
                            color={color ?? 'gray'
                            }
                            size="2xl"
                            fill
                            link={goBack}
                            title={"retour " + goBack?.replace("/", "")}
                        />
                    </div>}



            </div>
            <hr className={`${!hideImage ? 'hidden' : ''} !border-${color}-500 border-b border-t-0 w-full !opacity-0 `} />
        </div>
    )
}