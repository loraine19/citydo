import { Icon } from "../../../common/IconComp";
import { FlagView } from "../../../../views/viewsEntities/flagViewEntities";
import { FlagTarget } from "../../../../../domain/entities/Flag";
import DI from "../../../../../di/ioc";
import { Action } from "../../../../../domain/entities/frontEntities";
import Chip from "../../../common/adaptatersComps/Chip";
import { CardMD } from "../../base/baseComps/Cards";
import ModifBtnStack from "../../../common/ModifBtnStack";

type FlagCardProps = { flag: FlagView, update: () => void };

export function FlagCard(props: FlagCardProps) {
    const { flag, update } = props;
    const { targetId, createdAt, target, targetS, element, reasonS } = flag;

    const deleteFlag = (targetId: number, target: FlagTarget) =>
        DI.resolve('deleteFlagUseCase').execute(targetId, target);

    const MyActions: Action[] = [
        {
            iconImage: 'close',
            title: "Confirmer la suppression",
            body: `Confirmer la suppression du signalement ${element?.title}, pour le motif ${reasonS}`,
            function: async () => {
                await deleteFlag(targetId, target);
                update();
            },
        }
    ];

    return (
        <CardMD>
            <CardMD.Chips className="justify-between px-3">
                <div className="flex flex-1 items-center gap-2 w-full">
                    <Chip value={targetS} color='cyan' />
                    <Chip value={reasonS} color='error' />
                </div>
                <Icon
                    icon="keyboard_arrow_right"
                    link={`/${targetS}/${targetId}`}
                    title={`voir les details de ${element?.title}`}
                    size="sm"
                    color="slate"
                    bg
                    fill
                />
            </CardMD.Chips>

            <CardMD.Subhead>
                <h6 className="truncate">{element?.title}</h6>
            </CardMD.Subhead>

            <CardMD.SupportingText>
                <Chip value={'signalé le ' + new Date(createdAt).toLocaleDateString('fr-FR')} />
            </CardMD.SupportingText>

            <CardMD.Footer className="justify-start flex-col items-start !gap-0">
                <p>gerer :</p>
                <ModifBtnStack actions={MyActions} />
            </CardMD.Footer>
        </CardMD>
    );
}
