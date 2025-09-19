import { Card, CardHeader, Typography, CardBody, CardFooter } from "@material-tailwind/react";
import { Icon } from "../../../common/IconComp";
import { DateChip } from "../../../common/ChipDate";
import { dayMS } from "../../../../../domain/entities/frontEntities";
import { PoolSurveyView } from "../../../../views/viewsEntities/poolSurveyViewEntity";
import { ProgressBar } from "../../../common/ProgressBar";
import { Title } from "../../../common/CardTitle";
import { ProfileDiv } from "../../../common/ProfilDiv";
import { PoolSurveyStatus } from "../../../../../domain/entities/PoolSurvey";
import Chip from "../../../common/adaptatersComps/Chip";
import { User } from "../../../../../domain/entities/User";
import { MoreButton } from "../../../common/moreBtn";

type Props = { survey: PoolSurveyView, setOpen: (open: boolean) => void }

export default function SurveyDetailCard({ survey, setOpen }: Props) {
    const haveImage: boolean = survey.image ? true : false
    const end = new Date(new Date(survey.createdAt).getTime() + 15 * dayMS)
    const { title, categoryS, createdAt, status, myOpinion, image, flagged, id } = survey

    const color = (): string => {
        switch (myOpinion) {
            case 'OK': return 'green';
            case 'NO': return 'red';
            case 'WO': return 'orange';
            default: return 'slate';
        }
    }

    return (
        <Card className={haveImage ? "CardDetailGrid" : "CardDetailGridNoImage"}>
            <CardHeader
                className={haveImage ? "DetailCardHeader" : "FixCardHeaderNoImage"}>
                {image && <div className="CardImageDiv">
                    <img
                        onError={(e) => e.currentTarget.src = "/image/placeholder2.png"}
                        src={image as string}
                        alt={title}
                        className="CardImage" /></div>
                }
                <div className={haveImage ? "ChipDiv flex-wrap" : "ChipDivNoImage flex-wrap"}>
                    <Chip
                        color={'cyan'}
                        value={categoryS}>
                    </Chip>
                    <DateChip
                        start={createdAt}
                        ended={status !== PoolSurveyStatus.PENDING}
                        end={end}
                        prefix="finis dans" />
                </div>
            </CardHeader>
            <CardBody className="DetailCardBody  justify-between">
                <Title
                    large
                    title={title}
                />
                <MoreButton
                    flagged={flagged}
                    id={id}
                    type="vote/sondage"
                />
                <div className=" flex h-full  flex-1  flex-col gap-[10%] justify-between">
                    <div className=" flex h-full  flex-1  flex-col">

                        <h6>Description</h6>
                        <Typography className="description">
                            {survey?.description}
                        </Typography>

                    </div>
                    <div className="flex flex-col">
                        <h6>Progression des Votes</h6>
                        <ProgressBar
                            value={survey?.pourcent}
                            label="votes pour "
                            size={'lg'}
                            needed={survey?.needed} />
                    </div>
                </div>
            </CardBody>
            <CardFooter className="DetailCardFooter ">
                <div>
                    <h6>Créé par</h6>
                    <ProfileDiv
                        profile={survey?.User || {} as Partial<User>} />
                </div>
                <div className="flex flex-col gap-2 items-end">
                    <h6>Votes &nbsp; </h6>
                    <button
                        disabled={survey?.close}
                        onClick={() => { setOpen(true) }}>
                        <Chip
                            value={survey?.Votes?.length}

                            className="rounded-full px-4 grayChip"
                            icon={
                                <Icon
                                    disabled={survey?.close}
                                    icon="smart_card_reader"
                                    fill={survey?.IVoted}
                                    color={color()}
                                    size="md"
                                    title={`${survey?.Votes?.length} personnes ${survey?.IVoted ? `dont vous ` : ''} ont voté`} />}>
                        </Chip>
                    </button>
                </div>
            </CardFooter>
        </Card>
    )
}



