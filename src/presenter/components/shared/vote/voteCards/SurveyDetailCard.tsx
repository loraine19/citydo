import { DateChip } from "../../../common/ChipDate";
import { dayMS } from "../../../../../domain/entities/frontEntities";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";
import { Title } from "../../../common/CardTitle";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { PoolSurveyStatus } from "../../../../../domain/entities/PoolSurvey";
import Chip from "../../../common/adaptatersComps/Chip";
import { User } from "../../../../../domain/entities/User";
import { MoreButton } from "../../../common/moreBtn";
import { CardLarge } from "../../base/baseComps/Cards";
import { GroupLink } from "../../../common/GroupLink";
import { ProgressBar } from "../../base/baseComps/Sliders";

type Props = { survey: PoolSurveyView, setOpen: (open: boolean) => void, expand: boolean, setExpand: (expand: boolean) => void }

export default function SurveyDetailCard({ survey, expand, setExpand }: Props) {
    const end = new Date(new Date(survey.createdAt).getTime() + 15 * dayMS)
    const { title, categoryS, createdAt, status, image, flagged, id, Group } = survey


    return (
        <CardLarge
            expanded={expand}
            setExpanded={setExpand}
            title={title}
            image={<img
                src={image as string | undefined}
                onError={(e) => e.currentTarget.src = "/image/placeholder2.png"}
                alt={title}
                className="CardImage"
            >
                <CardLarge.Chips className="justify-end p-2">
                    <DateChip
                        start={createdAt}
                        prefix="publié le " />
                </CardLarge.Chips>
            </img>}
        >
            <CardLarge.Chips className="justify-between">

                <div className="md3-card-chips flex-1 !overflow-auto">
                    <Chip
                        size="sm"
                        value={`${categoryS}`}
                        className="rounded-full h-max truncate Chip md3-rose-container shadow"
                    />
                    <DateChip
                        start={createdAt}
                        ended={status !== PoolSurveyStatus.PENDING}
                        end={end}
                        prefix="finis dans" />
                </div>
                <MoreButton
                    id={id}
                    type={'vote/sondage'}
                    flagged={flagged}
                    title={title} />
            </CardLarge.Chips>
            <CardLarge.Headline>
                <Title title={title} />
            </CardLarge.Headline>

            <CardLarge.Subhead>
                <div>
                    <GroupLink group={Group} />
                </div>
            </CardLarge.Subhead>
            <CardLarge.SupportingText>
                <h6>Description</h6>
                {survey?.description}
            </CardLarge.SupportingText>
            <CardLarge.Media className="h-full flex-1 justify-between gap-2">
                <div className="flex flex-col py-2 gap-2 ">
                    <h6>Progression des Votes</h6>
                    <ProgressBar
                        color="orange"
                        size='xxsmall'
                        variant={survey?.status !== PoolSurveyStatus.PENDING ? 'linear' : 'wavy'}
                        className=" pb-2 lg:pb-2"
                        value={survey?.pourcent}
                        max={100}
                        label={
                            <div className="md3-card-supporting-text justify-between flex-row">
                                {survey?.status !== PoolSurveyStatus.PENDING ?
                                    <span>Sondage cloturé</span> :
                                    <>
                                        <span>
                                            {survey?.Votes.length} vote{survey?.Votes.length > 1 ? 's ' : ' '}  pour {survey?.pourcent >= 100 ? ' approuvé' : ''}</span>
                                        <span className="opacity-50"> / &nbsp;
                                            {survey?.needed}
                                        </span>
                                    </>

                                }
                            </div>}

                    />
                </div>
            </CardLarge.Media>
            <CardLarge.Footer className="md3-card-large-footer gap-2">
                <div className="flex flex-col gap-2 ">
                    <h6>Créé par</h6>
                    <ProfileDiv
                        profile={survey?.User || {} as Partial<User>} />
                </div>

            </CardLarge.Footer>

        </CardLarge>
    )
}



