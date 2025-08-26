import { Card, CardHeader, Typography, CardBody, CardFooter, } from "@material-tailwind/react";
import { Icon } from "../../../common/IconComp";
import { dayMS } from "../../../../views/viewsEntities/utilsService";
import { DateChip } from "../../../common/ChipDate";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";
import { ProgressBar } from "../../../common/ProgressBar";
import { Title } from "../../../common/CardTitle";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { User } from "../../../../../domain/entities/User";
import { PoolSurveyStatus } from "../../../../../domain/entities/PoolSurvey";
import Chip from "../../../common/adaptatersComps/Chip";

type PoolDetailCardProps = { pool: PoolSurveyView, setOpen: (open: boolean) => void }

export default function PoolDetailCard({ pool, setOpen }: PoolDetailCardProps) {
    const end = new Date(new Date(pool?.createdAt).getTime() + 15 * dayMS)
    const ended: boolean = pool?.status !== PoolSurveyStatus.PENDING || pool?.pourcent >= 100 ? true : false

    const color = (): string => {
        switch (pool?.myOpinion) {
            case 'OK': return 'green';
            case 'NO': return 'red';
            case 'WO': return 'orange';
            default: return 'slate';
        }
    }
    return (
        <div className="DetailCardDiv">
            <Card className="FixCardNoImage !flex  justify-between w-respLarge" >
                <CardHeader className={"FixCardHeaderNoImage"}
                    floated={false}>
                    <div className={`ChipDivNoImage flex-wrap`}>
                        <Chip
                            value={'Cagnotte'}
                            size='sm'
                            className="CyanChip">
                        </Chip>
                        <DateChip
                            start={pool?.createdAt}
                            ended={ended}
                            end={end}
                            prefix="finis dans" />
                    </div>
                </CardHeader>
                <CardBody
                    className="FixCardBody ">
                    <Title
                        title={pool?.title}
                        CreatedAt={pool?.createdAt}
                        group={pool?.Group}
                    />
                    <div className="CardOverFlow flex h-full justify-between !pb-8">
                        <Typography>
                            {pool?.description}
                        </Typography>
                        <ProfileDiv
                            profile={pool?.UserBenef || {} as Partial<User>}
                            size={'lg'} />
                    </div>
                    <ProgressBar
                        value={pool?.pourcent}
                        label="votes pour "
                        size={'lg'}
                        needed={pool?.needed} />
                </CardBody>
                <CardFooter
                    className="CardFooter mb-1">
                    <ProfileDiv
                        profile={pool?.User || {} as Partial<User>} />
                    <div className="flex items-center gap-2 ">
                        <button
                            disabled={pool?.status !== PoolSurveyStatus.PENDING}
                            onClick={() => { setOpen(true) }}>
                            <Chip
                                value={pool.Votes?.length}
                                variant="ghost"
                                size='lg'
                                className="rounded-full px-4 GrayChip"
                                icon={
                                    <Icon
                                        icon="smart_card_reader"
                                        fill={pool?.IVoted}
                                        color={color()}
                                        size="md"
                                        title={`${pool.Votes?.length} personnes ${pool?.IVoted ? `dont vous ` : ''} ont voté`} />}>
                            </Chip>
                        </button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}



