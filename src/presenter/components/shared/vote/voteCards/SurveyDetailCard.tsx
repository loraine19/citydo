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

type Props = { survey: PoolSurveyView, setOpen: (open: boolean) => void }

export default function SurveyDetailCard({ survey, setOpen }: Props) {
    const haveImage: boolean = survey.image ? true : false
    const end = new Date(new Date(survey.createdAt).getTime() + 15 * dayMS)
    const { title, description, categoryS, createdAt, pourcent, status, myOpinion, IVoted, image, flagged, id, Votes, User, needed } = survey

    const color = (): string => {
        switch (myOpinion) {
            case 'OK': return 'green';
            case 'NO': return 'red';
            case 'WO': return 'orange';
            default: return 'slate';
        }
    }

    return (
        <div className="DetailCardDiv">
            <Card className="CardDetailGrid">
                <CardHeader
                    className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                    floated={haveImage}>
                    <div className={haveImage ? "ChipDiv flex-wrap" : "ChipDivNoImage flex-wrap"}>
                        <Chip
                            size='sm'
                            value={categoryS}
                            className="CyanChip">
                        </Chip>
                        <DateChip
                            start={createdAt}
                            ended={status !== PoolSurveyStatus.PENDING}
                            end={end}
                            prefix="finis dans" />
                    </div>
                    {image &&
                        <img
                            onError={(e) => e.currentTarget.src = "/image/placeholder2.png"}
                            src={image as string}
                            alt={title}
                            className="h-full w-full object-cover CardImage" />}
                </CardHeader>
                <CardBody className="FixCardBody  justify-between">
                    <div>   <Title
                        title={title}
                        flagged={flagged}
                        id={id}
                        CreatedAt={createdAt}
                        type='sondage' />
                        <div className="CardOverFlow ">
                            <Typography
                                className="description">
                                {description}
                            </Typography>
                        </div></div>
                    <ProgressBar
                        value={pourcent}
                        label="votes pour"
                        size={'lg'}
                        needed={needed} />
                </CardBody>
                <CardFooter className="CardFooter">
                    <ProfileDiv
                        profile={User} />
                    <div className="flex items-center gap-2 ">
                        <button
                            disabled={status !== PoolSurveyStatus.PENDING}
                            onClick={() => setOpen(true)}>
                            <Chip
                                value={Votes?.length}
                                variant="ghost"
                                size='sm'
                                className="rounded-full GrayChip !px-4"
                                icon={<Icon
                                    icon="smart_card_reader"
                                    fill={IVoted}
                                    color={color()}
                                    size="md"
                                    title={`${Votes?.length} personnes ${IVoted && `dont vous `} ont voté`} />}>
                            </Chip>
                        </button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}



