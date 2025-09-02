import { useLocation } from "react-router-dom"
import { Icon } from "./IconComp"
import { useUxStore } from "../../../application/stores/ux.store"

type SubHeaderProps = { type: string, qty?: (number | string), place?: any, closeBtn?: boolean, link?: string, image?: string, hideImage?: boolean }
export default function SubHeader({ type, qty, place, closeBtn, link, image, hideImage = true }: SubHeaderProps) {


    const { color, hideNavBottom, setHideNavBottom } = useUxStore((state) => state);
    let goBack = link ?? '/' + (new URLSearchParams(useLocation().pathname.split("/")[1])).toString().replace("=", '')

    const parentDiv = (document.querySelector('#root > div > main > section') as HTMLElement) ?? undefined

    const scrollToTop = () => {
        if (parentDiv) {
            parentDiv.scrollTo({ top: 0, behavior: 'smooth' });
            setHideNavBottom(false);
        }
    }

    return (
        <div className={`grid grid-cols-[1fr,auto] grid-rows-1 w-full h-full`}>
            <div className={`flex w-full  h-full pt-2 gap-x-2 justify-end lg:justify-between`}>
                <div className={`flex flex-col flex-1 w-full`}>
                    <h2 className={`!line-clamp-1 flex text-[1.2rem] pl-2 `}>
                        <span className={`capitalize `}>{qty} {type}</span>
                        <span className="hidden  sm:inline-block !lowercase !font-thin opacity-75">
                            &nbsp;   {place ?? "dans vos groupes"}
                        </span>
                    </h2>
                    <hr className={` !border-${color}-500 border-b-[1px] border-t-0 w-full pb-0.5`}></hr>
                </div>

                <div
                    className={`
                            relative z-[99]
                            ${hideImage ? '!w-0 !h-0 animRev ' : 'anim min-w-[8rem] w-[50%] lg:w-[30%] h-8 '}
                        `}
                >
                    <img
                        src={image ?? '/image/placeholder.jpg'}
                        alt={type}
                        className='absolute left-0 -top-1.5 h-[7rem] w-full object-cover rounded-2xl shadow-xl'
                    />
                </div>

            </div>
            <div className="flex w-full">
                {hideNavBottom &&
                    <Icon
                        style="scale-90 mt-1 ml-1"
                        icon="arrow_circle_up"
                        color={color ?? 'gray'}
                        size="2xl"
                        fill
                        onClick={() => scrollToTop()}
                        title="retour" />}
                {closeBtn &&
                    <Icon
                        style="scale-90 mt-1 ml-1"
                        icon="cancel"
                        color={color ?? 'gray'}
                        size="2xl"
                        fill
                        link={goBack}
                        title={"retour " + goBack?.replace("/", "")}
                    />}
            </div>
        </div>
    )
}