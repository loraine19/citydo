import { Card, CardHeader, Typography, CardBody, CardFooter, Chip, ChipLabel } from "@material-tailwind/react";
import { Icon } from "../../../common/IconComp";
import { FlagView } from "../../../../views/viewsEntities/flagViewEntities";
import { FlagTarget } from "../../../../../domain/entities/Flag";
import { ProfileDiv } from "../../../common/ProfilDiv";

export default function FlagDetailComp(props: { flag: FlagView, element?: any, label?: string }) {
    const { flag } = props

    const { createdAt, element, target, title } = flag
    const now = Date.now();
    const id = flag.targetId

    return (
        <Card className="CardDetailGridNoImage" >
            <CardHeader className="FixCardHeaderNoImage">
                <div className="ChipDivNoImage">
                    <Chip className="CyanChip">
                        <ChipLabel>{FlagTarget[flag.target as unknown as keyof typeof FlagTarget]
                            || FlagTarget[props.label as unknown as keyof typeof FlagTarget]}
                        </ChipLabel>
                    </Chip>
                    <Chip className={`rounded-full grayChip h-max flex items-center gap-2 shadow font-medium `}>
                        <ChipLabel>
                            {(new Date(createdAt ? createdAt : now)).toLocaleDateString('fr-FR')}
                        </ChipLabel>
                    </Chip>
                </div>
            </CardHeader>
            <CardBody
                className="FixCardBody">
                <div className="flex w-full items-center justify-between">
                    <Typography as="h5" className="mb-2">
                        {title}
                    </Typography>
                </div>
                <div className="CardOverFlow">
                    <Typography className="mb-2">
                        {element?.description}
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="CardFooter">
                <ProfileDiv
                    profile={element?.User} />

                <Icon fill
                    icon="arrow_circle_right"
                    link={`/${target}/${id}`}
                    title={`voir les details de ${title}`}
                    bg clear />

            </CardFooter>
        </Card>
    )
}