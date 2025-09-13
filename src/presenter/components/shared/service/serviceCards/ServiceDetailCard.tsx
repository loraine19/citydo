import { useNavigate } from "react-router-dom";
import { HardLevel, SkillLevel, ServiceStep } from "../../../../../domain/entities/Service";
import { Icon } from "../../../common/IconComp";
import { DateChip } from "../../../common/ChipDate";
import { useUserStore } from "../../../../../application/stores/user.store";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { Profile } from "../../../../../domain/entities/Profile";
import Chip from "../../../common/adaptatersComps/Chip";
import { MoreButton } from "../../../common/moreBtn";
import { CardLarge } from "../../base/baseComps/Cards";
import { GroupLink } from "../../../common/GroupLink";

export default function ServiceDetailComp(props: { service: ServiceView, mines?: boolean, expanded: boolean, setExpanded: (e: boolean) => void }) {
    const { service, expanded, setExpanded } = props
    const { user } = useUserStore()
    const userId: number = user.id
    const navigate = useNavigate();
    const { id, title, IResp, image, User, UserResp, categoryS, statusS, hard, skill, flagged, points, typeS } = props.service


    const statusValues = (step: ServiceStep): { color: string, text: string } => {
        switch (step) {
            case ServiceStep.STEP_1: return {
                color: "orangeChip",
                text: IResp ? "Vous avez répondu à ce service" : 'à eté répondu par'
            };
            case ServiceStep.STEP_2: return {
                color: "greenChip",
                text: `Le service est en cours par ${IResp ? '(vous)' : ':'} `
            }; break
            case ServiceStep.STEP_3: return {
                color: "grayChip",
                text: `A été réalisé par ${IResp ? '(vous)' : ':'} `
            };
            case ServiceStep.STEP_4: return {
                color: "redChip",
                text: "Ce service est en litige"
            };
            default: return {
                color: "Chip",
                text: "Ce service est en attente de réponse"
            };
        }
    }
    return (
        // <Card className="CardDetailGrid">
        //     <CardHeader
        //         className={haveImage ? "DetailCardHeader" : "FixCardHeaderNoImage"}>
        //         {image &&
        //             <div className="CardImageDiv">
        //                 <img
        //                     onError={(e) => e.currentTarget.src = "/image/placeholder.jpg"}
        //                     src={image as any}
        //                     alt={title}
        //                     className="CardImage"
        //                 />
        //             </div>
        //         }
        //         <div className={haveImage ? "ChipDiv " : "ChipDivNoImage"}>

        //             <div className="ChipSubDiv  ">
        //                 <Chip
        //                     size="sm"
        //                     value={`${categoryS}`}
        //                     className="skyChip">
        //                 </Chip>
        //                 <Chip
        //                     size="sm"
        //                     value={typeS}
        //                     className={`${typeS === "demande" ? "orangeChip" : "greenChip"} shadow rounded-full  h-max flex items-center gap-2 font-medium `}>
        //                 </Chip>
        //                 <button onClick={() => { statusS === ServiceStep.STEP_4 && navigate(`/conciliation/${id}`) }}>
        //                     <Chip
        //                         size="sm" value={statusS}
        //                         className={`${statusValues(statusS as ServiceStep).color} shadow rounded-full h-max flex items-center gap-2 font-medium `}>
        //                     </Chip>
        //                 </button>
        //             </div>
        //             <DateChip
        //                 start={createdAt}
        //                 prefix="publié le " />
        //         </div>
        //     </CardHeader>
        //     <CardBody className="DetailCardBody">

        //         <div className="flex w-full  justify-between flex-1 flex-col lg:flex-row xs:gap-2 sm:gap-y-4 lg:gap-4">
        //             <div className="flex flex-1 flex-col gap-2">
        //                 <Title
        //                     large
        //                     title={title}
        //                 />
        //                 <MoreButton
        //                     type="service"
        //                     id={id}
        //                     flagged={flagged}
        //                 />
        //                 <div>
        //                     <h6>Description</h6>
        //                     <Typography
        //                         className="description ">
        //                         {description}
        //                     </Typography>
        //                 </div>
        //             </div>
        //             <div className="w-full flex flex-1 lg:flex-col justify-between lg:items-end lg:justify-start lg:gap-y-2 ">
        //                 <div className="flex flex-col flex-1">
        //                     <h6 className="lg:text-right">Difficulté</h6>
        //                     <div className="flex flex-col lg:flex-row pt-1 xs:flex-row gap-2">
        //                         <Chip
        //                             size="sm"
        //                             value={SkillLevel[skill as unknown as keyof typeof SkillLevel]}
        //                             className=" grayChip "
        //                             icon={<Icon
        //                                 disabled
        //                                 size="sm"
        //                                 icon="design_services"
        //                                 style=" pointer-events-none"
        //                                 title="Compétence" />}>
        //                         </Chip>
        //                         <Chip
        //                             size="sm"
        //                             value={HardLevel[hard as unknown as keyof typeof HardLevel]}
        //                             className="grayChip "
        //                             icon={<Icon
        //                                 disabled
        //                                 size="sm"
        //                                 icon="signal_cellular_alt"
        //                                 style="pointer-events-none"
        //                                 title="Difficulté" />}>
        //                         </Chip>
        //                     </div>
        //                 </div>
        //                 <div className="flex flex-col flex-1">
        //                     <i className="text-right  pt-1" >
        //                         {statusValues(statusS as ServiceStep).text}
        //                     </i>
        //                     <div className="flex min-w-fit max-w-max h-max flex-col xs:items-end xs:place-self-end ">
        //                         <ProfileDiv profile={UserResp ?? new Profile({
        //                             firstName: "Mr",
        //                             lastName: "?",
        //                             userId: 0,
        //                             userIdSp: 0,
        //                             addressId: 0,
        //                         } as Partial<Profile>)} size="sm" />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </CardBody>
        //     <CardFooter className={`DetailCardFooter `}>
        //         {User?.id !== userId &&
        //             <div>
        //                 <h6>Proposition de</h6>
        //                 <ProfileDiv profile={User} />
        //             </div>
        //         }
        //         <div className="flex flex-row-reverse sm:flex-col w-full items-end  gap-x-2 ">
        //             <h6 className="text-end ">Points</h6>
        //             <h4
        //                 className={`text-end ${points?.length > 0 && "sm:w-full"}`} >
        //                 {points.length > 0 && points[1] &&
        //                     <span className="!text-[1.2rem] font-light">de </span>}
        //                 {points[0]}
        //                 {points[1] && <>
        //                     <span className="!text-[1.2rem] font-light"> à </span>
        //                     {points[1]}</>}

        //             </h4>
        //         </div>
        //     </CardFooter>
        // </Card>
        <CardLarge
            expanded={expanded}
            setExpanded={setExpanded}
            image={<img
                onError={(e) => e.currentTarget.src = '/image/placeholder.jpg'}
                src={image as string}
                alt={title}
                className='md3-card-large-image' >
                <CardLarge.Chips className="py-4 px-2 justify-end">
                    <DateChip
                        start={service?.createdAt}
                        prefix=" " />
                </CardLarge.Chips>
            </img>}>
            <CardLarge.Chips className="-mt-1">
                <Chip
                    size="sm"
                    value={`${categoryS}`}
                    className="skyChip">
                </Chip>
                <Chip
                    size="sm"
                    value={typeS}
                    className={`${typeS === "demande" ? "orangeChip" : "greenChip"} shadow rounded-full  h-max flex items-center gap-2 font-medium `}>
                </Chip>
                <button onClick={() => { statusS === ServiceStep.STEP_4 && navigate(`/conciliation/${id}`) }}>
                    <Chip
                        size="sm" value={statusS}
                        className={`${statusValues(statusS as ServiceStep).color} shadow rounded-full h-max flex items-center gap-2 font-medium `}>
                    </Chip>
                </button>
            </CardLarge.Chips>
            <CardLarge.Headline className="flex justify-between gap-2">
                {title}
                <MoreButton
                    type="service"
                    id={id}
                    flagged={flagged}
                    title={title} />
            </CardLarge.Headline>
            <CardLarge.Subhead className="gap-2 flex flex-col ">
                <h6>Détails</h6>
                <GroupLink group={service?.Group} />
            </CardLarge.Subhead>
            <CardLarge.SupportingText>
                {service?.description}
            </CardLarge.SupportingText>

            <CardLarge.Media className="gap-8 flex-1 flex-row ">
                <div className="flex flex-col  ">
                    <h6 className="">Difficulté</h6>
                    <div className="flex flex-col lg:flex-row pt-1 xs:flex-row gap-2">
                        <Chip
                            size="sm"
                            value={SkillLevel[skill as unknown as keyof typeof SkillLevel]}
                            className=" grayChip "
                            icon={<Icon
                                disabled
                                size="sm"
                                icon="design_services"
                                style=" pointer-events-none"
                                title="Compétence" />}>
                        </Chip>
                        <Chip
                            size="sm"
                            value={HardLevel[hard as unknown as keyof typeof HardLevel]}
                            className="grayChip "
                            icon={<Icon
                                disabled
                                size="sm"
                                icon="signal_cellular_alt"
                                style="pointer-events-none"
                                title="Difficulté" />}>
                        </Chip>
                    </div>
                </div>
                <div className="flex flex-col gap-1 ">
                    <h6>Points</h6>
                    <h4 className={` ${points?.length > 0 && "sm:w-full"}`} >
                        {points.length > 0 && points[1] &&
                            <span className="!text-[1.2rem] font-light">de </span>}
                        {points[0]}
                        {points[1] && <>
                            <span className="!text-[1.2rem] font-light"> à </span>
                            {points[1]}</>}

                    </h4>
                </div>

            </CardLarge.Media>

            <CardLarge.MidSection className="flex h-full flex-col ">
                <div className="flex flex-col gap-2 flex-1">
                    <h6>Réponse</h6>
                    <i  >
                        {statusValues(statusS as ServiceStep).text}
                    </i>
                    <div className="flex min-w-fit pb-2 max-w-max h-max flex-col ">
                        <ProfileDiv profile={UserResp ?? new Profile({
                            firstName: "Mr",
                            lastName: "?",
                            userId: 0,
                            userIdSp: 0,
                            addressId: 0,
                        } as Partial<Profile>)} size="sm" />
                    </div>
                </div>
            </CardLarge.MidSection>

            <CardLarge.Footer className={`justify-between items-center flex w-full `}>
                {User?.id !== userId &&
                    <div className="flex flex-col w-full gap-2 ">
                        <h6>Proposition de</h6>
                        <ProfileDiv profile={User} />
                    </div>
                }

            </CardLarge.Footer>

        </CardLarge>
    )
}