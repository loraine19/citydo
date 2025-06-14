import { Card, CardHeader, Typography, CardBody, CardFooter, Chip } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { HardLevel, SkillLevel, ServiceStep } from "../../../../../domain/entities/Service";
import { Icon } from "../../../common/IconComp";
import { DateChip } from "../../../common/ChipDate";
import { useUserStore } from "../../../../../application/stores/user.store";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";
import { Title } from "../../../common/CardTitle";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { Profile } from "../../../../../domain/entities/Profile";

export default function ServiceDetailComp(props: { service: ServiceView, mines?: boolean }) {
    const { service } = props
    const { user } = useUserStore()
    const userId: number = user.id
    const navigate = useNavigate();
    const { id, title, description, IResp, image, createdAt, User, UserResp, categoryS, statusS, hard, skill, flagged, points, typeS } = props.service
    const haveImage = service.image ? true : false


    const statusValues = (step: ServiceStep): { color: string, text: string } => {
        switch (step) {
            case ServiceStep.STEP_1: return {
                color: "OrangeChip",
                text: IResp ? "Vous avez répondu à ce service" : 'à eté répondu par'
            };
            case ServiceStep.STEP_2: return {
                color: "GreenChip",
                text: `Le service est en cours par ${IResp ? '(vous)' : ':'} `
            }; break
            case ServiceStep.STEP_3: return {
                color: "GrayChip",
                text: `A été réalisé par ${IResp ? '(vous)' : ':'} `
            };
            case ServiceStep.STEP_4: return {
                color: "RedChip",
                text: "Ce service est en litige"
            };
            default: return {
                color: "Chip",
                text: "Ce service est en attente de réponse"
            };
        }
    }
    return (
        <div className="DetailCardDiv">
            <Card className="FixCard w-respLarge !h-full" >
                <CardHeader
                    className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                    floated={haveImage}>
                    <div className={haveImage ? "ChipDiv" : "ChipDivNoImage"}>
                        <div className="ChipSubDiv ">
                            <Chip
                                size="sm"
                                value={`${categoryS}`}
                                className="CyanChip">
                            </Chip>
                            <Chip
                                size="sm"
                                value={typeS}
                                className={`${typeS === "demande" ? "OrangeChip" : "GreenChip"} shadow rounded-full  h-max flex items-center gap-2 font-medium `}>
                            </Chip>
                            <button onClick={() => { statusS === ServiceStep.STEP_4 && navigate(`/conciliation/${id}`) }}>
                                <Chip
                                    size="sm" value={statusS}
                                    className={`${statusValues(statusS as ServiceStep).color} shadow rounded-full h-max flex items-center gap-2 font-medium `}>
                                </Chip>
                            </button>
                        </div>
                        <DateChip
                            start={createdAt}
                            prefix="publié le " />
                    </div>
                    {image &&
                        <img
                            onError={(e) => e.currentTarget.src = "/image/placeholder.jpg"}
                            src={image as any}
                            alt={title}
                            className="h-full w-full object-cover"
                        />
                    }
                </CardHeader>
                <CardBody className="FixCardBody">
                    <Title
                        title={title}
                        flagged={flagged}
                        id={id}
                        type='service'
                        group={service.Group}
                    />
                    <div className="flex justify-between items-end pt-2 ">
                        <div className="flex  items-center gap-2 mb-1">
                            <Chip
                                value={SkillLevel[skill as unknown as keyof typeof SkillLevel]}
                                className=" GrayChip  px-4 rounded-full h-full flex items-center justify-center"
                                icon={<Icon
                                    disabled
                                    size="md"
                                    icon="design_services"
                                    style=" pointer-events-none"
                                    title="Compétence" />}>
                            </Chip>
                            <Chip
                                value={HardLevel[hard as unknown as keyof typeof HardLevel]}
                                className="GrayChip px-4 rounded-full h-full flex items-center justify-center gap-4"
                                icon={<Icon
                                    disabled
                                    size="md"
                                    icon="signal_cellular_alt"
                                    style="pointer-events-none"
                                    title="Difficulté" />}>
                            </Chip>
                        </div>
                    </div>
                    <div className="CardOverFlow h-full flex flex-col gap-4 !pt-1 ">
                        <div className="flex flex-1 flex-col lg:flex-row gap-4">
                            <Typography
                                color="blue-gray"
                                className="flex-1 min-h-[33%]  pr-4 max-h-20 overflow-y-auto">
                                {description}
                            </Typography>

                            <div className="flex border min-w-[33%] border-blue-gray-200 mx-2 p-3 bg-blue-gray-50 rounded-2xl h-full flex-col gap-2 lg:items-end">
                                <Typography
                                    className="text-left lg:text-right"
                                    variant="h6"
                                    color="blue-gray">
                                    {statusValues(statusS as ServiceStep).text}
                                </Typography>
                                <div className="flex lg:flex-col flex-row-reverse lg:items-end self-start lg:self-end">
                                    {UserResp ?
                                        <ProfileDiv profile={UserResp} size="md" /> :
                                        <ProfileDiv profile={new Profile({
                                            firstName: "Mr",
                                            lastName: "?",
                                            userId: 0,
                                            userIdSp: 0,
                                            addressId: 0,
                                        } as Partial<Profile>)} size="md" />}

                                </div>
                            </div>

                        </div>
                    </div>
                </CardBody>
                <CardFooter className="CardFooter">
                    {User?.id !== userId &&
                        <ProfileDiv profile={User} />
                    }
                    <div className="flex items-center gap-2">
                        <Typography
                            variant="h3"
                            className={`text-end ${points.length > 0 && "w-full"}`} >
                            {points.length > 0 && points[1] && <span className="!text-[1.2rem] font-light">de </span>}
                            {points[0]}
                            {points.length > 0 && <>
                                <span className="!text-[1.2rem] font-light"> à </span>
                                {points[1]}</>}
                            <span className="!text-[1.2rem] font-light"> points</span>
                        </Typography>
                    </div>
                </CardFooter>
            </Card >
        </div>
    )
}