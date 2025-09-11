
import ModifBtnStack from "../../../common/ModifBtnStack";
import { Action } from "../../../../../domain/entities/frontEntities";
import { dayMS, GenereMyActions } from "../../../../views/viewsEntities/utilsService";
import { DateChip } from "../../../common/ChipDate";
import DI from "../../../../../di/ioc";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { Title } from "../../../common/CardTitle";
import { User } from "../../../../../domain/entities/User";
import { PoolSurveyStatus } from "../../../../../domain/entities/PoolSurvey";
import Chip from "../../../common/adaptatersComps/Chip";
import { AlertValues } from "../../../../../domain/entities/Error";
import { VoteValues } from "./VoteCard";
import { CardMD } from "../../base/baseComps/Cards";
import { ProgressBar } from "../../base/baseComps/Sliders";
import { Button } from "../../base/baseComps/Buttons";

type PoolCardProps = {
    pool: any,
    change: (e: any) => void,
    mines?: boolean,
    update: () => void,
    vote: (target: AlertValues) => void
}

export function PoolCard({ pool, change, mines, update, vote }: PoolCardProps) {
    const ended: boolean = pool.pourcent < 100 || pool.status !== PoolSurveyStatus.PENDING
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

            {/* <Card className={`FixCardNoImage`}>
                <CardHeader className={"FixCardHeaderNoImage"}>
                    <div className={` ChipDivNoImage `}>
                        <button onClick={(e: any) => change(e)}>
                            <Chip
                                size='sm'
                                value='Cagnotte'
                                className="greenChip" >
                            </Chip>
                        </button>
                        <DateChip
                            start={pool.createdAt}
                            ended={ended}
                            end={end}
                            prefix="finis dans" />
                    </div>
                </CardHeader>
                <CardBody className="FixCardBody !overflow-hidden">
                    <div className="py-1 flex flex-col ">
                        <ProfileDiv
                            profile={pool?.UserBenef || {} as Partial<User>}
                            size={'xl'} />
                        <Title
                            title={pool.title}
                            group={pool.Group} />
                    </div>
                    <Typography
                        className="description line-clamp-1">
                        {pool.description}
                    </Typography>
                </CardBody>
                <CardFooter
                    className="CardFooter ">
                    {!mines ?
                        <div className="flex-1">
                            <ProgressBar
                                value={pool?.pourcent}
                                label="vote pour"
                                needed={pool?.needed}
                                status={pool?.status} />
                        </div>
                        :
                        <ModifBtnStack
                            disabled2={disabledEditCTA}
                            actions={actions}
                            update={update} />}
                    <div className="flex  items-center justify-between gap-2">
                        <button
                            disabled={pool?.status !== PoolSurveyStatus.PENDING}
                            onClick={() => vote(values)}>
                            <Chip
                                size='sm'
                                key={pool.id}
                                value={pool.Votes?.length}
                                variant="ghost"
                                className="grayChip pt-1  "
                                icon={
                                    <Icon
                                        disabled={pool?.status !== PoolSurveyStatus.PENDING}
                                        icon="smart_card_reader"
                                        fill={pool?.IVoted}
                                        color={color()}
                                        size="md"
                                        title={`  ${pool.Votes?.length} personnes ${pool?.IVoted ? `dont vous ` : ''} ont voté`}
                                    />}>
                            </Chip>
                        </button>
                        <Icon
                            icon="keyboard_arrow_right"
                            title={`voir les details de ${pool.title}`}
                            link={`/cagnotte/${pool.id}`}
                            fill clear />
                    </div>
                </CardFooter >
            </Card > */}
            <CardMD
                autoFit
                className="min-h-full"
                imagePosition="top"
                link={`/cagnotte/${pool?.id}`}
            >
                <CardMD.Chips>
                    <button onClick={change}>
                        <Chip
                            value="Cagnotte"
                            size="sm"
                            className="!px-3 min-w-max rounded-full h-max orangeChip"
                        />
                    </button>
                    <DateChip
                        start={pool?.createdAt}
                        ended={ended}
                        end={end}
                        prefix="finis dans"
                    />
                </CardMD.Chips>
                <CardMD.Headline className="mb:pb-4 !line-clamp-1">
                    <Title
                        title={pool?.title}
                        group={pool?.Group}
                    />
                </CardMD.Headline>
                <CardMD.Media className="h-full flex-1 justify-between md:pb-2 !overflow-hidden">
                    <div className="grid overflow-hidden flex-1 ">
                        <ProfileDiv
                            profile={pool?.UserBenef || {} as Partial<User>}
                            size="xl"
                        />
                    </div>
                    <ProgressBar
                        color="orange"
                        size='xxsmall'
                        variant={pool?.pourcent >= 100 ? 'linear' : 'wavy'}
                        className="pb-2 lg:pb-2"
                        value={pool?.pourcent}
                        max={100}
                        label={
                            <div className="md3-card-supporting-text justify-between flex-row">
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
                <CardMD.Footer className="flex items-center pb-1 ">
                    {!mines ? (
                        <div className=" w-full flex-1 truncate pl-2 -ml-2 ">
                            <ProfileDiv
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
                        size='small'
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