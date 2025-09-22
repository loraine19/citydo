import { useNavigate } from "react-router";
import Chip from "../../../common/adaptatersComps/Chip";
import { Icon } from "../../../common/IconComp";
import NotifDiv from "../../../common/NotifDiv";
import { ReactNode } from "react";
import { useUxStore } from "../../../../../application/stores/ux.store";
import { Md3Colors } from "./Buttons";
import { Fab } from "./Fabs";



interface FormHeadSectionProps {
    infosChipValue?: string;
    showProps?: { show: boolean, setShow: (value: boolean) => void };
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
        if (window.history.length > 1 && document.referrer && document.referrer !== window.location.href) {
            navigate(-1);
        } else {
            navigate('/');
        }
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
        <div className={`flex flex-col gap-2 z-[99]  w-full wRespXLMargin ${hidden ? 'md3-menu-leave h-0.5' : 'md3-menu-enter p-2  '}`}>
            <div className="flex overflow-auto gap-2 justify-between w-full ">
                <div className="flex flex-wrap w-full gap-2">
                    <Chip
                        value={'Retour'}
                        onClick={back}
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
                    {showProps && <Chip
                        className=""
                        variant="outlined"
                        size="medium"
                        value={`${showProps.show ? "Masquer" : "Afficher"} `}
                        iconPlacement="end"
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
            {notif || error &&

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