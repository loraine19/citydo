import { Tabs } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useUxStore } from "../../../../application/stores/ux.store";
import { TabLabel, SortLabel } from "../../../../domain/entities/frontEntities";
import { SortButton } from "../SortBtn";


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
        <div className="!relative w-full flex items-center justify-between gap-x-1 " style={{ zIndex: 0 }}>
            <Tabs value={defaultTab as string || labels[0].value}
                className="w-full !z-10  max-w-[100vw] ">
                <Tabs.List
                    className="w-full !flex flex-1 !gap-1 !px-0 to !bg-transparent ">
                    {labels.map(({ label, value, result }, index: number) => (
                        <Tabs.Trigger
                            key={index}
                            value={value}
                            className={` font-roboto !capitalize !flex-1 whitespace-nowrap rounded-full  !h-[2.2rem] !px-3 
                                ${index !== indexSelected ?
                                    ` InputDiv ${color}Style border` :
                                    ` ${color}StyleInv animSlide shadSm `} `}
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
