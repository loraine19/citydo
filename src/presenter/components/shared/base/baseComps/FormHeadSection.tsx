import { useNavigate } from "react-router-dom";
import Chip from "../../../common/adaptatersComps/Chip";
import { Icon } from "../../../common/IconComp";
import NotifDiv from "../../../common/NotifDiv";
import { ReactNode } from "react";
import { useUxStore } from "../../../../../application/stores/ux.store";
import { Md3Colors } from "./Buttons";
import { Fab } from "./Fabs";



interface FormHeadSectionProps {
    infosChipValue?: string;
    showProps?: { show: boolean, setShow: (value: boolean) => void, text?: string, color?: Md3Colors };
    notif?: string;
    error?: string;
    isLoading?: boolean;
    refetch?: () => void;
    hidden?: boolean;
    children?: ReactNode;
}

const FormHeadSection: React.FC<FormHeadSectionProps> = ({
    infosChipValue,
    showProps,
    notif,
    error,
    isLoading,
    refetch,
    hidden = false,
    children

}) => {
    const navigate = useNavigate();

    const back = () => {
        let goBack = '/' + (new URLSearchParams(window.location.pathname.split("/")[1] ?? '').toString().replace("=", ''));
        // Check if there are params after "?" in the pathname
        let goBack2 = new URLSearchParams(window.location.search).toString().includes("=")
            ? window.location.pathname.split("/")[0]
            : null;
        if (goBack2) {
            navigate(goBack2);

        }
        else if (goBack && goBack !== window.location.pathname) {
            navigate(goBack);
        }

        else navigate('/');
    }

    const { hideNavBottom, setHideNavBottom, color } = useUxStore()
    const parentDiv = (document.querySelector('#root > div > main > section') as HTMLElement) ?? undefined

    const scrollToTop = () => {
        if (parentDiv) {
            parentDiv.scrollTo({ top: 0, behavior: 'smooth' });
            setHideNavBottom(false);
        }
    }

    return (
        <div className={`flex flex-col gap-2 z-[99]  w-full wRespXLMargin 
        ${hidden ? 'md3-menu-leave h-0.5' : 'md3-menu-enter p-2  '}`}>

            <div className="flex overflow-auto gap-2 justify-between w-full ">
                <div className="flex flex-wrap w-full gap-2">
                    <Chip
                        value={'retour '}
                        onClick={() => back()}
                        icon={
                            <Icon icon="arrow_back" size="md" />}
                        variant="outlined"
                        size="medium" />
                    {infosChipValue &&
                        <div className="flex-1 flex  w-full">
                            <Chip
                                variant="outlined"
                                size="medium"
                                value={infosChipValue} />
                        </div>}
                    {showProps &&
                        <Chip
                            color={showProps.color}
                            className=""
                            variant="outlined"
                            size="medium"
                            value={`${showProps.text ?? (showProps.show ? "Réduire" : "Voir plus")}`}
                            iconPlacement="start"
                            icon={
                                <Icon
                                    onClick={() => showProps.setShow(!showProps.show)}
                                    icon={!showProps.show ? "arrow_drop_down" : "arrow_drop_up"}
                                    size="2xl"
                                    fill
                                    title={showProps.show ? "reduire" : "voir "} />}

                        />}
                    {/* BUTTON UP  */}
                    {(hideNavBottom) &&
                        <div className={`  flex flex-1 absolute z-[2] right-0 top-6 `}>
                            <Fab
                                variant="elevated"
                                className="rounded-full"
                                color={color as Md3Colors ?? 'slate'}
                                size={'small'}
                                icon={{
                                    icon: "arrow_upward_alt",
                                    size: "xl",
                                    fill: true,
                                    onClick: () => scrollToTop()
                                }}
                            >
                            </Fab>
                        </div>}


                </div>
                {children}
            </div>
            {((notif || error) && !isLoading) &&
                <NotifDiv
                    error={error}
                    notif={notif ?? ''}
                    isLoading={isLoading ?? false}
                    refetch={refetch ?? window.location.reload}

                />
            }
        </div>
    );
}

export default FormHeadSection;