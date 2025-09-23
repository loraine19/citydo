import { Icon, IconName } from "../IconComp";
import { SortLabel } from "../../../../domain/entities/frontEntities"
import { useUxStore } from "../../../../application/stores/ux.store";
import { useState } from "react";
import { Menu, MenuItem } from "../../shared/base/baseComps/Menu";

export type SortButtonProps = {
    sortList: SortLabel[],
    action: () => void,
    setSelectedSort: (value: any) => void,
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
            className=""
            open={isOpen}
            setOpen={setIsOpen}
            blurBack
            placement="bottom-left"
            title="Trier par"
            trigger={
                <Icon
                    style=''
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
                                        setIsOpen(false);
                                    }}
                                    color={color}
                                    title={'Trier par inverse ' + item.label}
                                    icon={reverse ? 'arrow_drop_up' : 'arrow_drop_down'} />}
                            <Icon
                                fill={selectedSort === (item.key ?? item.label)}
                                size={'lg'}
                                onClick={() => {
                                    setIsOpen(false);
                                    action();
                                    setSelectedSort(item.key ?? item.label)
                                    setReverse(!reverse)


                                }}
                                title={'Trier par ' + item.label}
                                disabled={(selectedSort === (item.key ?? item.label))}
                                color={selectedSort === (item.key ?? item.label) ? color : 'slate'}
                                icon={item.icon as IconName}
                            />
                        </div>} >
                    {item.label}
                </MenuItem>
            )}
        </Menu>
    )
}