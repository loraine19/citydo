
import { Icon } from "../../../common/IconComp";
import { FlagView } from "../../../../views/viewsEntities/flagViewEntities";
import { FlagTarget } from "../../../../../domain/entities/Flag";
import { ProfileDiv } from "../../../common/ProfilDiv";
import Chip from "../../../common/adaptatersComps/Chip";
import { CardMD } from "../../base/baseComps/Cards";
import { PathElement } from "../../../../constants";

export default function FlagDetailComp({ flag, element }: { flag: FlagView, element?: any, label?: string }) {
    const flagView = new FlagView(flag)

    const { createdAt, title } = flagView
    const now = Date.now();
    const id = flagView.targetId

    return (
        <CardMD
            className="w-full h-full flex-1"
            variant="outlined"
            color='error' >

            <CardMD.Chips>
                <Chip
                    color='cyan'
                    value={flagView.targetS}
                />
                <Chip
                    value={(new Date(createdAt ? createdAt : now)).toLocaleDateString('fr-FR')}
                />
            </CardMD.Chips>

            <CardMD.Subhead>
                <div className="flex-1">
                    {element?.title}
                </div>
                <Icon
                    size="lg"
                    fill
                    icon="expand_content"
                    link={`/${PathElement[flagView.target as unknown as keyof typeof FlagTarget]}/${id}`}
                    title={`voir les details de ${title}`}
                    bg />
            </CardMD.Subhead>

            <CardMD.SupportingText>
                {element?.description}
            </CardMD.SupportingText>

            <CardMD.Footer>
                <ProfileDiv
                    size={'md'}
                    profile={element?.User} />
            </CardMD.Footer>
        </CardMD>
    )
}