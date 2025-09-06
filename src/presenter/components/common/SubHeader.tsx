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
        <div className={`flex flex-col w-full h-full`}>
            {/* TITLE DIV  */}
            <div className={`flex w-full h-full  flex-1  gap-x-2 justify-end lg:justify-between`}>
                <div className={`flex flex-1 h-full w-full 
                    ${hideImage ? '' : 'bg-white shadow-md rounded-3xl animRev mb-1 p-1 gap-2 items-center  justify-center border border-slate-400/40'}`}>
                    <h2 className={`${hideImage ? '!line-clamp-1 pt-1' : '!line-clamp-3'} flex flex-1 !pl-2 `}>
                        <span className={`capitalize font-roboto font-medium `}>{qty} {type}</span>
                        <span className="hidden sm:inline-block !lowercase !font-light opacity-75">
                            &nbsp;{place ?? "dans vos groupes"}
                        </span>
                    </h2>
                    {image &&
                        <div className={`${hideImage ? 'hidden' : ' max-w-[50%]flex-1 w-max h-full'} `} >
                            <img src={image ?? '/image/placeholder.jpg'}
                                alt={type}
                                className='border border-slate-400/60 !max-h-[6rem] w-full object-cover rounded-2xl shadow'
                            />
                        </div>}
                </div>

                {/* BUTTON DIV  */}
                <div className="flex ">
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
            <hr className={`${!hideImage ? 'hidden' : 'pb-0.5'} !border-${color}-500 border-b-[1px] border-t-0 w-full !opacity-20 `} />
        </div>
    )
}