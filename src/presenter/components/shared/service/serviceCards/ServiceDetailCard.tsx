import { useNavigate } from "react-router-dom";
import { HardLevel, SkillLevel, ServiceStep, ServiceType } from "../../../../../domain/entities/Service";
import { Icon } from "../../../common/IconComp";
import { DateChip } from "../../../common/ChipDate";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { Profile } from "../../../../../domain/entities/Profile";
import Chip from "../../../common/adaptatersComps/Chip";
import { MoreButton } from "../../../common/moreBtn";
import { CardLarge } from "../../base/baseComps/Cards";
import { GroupLink } from "../../../common/GroupLink";
import { Md3Colors } from "../../base/baseComps/Buttons";
import BtnExpandImg from "../../../common/BtnExpandImg";

export default function ServiceDetailComp(props: { service: ServiceView, mines?: boolean, expanded: boolean, setExpanded: (e: boolean) => void }) {
    const { service, expanded, setExpanded } = props
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
        <CardLarge
            className="min-h-full"
            expanded={expanded}
            setExpanded={setExpanded}
            image={

                <img
                    onError={(e) => e.currentTarget.src = '/image/placeholder.jpg'}
                    src={image as string}
                    alt={title}
                    className='md3-card-large-image'
                >
                    <CardLarge.Chips className="p-2 mt-1 justify-end">
                        <DateChip
                            start={service?.createdAt}
                            prefix=" "
                        />
                        <BtnExpandImg
                            image={image as any}
                        />
                    </CardLarge.Chips>
                </img>
            }>
            <CardLarge.Chips className=" px-2 md:-mt-1">
                <div className="md3-card-chips w-full">
                    <Chip
                        value={`${categoryS}`}
                        color='sky'
                    >
                    </Chip>
                    <Chip
                        value={typeS}
                        color={typeS === ServiceType.GET ? "orange" : "green"}>
                    </Chip>
                    <button onClick={() => { statusS === ServiceStep.STEP_4 && navigate(`/conciliation/${id}`) }}>
                        <Chip
                            value={statusS}
                            color={statusValues(statusS as ServiceStep).color as Md3Colors}>
                        </Chip>
                    </button>
                </div>
                <MoreButton
                    type="service"
                    id={id}
                    flagged={flagged}
                    title={title} />
            </CardLarge.Chips>
            <CardLarge.Headline>
                {title}

            </CardLarge.Headline>

            <CardLarge.Subhead className=" flex flex-col items-start  relative ">
                <GroupLink group={service?.Group} />
            </CardLarge.Subhead>

            <CardLarge.SupportingText>
                {service?.description}
            </CardLarge.SupportingText>
            <CardLarge.Divider />
            <CardLarge.Media className="gap-8 w-full flex-row justify-start ">
                <div className="flex flex-col gap-2 ">
                    <h6 className="">Difficulté</h6>
                    <div className="flex flex-col lg:flex-row xs:flex-row gap-2">
                        <Chip
                            value={SkillLevel[skill as unknown as keyof typeof SkillLevel]}
                            icon={<Icon
                                disabled
                                size="sm"
                                icon="design_services"
                                style=" pointer-events-none"
                                title="Compétence" />}>
                        </Chip>
                        <Chip
                            color='slate'
                            value={HardLevel[hard as unknown as keyof typeof HardLevel]}
                            icon={<Icon
                                disabled
                                size="sm"
                                icon="signal_cellular_alt"
                                style="pointer-events-none"
                                title="Difficulté" />}>
                        </Chip>
                        <Chip
                            value={
                                points[1]
                                    ? `points : ${points[0]} à ${points[1]} `
                                    : `points : ${points[0]} `
                            }
                        />
                    </div>
                </div>

            </CardLarge.Media>
            <CardLarge.Divider />
            <CardLarge.MidSection className="flex h-full flex-col ">
                <div className="flex flex-col flex-1">
                    <h6>Réponse</h6>
                    <i  >
                        {statusValues(statusS as ServiceStep).text}
                    </i>
                    <div className="flex min-w-fit py-2 max-w-max h-max flex-col ">
                        <ProfileDiv

                            profile={UserResp ?? new Profile({
                                firstName: "Mr",
                                lastName: "?",
                                userId: 0,
                                userIdSp: 0,
                                addressId: 0,
                            } as Partial<Profile>)} size="sm" />
                    </div>
                </div>
            </CardLarge.MidSection>
            <CardLarge.Divider />
            <CardLarge.Footer className={`md3-card-large-footer `}>

                <div className="flex flex-col w-full gap-2 ">
                    <h6>Publié par</h6>
                    <ProfileDiv
                        date={service?.createdAt}
                        profile={User} />
                </div>
            </CardLarge.Footer>

        </CardLarge>
    )
}