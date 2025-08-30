import { Popover, PopoverContent, PopoverTrigger, CardBody, Card, CardHeader } from "@material-tailwind/react"
import { Icon } from "./IconComp"
import { GroupView } from "../../views/viewsEntities/GroupViewEntity"
import { groupCategories } from "../../constants"
import { Group } from "../../../domain/entities/Group"
import Chip from "./adaptatersComps/Chip"

type GroupDivProps = { group: GroupView | Group }
export const GroupLink: React.FC<GroupDivProps> = ({ group }) => {
    const category: string = groupCategories.find(cat => cat.value === group?.category)?.label ?? 'Autre'

    return (<div className={`flex truncate items-center pb-0.5`}>
        <Popover
            offset={0}
            placement="bottom-start">
            <PopoverTrigger>
                <i className={' !line-clamp-1 '}>
                    ⌖ {group?.name}
                </i>
            </PopoverTrigger>

            <PopoverContent
                className="shadow-md border-none md:w-[40vw] md:max-w-[410px] max-w-[80vw] !p-0 z-50 flex gap-2 flex-col w-full "
            >
                <Card className="FixCard  w-full ">
                    <CardHeader className="FixCardHeaderNoImage !px-4 py-2 flex justify-between items-center ">
                        <h6>groupe : {group?.name}</h6>
                        <Icon
                            bg clear
                            fill
                            link={`/groupe/${group?.id}`}
                            icon="arrow_circle_right" />
                    </CardHeader>
                    <CardBody className="flex !pt-0 items-center gap-2 justify-between text-slate-600">
                        <p className="text-sm italic ">
                            {group?.Address?.address}, {group?.Address?.zipcode} {group?.Address?.city}
                        </p>
                        <Chip
                            key={category}
                            value={category}
                            size='sm'
                            className="GrayChip text-ellipsis scale-[0.8]" >
                        </Chip>
                    </CardBody>
                </Card>
            </PopoverContent>
        </Popover>
    </div>
    )
}