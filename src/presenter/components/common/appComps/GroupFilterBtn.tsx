import { Icon } from "../IconComp";
import { useUxStore } from "../../../../application/stores/ux.store";
import { useState } from "react";
import { Menu, MenuItem } from "../../shared/base/baseComps/Menu";

export type GroupFilterButtonProps = {
    setSelectedGroup: (value: string) => void,
    groupList: { name: string, id: string }[],
    selectedGroup?: string
}

export const GroupFilterButton = ({ setSelectedGroup, groupList, selectedGroup }: GroupFilterButtonProps) => {

    const { color } = useUxStore((state) => state);
    const [isOpen, setIsOpen] = useState(false);


    return (

        <Menu
            MenuKey={'sort-menu' + color}
            className=""
            open={isOpen}
            setOpen={setIsOpen}
            blurBack
            placement="bottom-left"
            title="filtrer par groupe"
            trigger={
                <Icon
                    style=''
                    color={color ?? 'slate'}
                    icon={selectedGroup === '' ? "group_search" : "group"}
                    size="lg"
                    fill
                />}>
            <MenuItem
                key={'all'}
                className={`gap-12 px-2`}
                data-cy={'all'}
                onClick={() => {
                    setSelectedGroup('')
                    setIsOpen(!isOpen);
                }} >
                {'Tous'}
            </MenuItem>
            {groupList.map((item: { name: string, id: string }, index: number) =>
                <MenuItem
                    key={index}
                    className={`gap-12 px-2`}
                    data-cy={item.id ?? item.name}
                    onClick={() => {
                        /* action()*/
                        setSelectedGroup(item.id ?? item.name)
                        setIsOpen(!isOpen);
                    }} >
                    {item.name}
                </MenuItem>
            )}
        </Menu>
    )
}