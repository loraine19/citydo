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

type PoolDetailCardProps = { pool: PoolSurveyView, setOpen: () => void }

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
        <Card className="CardDetailGridNoImage" >
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
                className="DetailCardBody ">
                <Title
                    title={pool?.title}
                    CreatedAt={pool?.createdAt}
                    group={pool?.Group}
                />
                <div className=" flex h-full flex-1 gap-[10%] flex-col lg:flex-row">
                    <div>
                        <h6>Description</h6>
                        <Typography className="description">
                            {pool?.description}
                        </Typography>
                    </div>
                    <div className="">
                        <h6>Beneficiaire</h6>
                        <ProfileDiv
                            profile={pool?.UserBenef || {} as Partial<User>}
                            size={'lg'} />
                    </div>
                </div>
                <div className="flex flex-col">
                    <h6>Progression des Votes</h6>
                    <ProgressBar
                        value={pool?.pourcent}
                        label="votes pour "
                        size={'lg'}
                        needed={pool?.needed} />
                </div>
            </CardBody>
            <CardFooter className="DetailCardFooter ">
                <div>
                    <h6>Créé par</h6>
                    <ProfileDiv
                        profile={pool?.User || {} as Partial<User>} />
                </div>
                <div className="flex flex-col gap-2 items-end">
                    <h6>Votes &nbsp; </h6>
                    <button
                        disabled={pool?.close}
                        onClick={() => { setOpen() }}>
                        <Chip
                            size='sm'
                            value={pool.Votes?.length}
                            variant="ghost"
                            className="rounded-full px-4 grayChip"
                            icon={
                                <Icon
                                    disabled={pool?.close}
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
    )
}



