import { useNavigate } from "react-router-dom";
import { ServiceStep, ServiceType, ServiceUpdate } from "../../../../../domain/entities/Service";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { Icon } from "../../../common/IconComp";
import { DateChip } from "../../../common/ChipDate";
import { Action } from "../../../../../domain/entities/frontEntities";
import { useUserStore } from "../../../../../application/stores/user.store";
import DI from "../../../../../di/ioc";
import { GenereMyActions, getEnumVal, isLate } from "../../../../views/viewsEntities/utilsService";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { Title } from "../../../common/CardTitle";
import Chip from "../../../common/adaptatersComps/Chip";
import { CardMD } from "../../base/baseComps/Cards";
import { GroupLink } from "../../../common/GroupLink";


type ServiceProps = { service: ServiceView, mines?: boolean, change: (e: React.MouseEvent<HTMLButtonElement>) => void, update?: () => void, compact?: boolean }
const ServiceCard: React.FC<ServiceProps> = ({ service, mines, change, update, compact }) => {
    const { user } = useUserStore()
    const { id, title, description, image, createdAt, User, flagged, mine, IResp, points, typeS, categoryS, statusS, Group } = service
    const navigate = useNavigate();
    const statusSInt = getEnumVal(service.statusS, ServiceStep)
    const isLateValue = isLate(createdAt, 15) && statusSInt < 3
    const deleteService = async (id: number) => await DI.resolve('serviceUseCase').deleteService(id);
    const updateServiceStep = async (id: number, update: ServiceUpdate) => await DI.resolve('serviceUseCase').updateServiceStep(id, update);


    const statusColor = (step: ServiceStep): { color: string } => {
        switch (step) {
            case ServiceStep.STEP_1: return { color: "orangeChip" };
            case ServiceStep.STEP_2: return { color: "greenChip" };
            case ServiceStep.STEP_3: return { color: "grayChip" };
            case ServiceStep.STEP_4: return { color: "redChip" };
            default: return { color: "Chip" };
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
            autoFit={compact}
            className={` sm:h-[50vw] md:h-[55vh]  ${compact ? '' : 'h-[50vh]'} `}
            imagePosition="top"
            link={`/service/${id}`}
            image={
                <CardMD.Image
                    src={image as string || '/image/placeholder.jpg'}
                    alt={title}
                    className=""
                >

                    <div className="w-full flex flex-col sm:flex-row flex-wrap gap-2 overflow-hidden justify-between sm:h-max">
                        <div className="flex flex-col h-full  flex-1 sm:flex-row flex-wrap  gap-2">
                            <button
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    const cat = e.currentTarget.innerText.toLowerCase();
                                    change(cat as any);
                                }}>
                                <Chip
                                    size="sm"
                                    value={`${categoryS}`}
                                    className="rounded-full h-max truncate cyanChip shadow"
                                />
                            </button>
                            <button
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    const cat = e.currentTarget.innerText.toLowerCase();
                                    change(cat as any);
                                }}>
                                <Chip
                                    size="sm"
                                    value={typeS}
                                    className={`rounded-full h-max ${typeS === ServiceType.GET ? "orangeChip" : "greenChip"} shadow`}
                                />
                            </button>
                            <Chip
                                size="sm"
                                value={statusS}
                                className={`rounded-full h-max ${statusColor(statusS as ServiceStep).color} shadow`}
                            />
                        </div>
                        <div>
                            <DateChip
                                start={createdAt}
                                prefix="le"
                            /></div>
                    </div>
                </CardMD.Image>
            }
        >
            <CardMD.Headline className="min-h-[3.6rem]">
                <Title
                    title={title}
                    flagged={flagged}
                    type="service"
                />
            </CardMD.Headline>
            <CardMD.Subhead className="line-clamp-3">

                {Group && <GroupLink group={Group} />}
            </CardMD.Subhead>
            <CardMD.SupportingText className="line-clamp-2">

                {description}

            </CardMD.SupportingText>
            <CardMD.Footer className="justify-between items-center flex w-full">
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
                {!mines && (
                    <ProfileDiv profile={User} />
                )}
                <Chip
                    size="md"
                    value={`${points.join(' à ')} pts`}
                    className={`py-1 flex grayChip ${mines && 'hidden md:flex'}`}
                    icon={
                        <Icon
                            style="-mt-1"
                            icon="toll"
                            title={`Ce service ${service.typeS === ServiceType.GET ? 'vous fais gagner' : 'coute'} ${points.join(' à ')}pts`}
                            fill={user?.Profile?.points > points[0]}
                            color={service.typeS === ServiceType.GET ? "green" : "orange"}
                            size="lg"
                        />
                    }
                />

            </CardMD.Footer>
        </CardMD>
    )
}
export default ServiceCard