
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
import { Button } from "../../base/baseComps/Buttons";
import { MoreButton } from "../../../common/moreBtn";
import { Link } from "react-router-dom";

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

    const color = (): string => {
        switch (pool?.myOpinion) {
            case 'OK': return 'green';
            case 'NO': return 'red';
            case 'WO': return 'slate';
            default: return 'orange';
        }
    }


    const values = VoteValues(pool, update);

    return (
        <>
            <CardMD
                autoFit
                className="min-h-full anim"
                imagePosition="top"
                link={`/cagnotte/${pool?.id}`}
            >
                <CardMD.Chips className="justify-between flex-wrap">
                    <div className="md3-card-chips overflow-hidden !py-0">
                        <button onClick={change}>
                            <Chip
                                value="Cagnotte"
                                color={"orange"}
                            />
                        </button>
                        <DateChip
                            start={pool?.createdAt}
                            end={end}
                            prefix="J-"
                        />

                    </div>
                    {<MoreButton
                        id={pool?.id}
                        type={'vote/cagnotte'}
                        flagged={pool?.flagged}
                        title={pool?.title} />}
                </CardMD.Chips>
                <CardMD.Headline className="mb:pb-6">
                    <Link to={`/cagnotte/${pool?.id}`}>{pool?.title}</Link>
                </CardMD.Headline>
                <CardMD.Media className="h-full flex-1 justify-between gap-2">
                    <div className="grid truncate flex-1 ">
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
                                            {pool?.needed}
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
                                date={pool?.createdAt}
                                group={pool?.Group}
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
                        variant={!pool?.IVoted ? "tonal" : "filled"}
                        color={color() as any}
                    />
                </CardMD.Footer>
            </CardMD>
        </>
    );
}