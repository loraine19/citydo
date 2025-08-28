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
        <div className={`flex w-full  pt-2 gap-2 justify-end lg:justify-between`}>
            <Typography
                as="h3"
                className={`!line-clamp-1 leading-[1.1] text-[1.2rem] pl-2 flex-1  `}>
                {qty} {type}
                <span className=" !font-thin ">
                    {place ?? " à proximité"}
                </span>
                <hr className={`bg-${color}-500 opacity-35 mt-1  pt-[1px] w-full `}></hr>
            </Typography>
            {hideNavBottom &&
                <Icon
                    icon="arrow_upward"
                    color={color ?? 'gray'}
                    size="sm"
                    bg
                    onClick={() => scrollToTop()}
                    title="retour" />}
            {closeBtn &&
                <Icon
                    style="scale-90"
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