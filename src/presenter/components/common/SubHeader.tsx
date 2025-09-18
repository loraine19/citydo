import { useLocation, useNavigate } from "react-router-dom"
import { useUxStore } from "../../../application/stores/ux.store"
import { Fab } from "../shared/base/baseComps/Fabs";
import { Md3Colors } from "../shared/base/baseComps/Buttons";

type SubHeaderProps = {
    type?: string,
    qty?: (number | string),
    place?: any,
    closeBtn?: boolean,
    link?: string,
    form?: boolean
}
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

    const navigate = useNavigate();

    return (
        <div className={`flex flex-col relative border-t-0 `}>

            {/* LINE DIV  */}
            <hr className={` border-black/20 border-b z-[1] border-t-0 w-[calc(100dvw)] left-0 fixed  !opacity-90 pb-2 shadow-md !pt-0 !-mt-2 `} />

            {/* TYPE DIV  */}

            <div className={`
                    ${((!hideNavBottom || !navIcons) && type) ? 'md3-menu-enter !py-1' : ' md3-menu-leave'}
                
                flex flex-1 h-full w-full px-[0rem] items-center absolute top-7  z-[1]`}>
                {closeBtn &&
                    <Fab
                        variant='filled'
                        color={color as Md3Colors ?? 'slate'}
                        className="rounded-full"
                        size='small'
                        onClick={() => {
                            if (closeBtn) {
                                navigate(-2)
                            }
                        }}
                        icon={closeBtn ? {
                            reverse: hideNavBottom && !haveTitle && !form,
                            style: (hideNavBottom && !haveTitle && !form) ? "shadow" : "",
                            icon: "arrow_back",
                            size: (hideNavBottom && !haveTitle && !form) ? "2xl" : "lg",
                            link: goBack,
                        } : undefined}>
                    </Fab>}
                <div className={`${closeBtn ? ' ml-4 w-full ' : ''} flex flex-1  items-center`}>
                    <Fab
                        className={`h-[40px] !text-[0.95rem] `}
                        color={color as Md3Colors ?? 'slate'}
                        size="extended"
                        variant='filled'
                        text={`${qty ?? ''} ${type ?? ''} ${place ? `à ${place}` : ''}`}

                    >
                    </Fab>
                </div>

            </div>

            {/* BUTTON UP  */}
            {(hideNavBottom && !form) &&
                <div className={`${(hideNavBottom && !haveTitle) ? '-bottom-14 ' : '-bottom-14 '} flex flex-1 absolute z-[2] right-2 top-4 `}>
                    <Fab
                        className="rounded-full"
                        color={color as Md3Colors ?? 'slate'}
                        size={'large'}
                        icon={{
                            icon: "arrow_upward_alt",
                            size: "3xl",
                            fill: true,
                            onClick: () => scrollToTop()
                        }}
                    >
                    </Fab>
                </div>}
        </div>

    )
}