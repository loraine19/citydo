import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { Icon } from "../../../common/IconComp";
import { GenereMyActions } from "../../../../views/viewsEntities/utilsService";
import { dayMS } from "../../../../../domain/entities/frontEntities";
import { DateChip } from "../../../common/ChipDate";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";
import { ProgressBar } from "../../../common/ProgressBar";
import DI from "../../../../../di/ioc";
import { useState } from "react";
import { VoteCard } from "./VoteCard";
import { Title } from "../../../common/CardTitle";
import { PoolSurveyStatus } from "../../../../../domain/entities/PoolSurvey";
import Chip from "../../../common/adaptatersComps/Chip";


type SurveyCardProps = {
    survey: PoolSurveyView,
    change: () => void,
    mines?: boolean,
    update: () => void
}

export function SurveyCard({ survey, change, mines, update }: SurveyCardProps) {
    const end = new Date(new Date(survey?.createdAt).getTime() + 15 * dayMS)
    const ended: boolean = survey?.status !== PoolSurveyStatus.PENDING
    const deleteSurvey = async (id: number) => await DI.resolve('deleteSurveyUseCase').execute(id)
    const actions = GenereMyActions(survey, "vote/sondage", deleteSurvey)
    const haveImage = survey?.image ? true : false
    const [open, setOpen] = useState(false);
    const color = (): string => {
        switch (survey.myOpinion) {
            case 'OK': return 'green';
            case 'NO': return 'red';
            case 'WO': return 'orange';
            default: return 'slate';
        }
    }


    return (
        <>
            {open &&
                <VoteCard
                    open={open}
                    close={() => setOpen(false)}
                    vote={survey}
                    refetch={update} />}
            <Card className={haveImage ? "FixCard " : "FixCardNoImage  "}>
                <CardHeader
                    className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                    floated={haveImage}>
                    <div className={haveImage ? "ChipDiv" : "ChipDivNoImage"}>
                        <div className="ChipSubDiv ">
                            <button
                                onClick={() => { change() }}>
                                <Chip
                                    value='Sondage'
                                    size="sm"
                                    className="!px-3 min-w-max rounded-full h-max OrangeChip" >
                                </Chip>
                            </button>
                            <Chip
                                value={survey?.categoryS}
                                size="sm"
                                className="CyanChip">
                            </Chip>
                        </div>
                        <DateChip
                            start={survey?.createdAt}
                            ended={ended}
                            end={end}
                            prefix="finis dans" />
                    </div>
                    {survey?.image &&
                        <div className="CardImageDiv">
                            <img
                                onError={(e) => e.currentTarget.src = "/image/placeholder2.png"}
                                src={survey?.image as any}
                                alt={survey?.title}
                                className="CardImage"
                            />
                        </div>}
                </CardHeader>
                <CardBody
                    className={` FixCardBody`}>
                    <Title
                        title={survey?.title}
                        flagged={survey?.flagged}
                        id={survey?.id}
                        type="sondage"
                        group={survey?.Group}
                    />
                    <Typography
                        className="leading-[1.2rem]  !line-clamp-1 overflow-auto  pt-1">
                        {survey?.description}
                    </Typography>
                </CardBody>
                <CardFooter
                    className="CardFooter ">
                    {!mines ?
                        <div className="flex-1 w-full">
                            <ProgressBar
                                value={survey?.pourcent}
                                label="vote pour"
                                needed={survey?.needed}
                                status={survey?.status} />
                        </div>
                        :
                        <ModifBtnStack
                            disabled2={ended}
                            actions={actions}
                            update={update} />}
                    <div className="flex items-center justify-between gap-2 ">
                        <button
                            disabled={survey?.status !== PoolSurveyStatus.PENDING}
                            onClick={() => { setOpen(true) }}>
                            <Chip
                                value={survey?.Votes?.length}
                                size='sm'
                                variant="ghost"
                                className="rounded-full GrayChip h-max flex items-center  "
                                icon={
                                    <Icon
                                        icon="smart_card_reader"
                                        fill={survey?.IVoted}
                                        color={color()}
                                        size="md"
                                        title={`${survey?.Votes?.length} personnes ${survey?.IVoted && `dont vous`} ont voté`} />}>
                            </Chip>
                        </button>
                        <Icon
                            icon="arrow_circle_right"
                            title={`voir les details de ${survey?.title}`}
                            link={`/sondage/${survey?.id}`}
                            fill
                            bg clear />
                    </div>
                </CardFooter >
            </Card >
        </>
    );
}
