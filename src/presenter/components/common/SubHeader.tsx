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
            <hr className={` z-[1] border-t-0 w-[calc(100dvw)] lg:-ml-[calc(50dvw-50%)] left-0 absolute pt-2 bg-slate-50 -mt-1 
               ${!hideNavBottom || !navIcons ? 'md3-elevation-1' : 'md3-elevation-2'}  `} />

            {/* TYPE DIV  */}

            <div
                style={{ transformOrigin: 'left' }}
                className={`
                    ${((!hideNavBottom || !navIcons)) ? `md3-fab-item-enter !py-1 ${!closeBtn ? '-ml-4' : '-ml-2'}` : ' md3-fab-item-leave'} ${closeBtn ? ' top-9 ' : 'top-7'}
                
                flex flex-1 h-full w-full px-[0rem] items-center absolute  z-[1]`}>
                {closeBtn &&
                    <Fab
                        variant='elevated'
                        color={color as Md3Colors ?? 'slate'}
                        className="rounded-full  min-w-[40px] "
                        size='small'
                        onClick={() => {
                            if (closeBtn) {
                                navigate(goBack);
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
                <div className={`${closeBtn ? ' w-full pr-16 ' : ''} flex flex-1 overflow-hidden items-center pl-4 py-4 `}>
                    <Fab
                        className={`h-[40px] !text-[0.95rem] pointer-events-none`}
                        color={color as Md3Colors ?? 'slate'}
                        size="extended"
                        variant='elevated'
                        text={<>
                            <span className="font-bold">{qty ?? ''} </span>
                            <span>{type ?? ''} </span>
                            <span className="font-light">{place ? `/  ${place}` : ''}</span>
                        </>}

                    >
                    </Fab>
                </div>

            </div>

            {/* BUTTON UP  */}
            {(hideNavBottom && !form) &&
                <div className={`${(hideNavBottom && !haveTitle) ? '-bottom-9 ' : '-bottom-9 '} flex flex-1 absolute z-[2] right-0 top-4 `}>
                    <Fab
                        variant="elevated"
                        className="rounded-full"
                        color={color as Md3Colors ?? 'slate'}
                        size={'medium'}
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