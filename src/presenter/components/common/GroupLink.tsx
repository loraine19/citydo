import { Icon } from "./IconComp"
import { GroupView } from "../../views/viewsEntities/GroupViewEntity"
import { groupCategories } from "../../constants"
import { Group } from "../../../domain/entities/Group"
import Chip from "./adaptatersComps/Chip"
import { Menu, MenuItem } from "../shared/base/baseComps/Menu"
import { useState } from "react"

type GroupDivProps = { group: GroupView | Group, className?: string, menuRef?: React.RefObject<HTMLDivElement> }
export const GroupLink: React.FC<GroupDivProps> = ({ group, className, menuRef }) => {
    const category: string = groupCategories.find(cat => cat.value === group?.category)?.label ?? 'Autre'
    const [open, setOpen] = useState(false);
    return (

        <Menu
            closeIcon={<></>}
            menuRef={menuRef}
            open={open}
            setOpen={setOpen}
            placement="center_end"
            className={`mt-6 ${className ?? ''}`}
            key={group?.id}
            trigger={
                <button className={`${className ?? ''} `}>
                    {group?.name}
                </button>

            }>
            <MenuItem
                trailingIcon={<Icon
                    bg clear
                    fill
                    size="sm"
                    link={`/groupe/${group?.id}`}
                    icon="arrow_forward_ios" />}>

                <h6>groupe : {group?.name}</h6>
                <p className="text-sm italic ">
                    {group?.Address?.address}, {group?.Address?.zipcode} {group?.Address?.city}
                </p>
                <Chip
                    key={category}
                    value={category}
                    size='sm'
                    className="Chip" >
                </Chip>
            </MenuItem>

        </Menu >
    )
}