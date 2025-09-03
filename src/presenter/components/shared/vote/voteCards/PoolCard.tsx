import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { Icon } from '../../../common/IconComp'
import ModifBtnStack from "../../../common/ModifBtnStack";
import { Action } from "../../../../../domain/entities/frontEntities";
import { dayMS, GenereMyActions } from "../../../../views/viewsEntities/utilsService";
import { DateChip } from "../../../common/ChipDate";
import { ProgressBar } from "../../../common/ProgressBar";
import DI from "../../../../../di/ioc";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { Title } from "../../../common/CardTitle";
import { User } from "../../../../../domain/entities/User";
import { PoolSurveyStatus } from "../../../../../domain/entities/PoolSurvey";
import Chip from "../../../common/adaptatersComps/Chip";
import { AlertValues } from "../../../../../domain/entities/Error";
import { VoteValues } from "./VoteCard";

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
            case 'WO': return 'orange';
            default: return 'slate';
        }
    }


    const values = VoteValues(pool, update);

    return (
        <>

            <Card className={`FixCardNoImage`}>
                <CardHeader className={"FixCardHeaderNoImage"}>
                    <div className={` ChipDivNoImage `}>
                        <button onClick={(e: any) => change(e)}>
                            <Chip
                                size='sm'
                                value='Cagnotte'
                                className="GreenChip" >
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
                                className="GrayChip pt-1  "
                                icon={
                                    <Icon
                                        icon="smart_card_reader"
                                        fill={pool?.IVoted}
                                        color={color()}
                                        size="md"
                                        title={`  ${pool.Votes?.length} personnes ${pool?.IVoted ? `dont vous ` : ''} ont voté`}
                                    />}>
                            </Chip>
                        </button>
                        <Icon
                            icon="arrow_circle_right"
                            title={`voir les details de ${pool.title}`}
                            link={`/cagnotte/${pool.id}`}
                            fill
                            bg clear />
                    </div>
                </CardFooter >
            </Card >
        </>
    );
}