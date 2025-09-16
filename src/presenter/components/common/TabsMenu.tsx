import { SortLabel, TabLabel } from "../../../domain/entities/frontEntities";
import { SortButton } from "./SortBtn";
import { useUxStore } from "../../../application/stores/ux.store";
import { SegmentedButton } from "../shared/base/baseComps/ButtonSegmented";

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

    const { color } = useUxStore((state) => state);
    return (
        <div className="!relative w-full flex items-center  justify-between gap-x-1 !z-10"
            style={{ zIndex: 0 }}>

            <SegmentedButton
                options={labels}
                value={defaultTab as string || labels[0].value}
                onChange={() => { }}
                color={color as any}
                size="small"
            />
            {sortList &&
                <SortButton
                    action={action ?? (() => { })}
                    sortList={sortList}
                    setSelectedSort={setSelectedSort}
                    selectedSort={selectedSort ?? ''}
                    reverse={reverse ?? false}
                    setReverse={setReverse ?? (value => value)}
                />
            }
        </div>
    );
}
