import Chip from "../../../common/adaptatersComps/Chip";
import { SortButton, SortButtonProps } from "../../../common/appComps/SortBtn";
import { ViewButton, ViewButtonProps } from "../../../common/appComps/ViewBtn";
import NotifDiv from "../../../common/NotifDiv";
import { ReactNode } from "react";


interface DetailsHeadSectionProps {
    infosChipValue?: string;
    sortBtnProps?: SortButtonProps;
    viewBtnProps?: ViewButtonProps;
    notif?: string;
    error?: string;
    isLoading?: boolean;
    refetch?: () => void;
    hidden?: boolean;
    children?: ReactNode;
}

const DetailsHeadSection: React.FC<DetailsHeadSectionProps> = ({
    infosChipValue,
    sortBtnProps,
    viewBtnProps,
    notif,
    error,
    isLoading,
    refetch,
    hidden = false,
    children

}) => {

    return (
        <div className={`flex flex-col gap-2 z-[99]  w-full wRespXLMargin
        ${hidden ? 'md3-animation-slide-out-up' : 'md3-animation-slide-down'}
        ${hidden ? ' h-0.5' : ' px-2 pt-4  '}`}>
            <div className="flex  gap-2 overflow-auto justify-between w-full ">
                <div className="flex gap-2">
                    {infosChipValue && <Chip
                        variant="outlined"
                        size="medium"
                        value={infosChipValue}
                    />}
                    {sortBtnProps && <Chip
                        className=""
                        variant="outlined"
                        size="medium"
                        value={`${sortBtnProps.sortList.find(v => v.key === sortBtnProps.selectedSort)?.label ?? "Trier"}`}
                        iconPlacement="end"
                        icon={
                            <SortButton
                                {...sortBtnProps}
                            />
                        }
                    />}
                </div>
                <div className="flex gap-2">
                    {viewBtnProps &&
                        <Chip
                            className=""
                            variant="outlined"
                            size="medium"
                            value={`${viewBtnProps.viewList.find(v => v.key === viewBtnProps.view)?.label ?? "Vue"}`}
                            iconPlacement="end"
                            icon={
                                <ViewButton
                                    {...viewBtnProps}
                                />
                            }
                        />}
                    {children}
                </div>

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

export default DetailsHeadSection;