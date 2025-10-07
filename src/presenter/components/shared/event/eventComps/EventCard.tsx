import { AvatarStack } from "./AvatarStack";
import { useState } from "react";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { DateChip } from "../../../common/ChipDate";
import DI from "../../../../../di/ioc";
import { GenereMyActions } from "../../../../views/viewsEntities/utilsService";
import { EventView } from "../../../../views/viewsEntities/eventViewEntities";
import { EventStatus } from "../../../../../domain/entities/Event";
import Chip from "../../../common/adaptatersComps/Chip";
import EventCalAddBtn from "./EventCalAddBtn";
import { CardMD } from "../../base/baseComps/Cards";
import { Button } from "../../base/baseComps/Buttons";
import { IconAnimate } from "../../../common/IconAnimate";
import { ProgressBar } from "../../base/baseComps/Sliders";
import { MoreButton } from "../../../common/moreBtn";
import { useNavigate } from "react-router-dom";

type EventCardProps = {
    event: EventView, refetch?: () => void,
    change: (e: any) => void,
    mines?: boolean,
    autoFit?: boolean,
    variant?: 'outlined' | 'filled' | 'elevated',
    imagePosition?: 'top' | 'left'
}

export function EventCard({ event: initialEvent, change, mines, refetch, autoFit, variant = 'elevated', imagePosition = 'top' }: EventCardProps) {
    const [event, setEvent] = useState<EventView>(initialEvent);
    const { id, title, participantsMin, start, end, image, label, toogleParticipate, eventDateInfo } = event;
    const disabledDelete = new Date(start).getTime() < Date.now();
    const disabledEdit = new Date(start).getTime() < Date.now();
    const deleteEvent = async (id: number) => await DI.resolve('deleteEventUseCase').execute(id)
    const actions = GenereMyActions(event, "evenement", deleteEvent);
    const navigate = useNavigate();


    return (
        <CardMD
            imagePosition={imagePosition}
            variant={variant}
            autoFit={autoFit}
            className={` min-h-full fadeIn `}
            image={
                <CardMD.Image
                    onClick={() => navigate(`/evenement/${id}`)}
                    src={image as string || '/image/placeholder.jpg'}
                    alt={title} >
                    <IconAnimate
                        active={event?.Igo}
                        icon={'person'} />
                    <CardMD.Chips className="px-0.5 max-h-max w-full justify-end">
                        <DateChip
                            start={event?.createdAt}
                            prefix=" " />
                        <MoreButton
                            id={id}
                            type={'evenement'}
                            flagged={event?.flagged}
                            title={title} />
                    </CardMD.Chips>
                </CardMD.Image>}>

            <CardMD.Chips >
                <Chip
                    variant="tonal"
                    onClick={change}
                    data-cy={`chip-${label}`}
                    value={label}
                    color='cyan' />

                <Chip
                    variant="tonal"
                    value={eventDateInfo.start}
                />
                {new Date(end).getTime() > Date.now() &&
                    <DateChip

                        start={start}
                        end={end}
                        ended={new Date(end).getTime() < Date.now()}
                        prefix=" j-" />}
            </CardMD.Chips>

            <CardMD.Headline
                onClick={() => navigate(`/evenement/${id}`)}
                className="line-clamp-1">
                {title}
            </CardMD.Headline>

            <CardMD.Media className="flex-1" >
                <ProgressBar
                    size='xxsmall'
                    variant={event.Participants?.length >= (participantsMin) ? 'linear' : 'wavy'}
                    className=" "
                    value={event.Participants?.length}
                    max={participantsMin || 10}
                    color="cyan"
                    label={
                        <div className="md3-card-supporting-text  justify-between flex-row">
                            <span>
                                {event.Participants?.length} participant{event.Participants?.length > 1 ? 's' : ''}
                            </span>
                            <span className="opacity-50"> / &nbsp;
                                {participantsMin}
                            </span>
                        </div>}
                />
            </CardMD.Media>

            <CardMD.Footer className="flex items-center">
                {!mines ? (
                    <div className="flex flex-1 my-0.5 -ml-1 overflow-hidden items-center ">
                        <EventCalAddBtn
                            event={event}
                            iconClass={`${'top-0 border-[4px] !border-[var(--md3-primary-container)]  hover:z-[2] relative -mr-3 '}`} />

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
                        icon={{
                            style: '-mt-[1px]',
                            icon: event?.Igo ? 'person_check' : 'person_add',
                            fill: event?.Igo,
                            title: event?.Igo ? "retirer de l'evenement" : "je participe"
                        }}
                        disabled={event?.status === EventStatus.REJECTED || event?.isPast}
                        data-cy='btn-participate'
                        onClick={async () => {
                            const event = toogleParticipate && await toogleParticipate()
                            event && setEvent(event)
                            refetch && refetch()
                        }}
                        variant={!event?.Igo ? "tonal" : "filled"}
                        color="cyan" />
                </div>
            </CardMD.Footer>
        </CardMD >
    );
}
