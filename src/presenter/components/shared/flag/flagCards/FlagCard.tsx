import { Card, CardBody, CardFooter, Typography, Chip, CardHeader } from "@material-tailwind/react";
import { Icon } from "../../../common/IconComp";
import { useNavigate } from "react-router-dom";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { FlagView } from "../../../../views/viewsEntities/flagViewEntities";
import { FlagTarget } from "../../../../../domain/entities/Flag";
import DI from "../../../../../di/ioc";

export function FlagCard(props: { flag: FlagView, update: () => void }) {
    const { targetId, createdAt, target, targetS, element, reasonS } = props.flag
    const { update } = props
    const navigate = useNavigate();
    const deleteFlag = (targetId: number, target: FlagTarget) => DI.resolve('deleteFlagUseCase').execute(targetId, target)

    const MyActions = [
        {
            icon: 'close',
            title: "Confirmer la suppression",
            body: `Confirmer la suppression du signalement ${element?.title}, pour le motif ${reasonS}`,
            function: async () => {
                await deleteFlag(targetId, target);
                update()
            },
        },
        {
            icon: 'edit',
            title: "Confirmer la modification",
            body: `Confirmer la modification du signalement ${element?.title}, pour le motif ${reasonS}`,
            function: () => { navigate(`/flag/edit/${targetS}/${targetId}`) },
        },
    ];

    return (
        <Card className="FixCardNoImage w-resp !justify-start">
            <CardHeader
                className="FixCardHeaderNoImage "
                floated={false}>
                <div className="ChipDivNoImage justify-between ">
                    <div className="flex  items-center gap-2 w-full">
                        <Chip
                            size='sm'
                            value={targetS}
                            className="CyanChip">
                        </Chip>
                        <Chip
                            size='sm'
                            value={reasonS}
                            className={`OrangeChip truncate overflow-auto max-w-[30vw]`}>
                        </Chip>
                    </div>
                    <div>
                        <ModifBtnStack
                            actions={MyActions} />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="FixCardBody max-h-max !py-0">
                <Typography
                    color="gray"
                    className="font-normal truncate ">
                    {element?.title}
                </Typography>
            </CardBody>
            <CardFooter className="CardFooter items-center !px-4">
                <Chip
                    size='sm'
                    value={'signalé le ' + new Date(createdAt).toLocaleDateString('fr-FR')}
                    className={`rounded-full GrayChip h-max flex items-center gap-2  `}>
                </Chip>
                <Icon
                    fill icon="arrow_circle_right"
                    link={`/${targetS}/${targetId}`}
                    title={`voir les details de ${element?.title}`}
                    size="4xl px-1" />
            </CardFooter>
        </Card>

    );
}