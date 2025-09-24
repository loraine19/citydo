import ModifBtnStack from "../../../common/ModifBtnStack";
import { GenereMyActions } from "../../../../views/viewsEntities/utilsService";
import { dayMS } from "../../../../../domain/entities/frontEntities";
import { DateChip } from "../../../common/ChipDate";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";
import DI from "../../../../../di/ioc"
import { PoolSurveyStatus } from "../../../../../domain/entities/PoolSurvey";
import Chip from "../../../common/adaptatersComps/Chip";
import { VoteValues } from "./VoteCard";
import { AlertValues } from "../../../../../domain/entities/Error";
import { CardMD } from "../../base/baseComps/Cards";
import { ProgressBar } from "../../base/baseComps/Sliders";
import { Button, Md3Colors } from "../../base/baseComps/Buttons";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { MoreButton } from "../../../common/moreBtn";
import { IconAnimate } from "../../../common/IconAnimate";
import { GroupLink } from "../../../common/GroupLink";


type SurveyCardProps = {
    survey: PoolSurveyView,
    change: () => void,
    mines?: boolean,
    update: () => void,
    vote: (target: AlertValues) => void,
    autoFit?: boolean
}

export function SurveyCard({ survey, change, mines, update, vote, autoFit }: SurveyCardProps) {
    const end = new Date(new Date(survey?.createdAt).getTime() + 15 * dayMS)
    const ended: boolean = survey?.status !== PoolSurveyStatus.PENDING
    const deleteSurvey = async (id: number) => await DI.resolve('deleteSurveyUseCase').execute(id)
    const actions = GenereMyActions(survey, "vote/sondage", deleteSurvey)
    const color = (): string => {
        switch (survey.myOpinion) {
            case 'OK': return 'green';
            case 'NO': return 'error';
            case 'WO': return 'slate';
            default: return 'orange';
        }
    }
    const values = VoteValues(survey, update);

    return (
        <>


            <CardMD
                autoFit={autoFit}
                className="min-h-full fade-in"
                imagePosition="top"
                link={`/sondage/${survey?.id}`}
                image={
                    survey?.image ? (
                        <CardMD.Image
                            src={survey?.image as string}
                            alt={survey?.title}
                            className=""
                        >
                            <IconAnimate
                                active={survey?.IVoted}
                                icon={'ballot'} />
                            <CardMD.Chips className="justify-end absolute top-2 right-2">
                                <MoreButton
                                    id={survey?.id}
                                    type={'vote/sondage'}
                                    flagged={survey?.flagged}
                                    title={survey?.title} />
                            </CardMD.Chips>

                        </CardMD.Image>
                    ) : undefined
                }
            >
                <CardMD.Chips className="justify-between">
                    <div className="md3-card-chips ">
                        <button onClick={() => change()}>
                            <Chip
                                value="Sondage"
                                color="orange"
                            />
                        </button>
                        <Chip
                            value={survey?.categoryS}
                            color="orange"
                        />

                        <DateChip
                            start={survey?.createdAt}
                            ended={ended}
                            end={end}
                            prefix="J-"
                        />
                    </div>

                </CardMD.Chips>
                <CardMD.Headline className="line-clamp-1">
                    {survey?.title}
                </CardMD.Headline>
                <CardMD.Subhead className={`flex items-center gap-2`}>
                    <GroupLink group={survey?.Group} />
                </CardMD.Subhead>
                <CardMD.Media>
                    <ProgressBar
                        color="orange"
                        size='xxsmall'
                        variant={survey?.pourcent >= 100 ? 'linear' : 'wavy'}
                        className="pb-0.5"
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


                </CardMD.Media>
                <CardMD.Footer className="flex items-center pb-1">
                    {!mines ? (
                        <div className=" w-full flex-1 flex items-center truncate pl-2 -ml-2 ">
                            <ProfileDiv
                                date={survey?.createdAt}
                                profile={survey?.User} />
                        </div>
                    ) : (
                        <ModifBtnStack
                            disabled2={ended}
                            actions={actions}
                            update={update}
                        />
                    )}
                    <Button
                        icon={{
                            style: '-mt-[1px]',
                            icon: survey?.IVoted ? 'list_alt_check' : 'list_alt_add',
                            fill: survey?.IVoted,
                            title: survey?.IVoted ? "Retirer mon vote" : "Je participe"
                        }}
                        size='medium'
                        disabled={survey?.status !== PoolSurveyStatus.PENDING}
                        onClick={() => vote(values)}
                        variant={!survey?.IVoted ? "tonal" : "tonal"}
                        color={color() as Md3Colors}
                    />

                </CardMD.Footer>
            </CardMD>
        </>
    );
}
