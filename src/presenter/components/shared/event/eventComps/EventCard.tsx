import { AvatarStack } from "./AvatarStack";
import { useState } from "react";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { DateChip } from "../../../common/ChipDate";
import DI from "../../../../../di/ioc";
import { GenereMyActions } from "../../../../views/viewsEntities/utilsService";
import { EventView } from "../../../../views/viewsEntities/eventViewEntities";
import { Title } from "../../../common/CardTitle";
import { EventStatus } from "../../../../../domain/entities/Event";
import Chip from "../../../common/adaptatersComps/Chip";
import EventCalAddBtn from "./EventCalAddBtn";
import { CardMD } from "../../base/baseComps/Cards";
import { Button } from "../../base/baseComps/Buttons";
import { IconAnimate } from "../../../common/IconAnimate";
import { ProgressBar } from "../../base/baseComps/Sliders";
import { MoreButton } from "../../../common/moreBtn";

type EventCardProps = {
    event: EventView, refetch?: () => void,
    change: (e: any) => void,
    mines?: boolean,
    autoFit?: boolean
}

export function EventCard({ event: initialEvent, change, mines, refetch, autoFit }: EventCardProps) {
    const [event, setEvent] = useState<EventView>(initialEvent);
    const { id, title, participantsMin, start, end, image, label, toogleParticipate, eventDateInfo } = event;
    const disabledDelete = new Date(start).getTime() < Date.now();
    const disabledEdit = new Date(start).getTime() < Date.now();
    const deleteEvent = async (id: number) => await DI.resolve('deleteEventUseCase').execute(id)
    const actions = GenereMyActions(event, "evenement", deleteEvent);



    return (
        <CardMD
            autoFit={autoFit}
            className={` min-h-full  `}
            imagePosition={"top"}
            link={`/evenement/${id}`}
            image={
                <CardMD.Image
                    src={image as string || '/image/placeholder.jpg'}
                    alt={title}
                    className={''} >
                    <div className={`w-full flex flex-col items-end !h-full`}>


                        <DateChip
                            start={event?.createdAt}
                            prefix=" "
                        />
                        <IconAnimate
                            active={event?.Igo}
                            icon={'person'} />
                    </div>
                </CardMD.Image>}>
            <CardMD.Chips className="justify-between">
                <div className="md3-card-chips  flex-wrap !py-0">
                    <button
                        onClick={change}>
                        <Chip
                            data-cy={`chip-${label}`}
                            size='sm'
                            value={label}
                            color='cyan'
                            className="rounded-full h-max " />
                    </button>
                    {new Date(end).getTime() > Date.now() &&
                        <DateChip
                            start={start}
                            end={end}
                            ended={new Date(end).getTime() < Date.now()}
                            prefix=" j-" />}
                    <Chip
                        size="sm"
                        value={eventDateInfo.start}
                        className="rounded-full h-max Chip"
                    />
                </div>
                {<MoreButton
                    id={id} type={'evenement'} flagged={event?.flagged} title={title} />}
            </CardMD.Chips>
            <CardMD.Headline>
                <Title title={title} />
            </CardMD.Headline>

            <CardMD.Media >

                <ProgressBar
                    size='xxsmall'
                    variant={event.Participants.length >= (participantsMin) ? 'linear' : 'wavy'}
                    className=" pb-1 lg:pb-2"
                    value={event.Participants.length}
                    max={participantsMin || 10}
                    color="cyan"
                    label={
                        <div className="md3-card-supporting-text pb-1 justify-between flex-row">
                            <span>
                                {event.Participants.length} participant{event.Participants.length > 1 ? 's' : ''}
                            </span>
                            <span className="opacity-50"> / &nbsp;
                                {participantsMin}
                            </span>
                        </div>}
                />

            </CardMD.Media>
            <CardMD.Footer className="flex items-center">
                {!mines ? (
                    <div className="flex flex-1 mt-0.5 -ml-1 overflow-hidden items-center ">
                        <EventCalAddBtn
                            event={event}
                            iconClass={`${'top-0 border-2 !border-white  hover:z-[999] relative -mr-3 '}`} />

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
                            icon: event?.Igo ? 'person' : 'person_add',
                            fill: event?.Igo,
                            title: event?.Igo ? "retirer de l'evenement" : "je participe"
                        }}
                        size='small'
                        disabled={event?.status === EventStatus.REJECTED || event?.isPast}
                        data-cy='btn-participate'
                        onClick={async () => {
                            const event = toogleParticipate && await toogleParticipate()
                            event && setEvent(event)
                        }}
                        variant={!event?.Igo ? "tonal" : "filled"}
                        color="cyan" />
                </div>
            </CardMD.Footer>
        </CardMD >
    );
}
