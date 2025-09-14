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
            className={`mt-6 ${className ?? ''} `}
            key={group?.id}
            fitMax
            trigger={
                <div className={`${className ?? ''} max-w-full line-clamp-1 justify-start`}>

                    {group?.name}
                </div>

            }>
            <MenuItem
                className="items-start"
                trailingIcon={<Icon
                    bg clear
                    fill
                    size="sm"
                    link={`/groupe/${group?.id}`}
                    icon="arrow_forward_ios" />}>

                <div className="whitespace-pre-line flex flex-col gap-2">
                    <h6>groupe : {group?.name}</h6>
                    <i className="text-xs italic ">
                        {group?.Address?.address}, {group?.Address?.zipcode} {group?.Address?.city}
                    </i>
                    <Chip
                        key={category}
                        value={category}
                        size='sm'
                        className="Chip" >
                    </Chip>
                </div>


            </MenuItem>


        </Menu >
    )
}