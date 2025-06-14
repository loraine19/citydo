import { Card, CardHeader, Typography, CardBody, CardFooter, Chip } from "@material-tailwind/react";
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


type ServiceProps = { service: ServiceView, mines?: boolean, change: (e: React.MouseEvent<HTMLButtonElement>) => void, update?: () => void }
const ServiceCard: React.FC<ServiceProps> = ({ service, mines, change, update }) => {
    const { user } = useUserStore()
    const { id, title, description, image, createdAt, User, flagged, mine, IResp, points, typeS, categoryS, statusS, Group } = service
    const haveImage = service.image ? true : false
    const navigate = useNavigate();
    const statusSInt = getEnumVal(service.statusS, ServiceStep)
    const isLateValue = isLate(createdAt, 15) && statusSInt < 3
    const deleteService = async (id: number) => await DI.resolve('serviceUseCase').deleteService(id);
    const updateServiceStep = async (id: number, update: ServiceUpdate) => await DI.resolve('serviceUseCase').updateServiceStep(id, update);


    const statusColor = (step: ServiceStep): { color: string } => {
        switch (step) {
            case ServiceStep.STEP_1: return { color: "OrangeChip" };
            case ServiceStep.STEP_2: return { color: "GreenChip" };
            case ServiceStep.STEP_3: return { color: "GrayChip" };
            case ServiceStep.STEP_4: return { color: "RedChip" };
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
        <>
            <Card className={haveImage ? "FixCard" : "FixCardNoImage"}>
                <CardHeader
                    className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                    floated={haveImage}>
                    <div className={haveImage ? "ChipDiv" : "ChipDivNoImage"}>
                        <div className="ChipSubDiv ">
                            <button
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    const cat = e.currentTarget.innerText.toLowerCase();
                                    change(cat as any)
                                }}>
                                <Chip
                                    size="sm"
                                    value={`${categoryS}`}
                                    className="CyanChip">
                                </Chip>
                            </button>
                            <button
                                onClick={(e: any) => {
                                    const cat = e.target.innerText.toLowerCase();
                                    change(cat)
                                }}>
                                <Chip
                                    size="sm"
                                    value={typeS}
                                    className={`${typeS === ServiceType.GET ? "OrangeChip" : "GreenChip"}`}>
                                </Chip>
                            </button>
                            <Chip
                                size="sm"
                                value={statusS}
                                className={statusColor(statusS as ServiceStep).color}>
                            </Chip>
                        </div>
                        <DateChip
                            start={createdAt}
                            prefix="le" />
                    </div>
                    {image &&
                        <img
                            onError={(e) => e.currentTarget.src = "/image/placeholder.jpg"}
                            src={image as any}
                            alt={title}
                            className="CardImage"
                        />
                    }
                </CardHeader>
                <CardBody className={` FixCardBody !flex-1`}>
                    <Title
                        title={title}
                        flagged={flagged} id={id}
                        type='service'
                        group={Group}
                    />
                    <div className="flex flex-col justify-between h-full overflow-auto">
                        <Typography
                            className="leading-[1.3rem] !line-clamp-2"
                            color="blue-gray">
                            {description}
                        </Typography>
                    </div>
                </CardBody>
                <CardFooter className="CardFooter">
                    {mine && mines &&
                        <ModifBtnStack
                            actions={myActions}
                            icon3={isLateValue}
                            update={update}
                            disabled1={statusSInt > 1}
                            disabled2={statusSInt > 1} />}
                    {IResp && mines &&
                        <ModifBtnStack
                            actions={takenCTA}
                            disabled1={service.statusS !== ServiceStep.STEP_2}
                            disabled2={service.statusS !== ServiceStep.STEP_1} />}
                    {!mines &&
                        <ProfileDiv
                            profile={User} />
                    }
                    <div className="flex items-center">
                        <Chip
                            size="md"
                            value={`${points.join(' à ')}   pts`}
                            className={` GrayChip lowercase !font-medium px-3.5 rounded-full ${mines && 'hidden md:flex'}`}
                            icon=
                            {<Icon
                                icon="toll"
                                title={`Ce service ${service.typeS === ServiceType.GET ? 'vous fais gagner' : 'coute'} ${points.join(' à ')}pts`}
                                fill={user.Profile?.points > points[0]}
                                color={service.typeS === ServiceType.GET ? "green" : "orange"}
                                size="md" />}>
                        </Chip>
                        <Icon
                            bg clear
                            icon="arrow_circle_right"
                            link={`/service/${id}`}
                            title={`voir les details de service  ${title}`}
                            fill />
                    </div>
                </CardFooter>
            </Card >
        </>
    )
}
export default ServiceCard