import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { GenereMyActions } from "../../../../views/viewsEntities/utilsService";
import { DateChip } from "../../../common/ChipDate";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { GroupView } from "../../../../views/viewsEntities/GroupViewEntity";
import DI from "../../../../../di/ioc";
import { Icon } from "../../../common/IconComp";
import { Title } from "../../../common/CardTitle";
import AddressMapOpen from "../../../common/mapComps/AddressMapOpen";
import Chip from "../../../common/adaptatersComps/Chip";


type GroupCardProps = {
    group: GroupView, refetch?: () => void,
    mines?: boolean
}

export function GroupCard({ group: initialGroup, mines, refetch }: GroupCardProps) {
    const [group, setGroup] = useState<GroupView>(initialGroup);
    const { id, name, Address, createdAt } = group;
    const deletegroup = async (id: number) => await DI.resolve('deletegroupUseCase').execute(id)
    const actions = GenereMyActions(group, "groupe", deletegroup);
    const haveImage: boolean = true


    return (
        <Card className="FixCard w-respLarge">
            <CardHeader
                className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                floated={haveImage}>
                <div
                    className={`${haveImage ? "ChipDiv flex-col justify-between !h-full " : "ChipDivNoImage"}`}>
                    <div className="flex w-full justify-between items-center gap-2">
                        <button>
                            <Chip
                                size='sm'
                                value={'label'}
                                className="rounded-full h-max cyanChip shadow" />
                        </button>
                        <DateChip
                            start={createdAt}
                            prefix="creer le" />
                    </div>

                </div>
                {!Address ?
                    <img
                        src={'image/placeholder.jpg'}
                        onError={(e) => { e.currentTarget.src = '/image/placeholder.jpg'; }}
                        alt={name}
                        className="CardImage flex " /> :
                    <AddressMapOpen
                        color='#0092b8'
                        aera={group?.area}
                        address={Address} />}
            </CardHeader>
            <CardBody className="FixCardBody">
                <Title title={name ?? ''}
                    type='evenement'
                    subTitle={'⌖ ' + group?.fullAddress + ' - ' + group?.area + ', metres'}
                />
                <Typography className="leading-[1.3rem] pt-1 !line-clamp-2">
                    {group.rules}
                </Typography>
            </CardBody>
            <CardFooter className="CardFooter">
                {!mines ? (
                    <div className="flex w-full items-center gap-2">
                        <Chip
                            size='sm'
                            value={group?.categoryS}
                            className="cyanChip text-ellipsis  " >
                        </Chip>
                    </div>
                ) : (
                    <ModifBtnStack
                        disabled1={false}
                        disabled2={false}
                        actions={actions}
                        update={refetch} />
                )}
                <div className="flex items-center gap-2">
                    <button onClick={async () => {
                        const groupUpdated = group.toogleModo && await group?.toogleModo();
                        setGroup(groupUpdated)
                    }}>
                        <Chip
                            size='sm'
                            value={group?.ImModo ? '⠀✓' : '⠀'}
                            variant="ghost"
                            className="grayChip gap-2"
                            icon={
                                <Icon
                                    size="md"
                                    icon="diversity_3"
                                    fill={group?.ImModo}
                                    color={group?.ImModo ? "orange" : "gray"}
                                    title={group?.ImModo ? "Je suis conciliateur" : "Je ne suis pas conciliateur"} />} />
                    </button>
                    <button
                        onClick={async () => {
                            const groupUpdated = group.toogleModo && await group?.toogleModo();
                            setGroup(groupUpdated)
                        }}>
                        <Chip
                            size='sm'
                            value={group?.GroupUser?.length}
                            variant="ghost"
                            className="grayChip gap-2"
                            icon={
                                <Icon
                                    size="md"
                                    icon="groups"
                                    fill={group?.ImIn}
                                    color={group?.ImIn ? "cyan" : "gray"}
                                    title={group?.ImIn ? "Je suis membre" : "Je ne suis pas membre"} />} />
                    </button>
                    <Icon
                        icon="arrow_circle_right"
                        link={`/groupe/${id}`}
                        title={`voir les details de ${name}`}
                        bg clear
                        fill />
                </div>
            </CardFooter>
        </Card>
    );
}
