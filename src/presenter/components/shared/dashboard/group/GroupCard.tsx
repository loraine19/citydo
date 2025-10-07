import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GenereMyActions } from "../../../../views/viewsEntities/utilsService";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { GroupView } from "../../../../views/viewsEntities/GroupViewEntity";
import DI from "../../../../../di/ioc";
import { Icon } from "../../../common/IconComp";
import AddressMapOpen from "../../../common/mapComps/AddressMapOpen";
import Chip from "../../../common/adaptatersComps/Chip";
import { CardMD } from "../../base/baseComps/Cards";
import { Button } from "../../base/baseComps/Buttons";
import { MoreButton } from "../../../common/moreBtn";

type GroupCardProps = {
    group: GroupView,
    refetch?: () => void,
    mines?: boolean,
    autoFit?: boolean,
    variant?: 'outlined' | 'filled' | 'elevated',
    imagePosition?: 'top' | 'left'
}

export function GroupCard({
    group: initialGroup,
    mines,
    refetch,
    autoFit,
    variant = 'elevated',
    imagePosition = 'top'
}: GroupCardProps) {
    const [group, setGroup] = useState<GroupView>(initialGroup);
    const { id, name, Address, area, fullAddress, categoryS, ImModo, ImIn, toogleModo } = group;
    const deletegroup = async (id: number) => await DI.resolve('deletegroupUseCase').execute(id)
    const actions = GenereMyActions(group, "groupe", deletegroup);
    const navigate = useNavigate();

    return (
        <CardMD
            imagePosition={imagePosition}
            variant={variant}
            autoFit={autoFit}
            className="min-h-full fadeIn !pt-0"
            image={
                <CardMD.Image
                    className='!p-0 !-mt-4'
                    onClick={() => navigate(`/groupe/${id}`)}
                    src={Address ? '' : ''}
                    alt={name}
                >
                    {Address && (
                        <div className="-mt-4 inset-0 min-h-[10rem] flex-1 flex  h-full">
                            <AddressMapOpen
                                color="#0092b8"
                                aera={area}
                                address={Address}
                            />
                        </div>
                    )}

                </CardMD.Image>
            }
        >
            <>
                <CardMD.Chips className=" justify-between">
                    <Chip value={categoryS} />
                    <div className="flex flex-1 gap-1 items-center justify-end">

                        <MoreButton
                            id={id}
                            type={'groupe'}
                            title={name}
                        />
                    </div>

                </CardMD.Chips>
                <CardMD.Headline onClick={() => navigate(`/groupe/${id}`)} className="line-clamp-1">
                    {name}
                </CardMD.Headline>
                <CardMD.Subhead className="flex flex-col flex-1 gap-1 justify-start items-start" >
                    <p > {(fullAddress || '')}  </p>
                    <i> {area ? ` ${area} mètres` : ''}</i>

                </CardMD.Subhead>

                <CardMD.Footer className="flex items-center">
                    {mines ?
                        <ModifBtnStack
                            disabled1={false}
                            disabled2={false}
                            actions={actions}
                            update={refetch}
                        />
                        :
                        <div className="flex items-center gap-4">
                            <Button
                                variant={'tonal'}
                                icon={{
                                    icon: ImModo ? 'diversity_3' : 'diversity_3',
                                    fill: ImModo,

                                    title: ImModo ? 'Je suis conciliateur' : 'Je ne suis pas conciliateur',
                                }}
                                color="orange"
                                onClick={async () => {
                                    const groupUpdated = toogleModo && (await toogleModo());
                                    groupUpdated && setGroup(groupUpdated);
                                }}
                            >
                                {ImModo ? '✓' : '+'}
                            </Button>
                            <Button
                                icon={{
                                    icon: 'groups',
                                    fill: ImIn,
                                    title: ImIn ? 'Je suis membre' : 'Je ne suis pas membre',
                                }}
                                variant={'tonal'}
                                color="cyan"
                                onClick={() => navigate(`/groupe/${id}`)}
                            >{ImIn ? '✓' : '+'}
                            </Button>
                        </div>}
                    <Icon
                        icon="keyboard_arrow_right"
                        link={`/groupe/${id}`}
                        title={`voir les details de ${name}`}
                        fill
                    />
                </CardMD.Footer>
            </>
        </CardMD >
    );
}
