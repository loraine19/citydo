import { useLocation } from "react-router-dom"
import { Icon } from "./IconComp"
import { Typography } from "@material-tailwind/react"
import { useUxStore } from "../../../application/stores/ux.store"

type SubHeaderProps = { type: string, qty?: (number | string), place?: any, closeBtn?: boolean, link?: string }
export default function SubHeader({ type, qty, place, closeBtn, link }: SubHeaderProps) {


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
        <div className={`flex w-full h-full `}>
            <div className={`flex flex-col w-full  h-full pt-1 gap-2 justify-end lg:justify-between`}>
                <Typography
                    as="h2"
                    className={`!line-clamp-1 flex capitalize text-[1.2rem] pl-2 flex-1 gap-2 w-full  `}>
                    {qty} {type}
                    <span className="hidden sm:inline-block flex-1 !font-thin opacity-75 ">
                        {place ?? " dans vos groupes"}
                    </span>

                </Typography>
                <hr className={`bg-${color}-500 opacity-35   pt-[1px] w-full `}></hr>
            </div>
            {hideNavBottom &&
                <Icon
                    style="scale-90 mt-1 ml-1"
                    icon="arrow_upward"
                    color={color ?? 'gray'}
                    size="sm"
                    bg
                    onClick={() => scrollToTop()}
                    title="retour" />}
            {closeBtn &&
                <Icon
                    style="scale-90 mt-1 ml-1"
                    icon="close"
                    color={color ?? 'gray'}
                    size="sm"
                    bg
                    link={goBack}
                    title={"retour " + goBack?.replace("/", "")}
                />}

        </div>
    )
}