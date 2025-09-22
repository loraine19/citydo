import { SortLabel, TabLabel } from "../../../../domain/entities/frontEntities";
import { SortButton } from "./SortBtn";
import { useUxStore } from "../../../../application/stores/ux.store";
import { Tabs } from "../../shared/base/baseComps/Tabs";
import { Md3Colors } from "../../shared/base/baseComps/Buttons";
import { Fab } from "../../shared/base/baseComps/Fabs";

type TabProps = {
    labels: TabLabel[];
    defaultTab?: string;
    sortList?: SortLabel[];
    setSelectedSort?: any
    selectedSort?: string;
    reverse?: boolean;
    setReverse?: (value: boolean) => void;
    action?: () => void;
}

export default function TabsMenu({ labels, defaultTab, sortList, setSelectedSort, selectedSort, reverse, setReverse, action }: TabProps) {



    const { hideNavBottom, setHideNavBottom, color } = useUxStore()

    const parentDiv = (document.querySelector('#root > div > main > section') as HTMLElement) ?? undefined

    const scrollToTop = () => {
        if (parentDiv) {
            parentDiv.scrollTo({ top: 0, behavior: 'smooth' });
            setHideNavBottom(false);
        }
    }
    return (
        <div className="wRespXLMargin relative flex items-center justify-between gap-x-1 ">

            {!hideNavBottom && <> <Tabs
                className=""
                options={labels}
                value={defaultTab as string || labels[0].value}
                onChange={() => { }}
                color={color as any}
                size="medium"
            />
                <div className="flex items-center ">   {sortList &&
                    <SortButton
                        action={action ?? (() => { })}
                        sortList={sortList}
                        setSelectedSort={setSelectedSort}
                        selectedSort={selectedSort ?? ''}
                        reverse={reverse ?? false}
                        setReverse={setReverse ?? (value => value)}
                    />
                }</div></>}

            {/* BUTTON UP  */}
            {(hideNavBottom) &&
                <div className={`  flex flex-1 absolute z-[2] right-2 top-4 `}>
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
    );
}
