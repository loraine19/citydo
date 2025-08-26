import { Tabs } from "@material-tailwind/react";
import { SortLabel, TabLabel } from "../../../domain/entities/frontEntities";
import { useEffect, useState } from "react";
import { SortButton } from "./SortBtn";
import { useUxStore } from "../../../application/stores/ux.store";

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
    useEffect(() => {
        const tab = document.querySelector(`[data-value="${defaultTab as string}"]`) as HTMLElement
        tab && tab.click()
    }, [])

    const { color } = useUxStore((state) => state);
    const [indexSelected, setIndex] = useState<number>(0);
    return (
        <div className="flex relative items-center justify-between gap-x-1" style={{ zIndex: 0 }}>
            <Tabs value={defaultTab as string || labels[0].value}
                className="!z-10 !w-full max-w-100vh overflow-auto">

                <Tabs.List
                    className="w-full !flex flex-1 !gap-4 !px-0 mb-1 "
                    indicatorProps={{ className: `rounded-full bg-${color ?? 'gray'}-500` }}>
                    {labels.map(({ label, value, result }, index: number) => (
                        <Tabs.Trigger
                            key={index}
                            value={value}
                            className={`text-[0.9rem] !flex-1 whitespace-nowrap rounded-full shadow !px-3 ${index !== indexSelected ? `!bg-white ${color}Style ` : ` !text-white bg-${color}-500 animSlide`} `}
                            onClick={() => { setIndex(index); result() }}>
                            {label}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
            </Tabs>
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
