import { useState, useRef } from "react";
import { DateChip } from "../../../common/ChipDate";
import { Icon } from "../../../common/IconComp";
import { GroupView } from "../../../../views/viewsEntities/GroupViewEntity";
import AddressMapOpen from "../../../common/mapComps/AddressMapOpen";
import { Action, Label } from "../../../../../domain/entities/frontEntities";
import { useAlertStore } from "../../../../../application/stores/alert.store";
import { AlertValues } from "../../../../../domain/entities/Error";
import Chip from "../../../common/adaptatersComps/Chip";
import { CardLarge } from "../../base/baseComps/Cards";
import { MoreButton } from "../../../common/moreBtn";
import { Role } from "../../../../../domain/entities/GroupUser";

type groupDetailCardProps = {
    group: GroupView,
    refetch: () => Promise<void>,
    actions: Action[],
    expand: boolean,
    setExpand: (expand: boolean) => void
};

export default function GroupDetailCard({ group: initGroup, refetch, expand, setExpand }: groupDetailCardProps) {
    const { setOpen, setAlertValues } = useAlertStore();
    const [group, setGroup] = useState<GroupView>(initGroup);
    const { name, categoryS, Address, createdAt, toogleMember, toogleModo } = group;
    const member = group?.GroupUser?.length;
    const modo = group?.GroupUser?.filter(gu => gu.role === 'MODO').length;
    const [dot, setDot] = useState<number>(0);
    const refMore = useRef(null);

    const infos: Label[] = [
        { label: 'Règlement', value: group?.rules },
        { label: 'Participants', value: `${member} membres dont ${modo} conciliateurs` }
    ];

    const toogleModoValues: AlertValues = {
        title: group?.ImModo ?
            "Voulez Vous quittez le rôle de conciliateur ?" :
            "Voulez Vous rejoindre le rôle de conciliateur ?",
        element: group?.ImModo ?
            `Vous ne serez plus conciliateur, vous ne pourrez plus gérer les conflits dans le groupe ${name}` :
            `Vous allez rejoindre le rôle de conciliateur, vous pourrez gérer les conflits dans le groupe ${name}`,
        handleConfirm: async () => {
            const data = await toogleModo();
            if (data) {
                setGroup(data);
                await refetch();
                setOpen(false);
            }
        },
    };

    const toogleMemberValues: AlertValues = {
        title: group?.ImIn ?
            "Voulez Vous quittez le groupe?" :
            "Voulez Vous rejoindre le groupe ?",
        element: group?.ImModo ?
            `Vous ne serez plus membre, vous ne pourrez plus intervenir dans le groupe ${name}` :
            `Vous allez rejoindre le groupe ${name}, vous pourrez intervenir dans le groupe`,
        handleConfirm: async () => {
            const data = await toogleMember();
            if (data) {
                setGroup(data);
                await refetch();
                setOpen(false);
            }
        },
    };

    return (
        <CardLarge
            expanded={expand}
            setExpanded={setExpand}
            image={
                <CardLarge.Image
                    src={'/image/placeholder.jpg'}
                    alt={name}
                    className="md3-card-large-image flex"
                > {Address && (
                    <div className="md3-slate-container grid inset-0 !min-h-[100%] flex-1 !max-h-[100%]  h-full">
                        <AddressMapOpen
                            address={Address}
                            message={`${Address?.address}, ${Address?.zipcode} ${Address?.city}`} />
                    </div>)}
                </CardLarge.Image>}
        >


            <CardLarge.Chips className="!relative !z-[3]">
                <div className="md3-card-chips w-full">
                    <Chip value={categoryS} color='cyan' />
                    <DateChip start={createdAt} prefix="publié le " />
                </div>
                <MoreButton
                    title={group?.name}
                    divRef={refMore}
                    ref
                    id={group?.id}
                    type={'groupe'}
                    flagged={false}
                />
            </CardLarge.Chips>

            <CardLarge.Headline>
                {name}
            </CardLarge.Headline>

            <CardLarge.Subhead>
                {group?.fullAddress} <br /> {group?.area} mètres
            </CardLarge.Subhead>
            <CardLarge.Divider />
            <CardLarge.Chips className='flex-col items-start'>
                <h6>Composition du groupe</h6>
                <div className="flex gap-2 flex-col ">
                    <Chip
                        onClick={() => {
                            setOpen(true);
                            setAlertValues(toogleModoValues);
                        }}
                        value={group?.GroupUser.filter(gu => gu.role === Role.MODO).length + ' conciliateurs' + (group?.ImModo ? '⠀✓' : '⠀')}
                        icon={
                            <Icon
                                size="md"
                                icon="diversity_3"
                                fill={group?.ImModo}
                                color={group?.ImModo ? "orange" : "gray"}
                                title={group?.ImModo ? "Je suis conciliateur" : "Je ne suis pas conciliateur"} />}
                    />
                    <Chip
                        onClick={() => {
                            setOpen(true);
                            setAlertValues(toogleMemberValues);
                        }}
                        value={group?.GroupUser?.length + ' membres' + (group?.ImIn ? '⠀✓' : '⠀')}
                        icon={
                            <Icon
                                size="md"
                                icon="groups"
                                fill={group?.ImIn}
                                color={group?.ImIn ? "cyan" : "gray"}
                                title={group?.ImIn ? "Je suis membre" : "Je ne suis pas membre"} />}
                    />
                </div>
            </CardLarge.Chips>
            <CardLarge.Divider />
            <CardLarge.SupportingText className="flex-0 gap-3 pb-8">


                <div className='w-full grid grid-cols-1 gap-x-4 grid-rows-1 overflow-x-hidden'>
                    <div className='flex overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2'>
                        {infos.map((info: Label, index: number) => (
                            <div key={index} className='gap-1 flex w-full flex-col pt-2 snap-center shrink-0 '>
                                <h6>
                                    {info.label} :
                                </h6>
                                <div className="overflow-auto ">
                                    {info.value}
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
                                        });
                                        setDot(index);
                                    }
                                }}
                                key={index}
                                className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${dot === index ? 'bg-cyan-700 scale-125' : 'bg-cyan-400 hover:scale-110'}`}>
                            </div>
                        ))}
                    </div>
                </div>

            </CardLarge.SupportingText>
        </CardLarge>
    );
}
