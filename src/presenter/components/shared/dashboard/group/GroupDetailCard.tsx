import { Card, CardHeader, CardBody, Typography, CardFooter } from "@material-tailwind/react"
import { useState } from "react"
import { DateChip } from "../../../common/ChipDate"
import { Title } from "../../../common/CardTitle"
import { Icon } from "../../../common/IconComp"
import { GroupView } from "../../../../views/viewsEntities/GroupViewEntity"
import AddressMapOpen from "../../../common/mapComps/AddressMapOpen"
import ModifBtnStack from "../../../common/ModifBtnStack"
import { Action, Label } from "../../../../../domain/entities/frontEntities"
import { useAlertStore } from "../../../../../application/stores/alert.store"
import { AlertValues } from "../../../../../domain/entities/Error"
import Chip from "../../../common/adaptatersComps/Chip"

type groupDetailCardProps = {
    group: GroupView,
    mines?: boolean,
    refetch: () => Promise<void>,
    actions: Action[]
}
export default function GroupDetailCard({ group: initGroup, mines, refetch, actions }: groupDetailCardProps) {

    const { setOpen, setAlertValues } = useAlertStore()
    const [group, setGroup] = useState<GroupView>(initGroup)
    const { name, categoryS, Address, createdAt, toogleMember, toogleModo } = group
    const member = group?.GroupUser?.length
    const modo = group?.GroupUser?.filter(gu => gu.role === 'MODO').length

    //// MAP GROUP INFO
    const [infos] = useState<Label[]>(
        [{ label: 'Règlement', value: group?.rules },
        { label: 'Participants', value: `${member} membres dont ${modo} conciliateurs` }]
    )
    const [dot, setDot] = useState<number>(0)

    const toogleModoValues: AlertValues = {
        title: group?.ImModo ?
            "Voulez Vous quittez le rôle de conciliateur ?" :
            "Voulez Vous rejoindre le rôle de conciliateur ?",
        element: group?.ImModo ?
            `Vous ne serez plus conciliateur, vous ne pourrez plus gérer les conflits dans le groupe ${name}` :
            `Vous allez rejoindre le rôle de conciliateur, vous pourrez gérer les conflits dans le groupe ${name}`,
        handleConfirm: async () => {
            const data = await toogleModo()
            if (data) {
                setGroup(data)
                await refetch()
                setOpen(false)
            }
        },
    }

    const toogleMemberValues: AlertValues = {
        title: group?.ImIn ?
            "Voulez Vous quittez le groupe?" :
            "Voulez Vous rejoindre le groupe ?",
        element: group?.ImModo ?
            `Vous ne serez plus membre, vous ne pourrez plus intervenir dans le groupe ${name}` :
            `Vous allez rejoindre le groupe ${name}, vous pourrez intervenir dans le groupe`,
        handleConfirm: async () => {
            const data = await toogleMember()
            if (data) {
                setGroup(data)
                await refetch()
                setOpen(false)
            }
        },
    }

    return (

        <Card className="CardDetailGrid" >
            <CardHeader
                className={"DetailCardHeader"}
                floated={true}>
                <div className={"ChipDiv"}>
                    <Chip
                        size='sm'
                        value={categoryS}
                        className={'CyanChip'}>
                    </Chip>
                    <DateChip
                        start={createdAt}
                        prefix="publié le " />
                </div>
                {!Address ?
                    <img
                        src={'image/placeholder.jpg'}
                        onError={(e) => { e.currentTarget.src = '/image/placeholder.jpg'; }}
                        alt={name}
                        className="CardImage flex" /> :
                    <AddressMapOpen
                        color='#0092b8'
                        aera={group?.area}
                        address={Address} />}
            </CardHeader>
            <CardBody className="DetailCardBody">
                <Title
                    title={name ?? ''}
                    type='groupe'
                    subTitle={`⌖ ${group?.fullAddress}  - ${group?.area} mètres`}
                />
                <div className='h-full w-full grid grid-cols-1 gap-x-4 grid-rows-1 overflow-x-hidden'>
                    <div className='flex overflow-x-auto scrollbar-hide snap-x snap-mandatory'>
                        {infos.map((info: Label, index: number) => (
                            <div key={index}
                                className='gap-1 flex w-full h-full flex-col pt-2 snap-center shrink-0'>
                                <h6>
                                    {info.label} :
                                </h6>
                                <div className="overflow-auto">
                                    <Typography
                                        className=" leading-[1.3rem]   ">
                                        {info.value}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center gap-3 py-1'>
                        {infos.map((_, index) => (
                            <div
                                title={`Voir ${infos[index].label}`}
                                onClick={() => {
                                    const scrollContainer = document.querySelector('.scrollbar-hide');
                                    if (scrollContainer) {
                                        const scrollAmount = scrollContainer.clientWidth * index;
                                        scrollContainer.scrollTo({
                                            left: scrollAmount, behavior: 'smooth'
                                        })
                                        setDot(index);
                                    }
                                }}
                                key={index}
                                className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${dot === index ? 'bg-cyan-700 scale-125' : 'bg-cyan-400 hover:scale-110'}`}>
                            </div>
                        ))}
                    </div>
                </div>
            </CardBody>
            <CardFooter className="DetailCardFooter">
                {!mines ? (
                    <div className="flex w-full items-center gap-2 ">
                        <Chip
                            size='sm'
                            value={group?.categoryS}
                            className="CyanChip text-ellipsis  " >
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
                    <button
                        onClick={() => {
                            setOpen(true);
                            setAlertValues(toogleModoValues)
                        }}>
                        <Chip
                            size='sm'
                            value={group?.ImModo ? '⠀✓' : '⠀'}
                            variant="ghost"
                            className="rounded-full h-max  GrayChip flex items-center  !min-w-max "
                            icon={
                                <Icon
                                    size="md"
                                    icon="diversity_3"
                                    fill={group?.ImModo}
                                    color={group?.ImModo ? "orange" : "gray"}
                                    title={group?.ImModo ? "Je suis conciliateur" : "Je ne suis pas conciliateur"} />}
                        />
                    </button>
                    <button
                        onClick={() => {
                            setOpen(true);
                            setAlertValues(toogleMemberValues)
                        }}>
                        <Chip
                            size='sm'
                            value={group?.GroupUser?.length}
                            variant="ghost"
                            className="rounded-full GrayChip h-max flex items-center pl-6 !min-w-max "
                            icon={
                                <Icon
                                    size="md"
                                    icon="groups"
                                    fill={group?.ImIn}
                                    color={group?.ImIn ? "cyan" : "gray"}
                                    title={group?.ImIn ? "Je suis membre" : "Je ne suis pas membre"} />}
                        />
                    </button>
                </div>
            </CardFooter>
        </Card>
    )
}



