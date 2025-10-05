import ModifBtnStack from "../../../common/ModifBtnStack";
import { Action } from "../../../../../domain/entities/frontEntities";
import { dayMS, GenereMyActions } from "../../../../views/viewsEntities/utilsService";
import { DateChip } from "../../../common/ChipDate";
import DI from "../../../../../di/ioc";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { User } from "../../../../../domain/entities/User";
import { PoolSurveyStatus } from "../../../../../domain/entities/PoolSurvey";
import Chip from "../../../common/adaptatersComps/Chip";
import { AlertValues } from "../../../../../domain/entities/Error";
import { VoteValues } from "./VoteCard";
import { CardMD } from "../../base/baseComps/Cards";
import { ProgressBar } from "../../base/baseComps/Sliders";
import { Button, Md3Colors } from "../../base/baseComps/Buttons";
import { MoreButton } from "../../../common/moreBtn";
import { Link } from "react-router-dom";
import { GroupLink } from "../../../common/GroupLink";
import { VoteOpinion } from "../../../../../domain/entities/Vote";

type PoolCardProps = {
    pool: any,
    change: (e: any) => void,
    mines?: boolean,
    update: () => void,
    vote: (target: AlertValues) => void,
    divRef?: React.RefObject<HTMLDivElement>
}

export function PoolCard({ pool, change, mines, update, vote, divRef }: PoolCardProps) {
    const end: Date = new Date(new Date(pool.createdAt).getTime() + 15 * dayMS)
    const disabledEditCTA: boolean = pool?.status !== PoolSurveyStatus.PENDING

    //// FUNCTIONS
    const deletePool = async (id: number) => await DI.resolve('deletePoolUseCase').execute(id)
    const actions: Action[] = GenereMyActions(pool, "vote/cagnotte", deletePool)

    const color = (opinion: VoteOpinion): string => {
        switch (opinion) {
            case 'OK': return 'green';
            case 'NO': return 'error';
            case 'WO': return 'slate';
            default: return 'orange';
        }
    }


    const values = VoteValues(pool, update);

    return (
        <>
            <CardMD
                autoFit
                className="min-h-full fade-in"
                imagePosition="top"
            >
                <CardMD.Chips className="justify-between flex-wrap">
                    <div className="flex gap-2 py-1.5">
                        <Chip
                            variant="tonal"
                            onClick={change}
                            value="Cagnotte"
                            color={"orange"}
                        />
                        <DateChip
                            start={pool?.createdAt}
                            end={end}
                            prefix="J-"
                        />

                    </div>
                    {<MoreButton
                        id={pool?.id}
                        type={'cagnotte'}
                        flagged={pool?.flagged}
                        title={pool?.title} />}
                </CardMD.Chips>

                <CardMD.Headline className="mb:pb-6 line-clamp-1">
                    <Link to={`/vote/cagnotte/${pool?.id}`}>{pool?.title}</Link>
                </CardMD.Headline>

                <CardMD.Subhead className={`flex items-center gap-2`}>
                    <GroupLink group={pool?.Group} />
                </CardMD.Subhead>

                <CardMD.Media className="h-full flex-1 justify-between gap-4">
                    <div className="grid truncate items-center flex-1 ">
                        <ProfileDiv
                            divRef={divRef}
                            profile={pool?.UserBenef || {} as Partial<User>}
                            size="6xl"
                        />
                    </div>
                    <ProgressBar
                        color="orange"
                        size='xxsmall'
                        variant={pool?.pourcent >= 100 ? 'linear' : 'wavy'}
                        className="pb-2"
                        value={pool?.pourcent}
                        max={100}
                        label={
                            <div className="md3-card-supporting-text  justify-between flex-row">
                                {pool?.status !== PoolSurveyStatus.PENDING ?
                                    <span>Cagnotte cloturée</span> :
                                    <>
                                        <span>
                                            {pool?.Votes?.length} vote{pool?.Votes?.length > 1 ? 's ' : ' '}  pour {pool?.pourcent >= 100 ? ' approuvée' : ''}
                                        </span>
                                        <span className="opacity-50"> / &nbsp;
                                            {pool?.needed + pool?.Votes?.length}
                                        </span>
                                    </>
                                }
                            </div>
                        }
                    />
                </CardMD.Media>

                <CardMD.Footer className="flex items-center  ">
                    {!mines ? (
                        <div className=" w-full flex-1 flex items-center ">
                            <ProfileDiv
                                size='md'
                                date={pool?.createdAt}
                                divRef={divRef}
                                profile={pool?.User} />
                        </div>
                    ) : (
                        <ModifBtnStack
                            disabled2={disabledEditCTA}
                            actions={actions}
                            update={update}
                        />
                    )}
                    <Button
                        icon={{
                            style: '-mt-[1px]',
                            icon: pool?.IVoted ? 'list_alt_check' : 'list_alt_add',
                            fill: pool?.IVoted,
                            title: pool?.IVoted ? "Retirer mon vote" : "Je participe"
                        }}
                        size='medium'
                        disabled={pool?.status !== PoolSurveyStatus.PENDING}
                        onClick={() => vote(values)}
                        variant={!pool?.IVoted ? "tonal" : "tonal"}
                        color={color(pool?.myOpinion) as Md3Colors}
                    />
                </CardMD.Footer>
            </CardMD>
        </>
    );
}