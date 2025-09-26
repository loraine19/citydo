
import { Icon } from "../../../common/IconComp";
import { FlagView } from "../../../../views/viewsEntities/flagViewEntities";
import { FlagTarget } from "../../../../../domain/entities/Flag";
import { ProfileDiv } from "../../../common/ProfilDiv";
import Chip from "../../../common/adaptatersComps/Chip";
import { CardMD } from "../../base/baseComps/Cards";

export default function FlagDetailComp(props: { flag: FlagView, element?: any, label?: string }) {
    const flag = new FlagView(props.flag)

    const { createdAt, element, target, title } = flag
    const now = Date.now();
    const id = flag.targetId

    return (
        <CardMD variant="outlined" color='error' >
            <CardMD.Chips>
                <Chip color='cyan' value={FlagTarget[flag.target as unknown as keyof typeof FlagTarget]
                    || props.label || ''}

                />

                <Chip
                    value={(new Date(createdAt ? createdAt : now)).toLocaleDateString('fr-FR')}
                />
            </CardMD.Chips>
            <CardMD.Subhead>
                {element?.title}
            </CardMD.Subhead>

            <CardMD.SupportingText>
                {element?.description}
            </CardMD.SupportingText>
            <CardMD.Footer>
                <ProfileDiv
                    profile={element?.User} />

                <Icon fill
                    icon="arrow_circle_right"
                    link={`/${target}/${id}`}
                    title={`voir les details de ${title}`}
                    bg />

            </CardMD.Footer>
        </CardMD>
    )
}