import { useNavigate } from "react-router-dom";
import { ServiceStep, ServiceType, ServiceUpdate } from "../../../../../domain/entities/Service";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { Icon } from "../../../common/IconComp";
import { Action } from "../../../../../domain/entities/frontEntities";
import { useUserStore } from "../../../../../application/stores/user.store";
import DI from "../../../../../di/ioc";
import { GenereMyActions, getEnumVal, isLate } from "../../../../views/viewsEntities/utilsService";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";
import { ProfileDiv } from "../../../common/ProfilDiv";
import Chip from "../../../common/adaptatersComps/Chip";
import { CardMD } from "../../base/baseComps/Cards";
import { MoreButton } from "../../../common/moreBtn";
import { Md3Colors } from "../../base/baseComps/Buttons";
import { GroupLink } from "../../../common/GroupLink";
import { DateChip } from "../../../common/ChipDate";


type ServiceProps = { service: ServiceView, mines?: boolean, change: (e: React.MouseEvent<HTMLButtonElement>) => void, update?: () => void, compact?: boolean }
const ServiceCard: React.FC<ServiceProps> = ({ service, mines, change, update, compact }) => {
    const { user } = useUserStore()
    const { id, title, image, createdAt, User, mine, IResp, points, typeS, categoryS, statusS, Group } = service
    const navigate = useNavigate();
    const statusSInt = getEnumVal(service.statusS, ServiceStep)
    const isLateValue = isLate(createdAt, 15) && statusSInt < 3
    const deleteService = async (id: number) => await DI.resolve('serviceUseCase').deleteService(id);
    const updateServiceStep = async (id: number, update: ServiceUpdate) => await DI.resolve('serviceUseCase').updateServiceStep(id, update);


    const statusColor = (step: ServiceStep): { color: string } => {
        switch (step) {
            case ServiceStep.STEP_1: return { color: "slate" };
            case ServiceStep.STEP_2: return { color: "slate" };
            case ServiceStep.STEP_3: return { color: "slate" };
            case ServiceStep.STEP_4: return { color: "error" };
            default: return { color: "green" };
        }
    }

    const myActions = [
        ...GenereMyActions(service, "service", deleteService, isLateValue),
        {
            iconImage: "sync_problem",
            title: `litige sur  `,
            body: `litige a `,
            function: () => navigate({ pathname: `/litige/create/${id}` }),
        }
    ];
    const takenCTA: Action[] = [
        {
            iconImage: "sync_problem",
            title: `litige sur ${title}`,
            body: `litige a ${title}`,
            function: () => navigate({ pathname: `/litige/create/${id}` }),
        },
        {
            iconImage: "person_cancel",
            title: `annuler ma réponse à ${title}`,
            body: `annuler ma réponse à ${title}`,
            function: async () => {
                const data = await updateServiceStep(id, ServiceUpdate.CANCEL_RESP);
                (data && update) && update()
            },
        },
        {
            iconImage: "groups",
            title: `Relancer ${title}`,
            body: ` Relancer ${title}`,
            function: () => { alert(`Voulez-vous relancer ${typeS} ${id} ?`) },
        },
    ]


    return (
        <CardMD
            autoFit={!compact}
            className={`min-h-full fade-in ${compact ? '' : ''} `}
            imagePosition="top"
            image={
                <CardMD.Image
                    onClick={() => navigate(`/service/${service?.id}`)}
                    src={image as string}
                    alt={title}
                    className=""
                >

                    <CardMD.Chips className={`w-full flex absolute justify-end gap-2 px-4 h-max`}>
                        <DateChip
                            start={service?.createdAt}
                            prefix=" "
                        />

                        {<MoreButton id={service?.id} type={'service'} flagged={service?.flagged} />}
                    </CardMD.Chips>
                </CardMD.Image>
            }>


            <CardMD.Chips className="overflow-x-auto ">

                <Chip
                    onClick={() => {
                        change(categoryS as any);
                    }}
                    color='sky'
                    value={`${categoryS}`}
                />

                <Chip
                    onClick={() => {
                        change(typeS as any);
                    }}
                    value={typeS}
                    color={typeS === ServiceType.GET ? "orange" : "green"}
                />

                <Chip
                    value={statusS}
                    color={statusColor(statusS as ServiceStep).color as Md3Colors}
                />

            </CardMD.Chips>
            <CardMD.Headline className="flex flex-row justify-between w-full ">
                <span className={`${!compact ? 'line-clamp-1' : 'line-clamp-2 '} "sm:line-clamp-2"`}>
                    {title}
                </span>
            </CardMD.Headline>

            <CardMD.Subhead className={`flex items-center gap-2`}>
                <GroupLink group={Group} />
            </CardMD.Subhead>

            <CardMD.SupportingText className={`flex  gap-3`}>
                <Icon

                    style='max-h-max'
                    icon="fiber_manual_record"
                    title={`Ce service ${service.typeS === ServiceType.GET ? 'vous fais gagner' : 'coute'} ${points.join(' à ')}pts`}
                    fill={user?.Profile?.points > points[0]}
                    color={service.typeS === ServiceType.GET ? "green" : "orange"}
                    size="md"
                />
                {` ${points.join(' à ')} pts`}

            </CardMD.SupportingText>



            <CardMD.Footer className="justify-between items-center flex max-h-max   w-full">

                {(!mines) && (
                    <ProfileDiv profile={User} date={createdAt} size='md' />
                )}

                {mine && mines && (
                    <ModifBtnStack
                        actions={myActions}
                        icon3={isLateValue}
                        update={update}
                        disabled1={statusSInt > 1}
                        disabled2={statusSInt > 1}
                    />
                )}
                {IResp && mines && (
                    <ModifBtnStack
                        actions={takenCTA}
                        disabled1={service.statusS !== ServiceStep.STEP_2}
                        disabled2={service.statusS !== ServiceStep.STEP_1}
                    />
                )}



            </CardMD.Footer>
        </CardMD>
    )
}
export default ServiceCard