import { dayMS } from "../../../../views/viewsEntities/utilsService";
import { DateChip } from "../../../common/ChipDate";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { User } from "../../../../../domain/entities/User";
import { PoolSurveyStatus } from "../../../../../domain/entities/PoolSurvey";
import { MoreButton } from "../../../common/moreBtn";
import { CardLarge } from "../../base/baseComps/Cards";
import { GroupLink } from "../../../common/GroupLink";
import { ProgressBar } from "../../base/baseComps/Sliders";

type PoolDetailCardProps = { pool: PoolSurveyView, setOpen: () => void, expand: boolean, setExpand: (expand: boolean) => void }

export default function PoolDetailCard({ pool, setExpand }: PoolDetailCardProps) {
    const end = new Date(new Date(pool?.createdAt).getTime() + 15 * dayMS)
    return (
        <CardLarge
            expanded={true}
            setExpanded={setExpand}
            title={pool?.title}
            image={
                <CardLarge.Media>
                    <CardLarge.Chips className="justify-end p-2">
                        <DateChip
                            start={pool?.createdAt}
                            prefix="publié le " />
                    </CardLarge.Chips>

                </CardLarge.Media>}
        >
            <CardLarge.Chips className="justify-between">

                <div className="md3-card-chips flex-1">

                    <DateChip
                        start={pool?.createdAt}
                        ended={pool?.status !== PoolSurveyStatus.PENDING}
                        end={end}
                        prefix="finis dans" />
                </div>
                <MoreButton
                    id={pool?.id}
                    type={'vote/sondage'}
                    title={pool?.title} />
            </CardLarge.Chips>
            <CardLarge.Headline>
                {pool?.title}
            </CardLarge.Headline>

            <CardLarge.Subhead>
                <div>
                    <GroupLink group={pool?.Group} />
                </div>
            </CardLarge.Subhead>
            <CardLarge.SupportingText>
                {pool?.description}
            </CardLarge.SupportingText>

            <CardLarge.Divider />
            <CardLarge.Media className="h-full flex-1 justify-between gap-2">
                <h6>Bénéficiaire</h6>
                <ProfileDiv
                    profile={pool?.UserBenef || {} as Partial<User>}
                    size={'6xl'} />
            </CardLarge.Media>

            <CardLarge.Divider />
            <CardLarge.Media className="h-full flex-1 justify-between gap-2">
                <div className="flex flex-col py-2 gap-2 ">
                    <h6>Progression des Votes</h6>
                    <ProgressBar
                        color="orange"
                        size='xxsmall'
                        variant={pool?.pourcent >= 100 ? 'linear' : 'wavy'}
                        className=" pb-2 lg:pb-2"
                        value={pool?.pourcent}
                        max={100}
                        label={
                            <div className="md3-card-supporting-text justify-between flex-row">
                                {pool?.status !== PoolSurveyStatus.PENDING ?
                                    <span>Sondage cloturé</span> :
                                    <>
                                        <span>
                                            {pool?.Votes.length} vote{pool?.Votes.length > 1 ? 's ' : ' '}  pour {pool?.pourcent >= 100 ? ' approuvé' : ''}</span>
                                        <span className="opacity-50"> / &nbsp;
                                            {pool?.needed + pool?.Votes?.length}
                                        </span>
                                    </>

                                }
                            </div>}

                    />
                </div>
            </CardLarge.Media>

            <CardLarge.Divider />
            <CardLarge.Footer className="md3-card-large-footer gap-2">
                <div className="flex flex-col gap-2 ">
                    <h6>Créé par</h6>
                    <ProfileDiv
                        date={pool?.createdAt}
                        profile={pool?.User || {} as Partial<User>} />
                </div>

            </CardLarge.Footer>

        </CardLarge>
    )
}



