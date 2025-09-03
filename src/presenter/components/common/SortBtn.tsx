import { Menu, MenuTrigger, MenuContent } from "@material-tailwind/react";
import { Icon } from "./IconComp";
import { SortLabel } from "../../../domain/entities/frontEntities"
import { useUxStore } from "../../../application/stores/ux.store";
import { useState } from "react";

type SortButtonProps = {
    sortList: SortLabel[],
    action: () => void,
    setSelectedSort: (value: string) => void,
    selectedSort: string
    reverse: boolean
    setReverse: (value: boolean) => void
}

export const SortButton = ({ sortList, setSelectedSort, selectedSort, reverse = false, setReverse, action }: SortButtonProps) => {

    const { color } = useUxStore((state) => state);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative flex justify-between items-center  ">
            <div className="flex items-center w-full h-full  gap-2">
                <Menu
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    placement="bottom-end">
                    <MenuTrigger className="relative z-auto h-max min-w-max flex items-center  cursor-pointer">
                        <div className="flex items-center relative">
                            <Icon
                                color={color ?? 'slate'}
                                icon="sort"
                                size="lg"
                            />
                        </div>
                    </MenuTrigger>
                    <MenuContent className="backdropBlur overflow-hidden bg-transparent m-auto !border-none shadow-none  flex rounded-2xl justify-end h-[calc(100%-110px)] wRespXL ">
                        <div className="p-4 h-max bg-white shadow-lg rounded-2xl border relative right-0 flex flex-col justify-start">
                            {sortList.map((item: SortLabel, index: number) =>
                                <div
                                    key={index}
                                    className="rounded-2xl pl-3 py-0 flex items-center font-normal justify-between gap-4 hover:!bg-white hover:!text-underline" >
                                    {item.label}
                                    <div className="flex items-center">
                                        {(selectedSort === (item.key ?? item.label)) &&
                                            <Icon
                                                onClick={() => {
                                                    action()
                                                    setSelectedSort(item.key ?? item.label)
                                                    setReverse(!reverse)
                                                    setIsOpen(!isOpen);
                                                }}
                                                color={color}
                                                title={'Trier par inverse ' + item.label}
                                                style="!p-0 -mr-1"
                                                icon={reverse ? 'arrow_drop_up' : 'arrow_drop_down'} />}
                                        <Icon
                                            fill={selectedSort === (item.key ?? item.label)}
                                            size={'lg'}
                                            style={`!p-1 `}
                                            onClick={() => {
                                                action();
                                                setSelectedSort(item.key ?? item.label)
                                                setReverse(!reverse)
                                                setIsOpen(!isOpen);

                                            }}
                                            title={'Trier par ' + item.label}
                                            disabled={(selectedSort === (item.key ?? item.label))}
                                            color={selectedSort === (item.key ?? item.label) ? color : 'gray'}
                                            icon={item.icon}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </MenuContent>
                </Menu>
            </div>
        </div >
    )
}