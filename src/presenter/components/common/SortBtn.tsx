import { Icon } from "./IconComp";
import { SortLabel } from "../../../domain/entities/frontEntities"
import { useUxStore } from "../../../application/stores/ux.store";
import { useState } from "react";
import { Menu, MenuItem } from "../shared/base/baseComps/Menu";

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

        <Menu
            key={'sort-menu' + color}
            className="!mt-6 !ml-6"
            open={isOpen}
            setOpen={setIsOpen}
            blurBack
            placement="bottom-left"
            title="Trier par"
            trigger={
                <Icon
                    color={color ?? 'slate'}
                    icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"}
                    size="2xl"
                />}>


            {sortList.map((item: SortLabel, index: number) =>
                <MenuItem
                    key={index}
                    data-cy={item.key ?? item.label}
                    onClick={() => {
                        action()
                        setSelectedSort(item.key ?? item.label)
                        setReverse(!reverse)
                        setIsOpen(!isOpen);
                    }}
                    trailingIcon={
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
                                    icon={reverse ? 'arrow_drop_up' : 'arrow_drop_down'} />}
                            <Icon
                                fill={selectedSort === (item.key ?? item.label)}
                                size={'lg'}
                                onClick={() => {
                                    action();
                                    setSelectedSort(item.key ?? item.label)
                                    setReverse(!reverse)
                                    setIsOpen(!isOpen);

                                }}
                                title={'Trier par ' + item.label}
                                disabled={(selectedSort === (item.key ?? item.label))}
                                color={selectedSort === (item.key ?? item.label) ? color : 'slate'}
                                icon={item.icon}
                            />
                        </div>} >
                    {item.label}


                </MenuItem>
            )}
        </Menu>
    )
}