import { AvatarStack } from "./AvatarStack";
import { useState } from "react";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { Icon } from "../../../common/IconComp";
import { DateChip } from "../../../common/ChipDate";
import DI from "../../../../../di/ioc";
import { GenereMyActions } from "../../../../views/viewsEntities/utilsService";
import { EventView } from "../../../../views/viewsEntities/eventViewEntities";
import { Title } from "../../../common/CardTitle";
import { EventStatus } from "../../../../../domain/entities/Event";
import { ProgressBarBlur } from "../../../common/ProgressBar";
import Chip from "../../../common/adaptatersComps/Chip";
import EventCalAddBtn from "./EventCalAddBtn";
import { CardMD } from "../../base/baseComps/Cards";
import { useNavigate } from "react-router";
import { Button } from "../../base/baseComps/Buttons";

type EventCardProps = {
    event: EventView, refetch?: () => void,
    change: (e: any) => void,
    mines?: boolean
}

export function EventCard({ event: initialEvent, change, mines, refetch }: EventCardProps) {
    const [event, setEvent] = useState<EventView>(initialEvent);
    const { id, title, participantsMin, start, end, image, pourcent = 0, label, toogleParticipate, eventDateInfo } = event;
    const disabledDelete = new Date(start).getTime() < Date.now();
    const disabledEdit = new Date(start).getTime() < Date.now();
    const deleteEvent = async (id: number) => await DI.resolve('deleteEventUseCase').execute(id)
    const actions = GenereMyActions(event, "evenement", deleteEvent);

    const navigate = useNavigate();
    return (
        <CardMD
            link={`/evenement/${id}`}
            image={
                <CardMD.Image
                    onClick={() => navigate(`/evenement/${id}`)}
                    src={image as string || '/image/placeholder.jpg'}
                    alt={title}
                    className={''}
                >
                    <div className={`w-full flex flex-col justify-between !h-full `}>
                        <div className="flex w-full flex-wrap justify-between items-center gap-2">
                            <button
                                onClick={change}>
                                <Chip
                                    data-cy={`chip-${label}`}
                                    size='sm'
                                    value={label}
                                    className="rounded-full h-max cyanChip shadow" />
                            </button>
                            <DateChip
                                start={start}
                                end={end}
                                ended={new Date(end).getTime() < Date.now()}
                                prefix="dans" />
                        </div>
                        {event.isPast}
                        <ProgressBarBlur
                            isPast={event.isPast}
                            label='participants'
                            value={pourcent || 0}
                            status={event.status as string}
                            needed={participantsMin - (event?.Participants?.length || 0)}
                        />
                    </div>
                </CardMD.Image>}>
            <CardMD.Headline

            >
                <Title title={title}
                    type='evenement'
                />
            </CardMD.Headline>

            <CardMD.SupportingText>
                <p>{eventDateInfo}</p>
                <p className="description line-clamp-1 ">
                    {event.description}
                </p>

            </CardMD.SupportingText>
            <CardMD.Footer>
                {!mines ? (
                    <div className="flex relative flex-1 overflow-hidden -ml-2 items-center gap-2">
                        <EventCalAddBtn
                            event={event}
                            className="-mr-5" iconClass={`${'  top-0 !outline outline-white left-0.5 absolute hover:z-50  '}`} />
                        <AvatarStack avatarDatas={event.Participants} />
                    </div>
                ) : (
                    <ModifBtnStack
                        disabled1={disabledDelete}
                        disabled2={disabledEdit}
                        actions={actions}
                        update={refetch} />
                )}
                <div className="flex items-center ">
                    <Button
                        disabled={event?.status === EventStatus.REJECTED || event?.isPast}
                        data-cy='btn-participate'
                        onClick={async () => {
                            const event = toogleParticipate && await toogleParticipate()
                            event && setEvent(event)
                        }}
                        variant={event?.Igo ? "tonal" : "filled"}
                        color="cyan">
                        <Icon
                            disabled={event?.status === EventStatus.REJECTED || event?.isPast}
                            size="lg"
                            icon={event?.status === EventStatus.REJECTED || event?.isPast || event?.Igo ? "person_cancel" : "person_add"}
                            fill
                            title={event?.Igo ? "Je n'y vais plus" : "Je participe"} />
                    </Button>

                </div>
            </CardMD.Footer>
        </CardMD>
    );
}
