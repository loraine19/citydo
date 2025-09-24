import { Icon } from "./IconComp"
import { GroupView } from "../../views/viewsEntities/GroupViewEntity"
import { groupCategories } from "../../constants"
import { Group } from "../../../domain/entities/Group"
import Chip from "./adaptatersComps/Chip"
import { Menu, MenuItem } from "../shared/base/baseComps/Menu"

type GroupDivProps = { group: GroupView | Group, className?: string, menuRef?: React.RefObject<HTMLDivElement> }
export const GroupLink: React.FC<GroupDivProps> = ({ group, className }) => {
    const category: string = groupCategories.find(cat => cat.value === group?.category)?.label ?? 'Autre'
    return (

        <Menu
            closeIcon={<></>}
            placement="top-right"
            className={` ${className ?? ''} ml-[30%] mr-[50%] `}
            key={group?.id}
            trigger={
                <div className={`${className ?? ''}  flex gap-2  max-w-full line-clamp-1 justify-start`}>
                    <Icon icon="groups" fill size="lg" />
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
                    <i className="text-xs italic truncate ">
                        {group?.Address?.address}, {group?.Address?.zipcode} {group?.Address?.city}
                    </i>
                    <Chip
                        key={category}
                        value={category} >
                    </Chip>
                </div>


            </MenuItem>


        </Menu >
    )
}