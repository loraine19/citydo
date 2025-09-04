import { Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";
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

type EventCardProps = {
    event: EventView, refetch?: () => void,
    change: (e: any) => void,
    mines?: boolean
}

export function EventCard({ event: initialEvent, change, mines, refetch }: EventCardProps) {
    const [event, setEvent] = useState<EventView>(initialEvent);
    const { id, title, participantsMin, start, end, createdAt, image, flagged, pourcent = 0, label, toogleParticipate, eventDateInfo } = event;
    const disabledDelete = new Date(start).getTime() < Date.now();
    const disabledEdit = new Date(start).getTime() < Date.now();
    const deleteEvent = async (id: number) => await DI.resolve('deleteEventUseCase').execute(id)
    const actions = GenereMyActions(event, "evenement", deleteEvent);
    const haveImage = Boolean(image);


    return (
        <Card className="FixCard w-respLarge">
            <CardHeader
                className={haveImage ? "FixCardHeader" : "FixCardHeaderNoImage"}
                floated={haveImage}>
                <div
                    className={`${haveImage ? "ChipDiv flex-col justify-between !h-full " : "ChipDivNoImage"}`}>
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
                {image && (
                    <div className="CardImageDiv"> <img
                        src={image as string || '/image/placeholder.jpg'}
                        onError={(e) => { e.currentTarget.src = '/image/placeholder.jpg' }}
                        alt={title}
                        className="CardImage" />
                    </div>
                )}
            </CardHeader>
            <CardBody className="FixCardBody">
                <Title
                    title={title}
                    flagged={flagged}
                    id={id}
                    CreatedAt={createdAt}
                    subTitle={eventDateInfo}
                    type='evenement'
                    group={event.Group}
                />
            </CardBody>
            <CardFooter className="CardFooter">
                {!mines ? (
                    <div className="flex relative flex-1 overflow-hidden  items-center gap-2">
                        <EventCalAddBtn event={event} className="-mr-5" iconClass={`${'  top-0 !outline outline-white left-0.5 absolute hover:z-50  '}`} />
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
                    <button
                        disabled={event?.status === EventStatus.REJECTED}
                        data-cy='btn-participate'
                        onClick={async () => {
                            const event = toogleParticipate && await toogleParticipate()
                            event && setEvent(event)
                        }}>
                        <Chip
                            size="sm"
                            value={participantsMin}
                            variant="ghost"
                            className="rounded-full pt-1 grayChip h-max flex items-center  "
                            icon={
                                <Icon
                                    disabled={event?.status === EventStatus.REJECTED || event?.isPast}
                                    size="md"
                                    icon={event?.status === EventStatus.REJECTED || event?.isPast || event?.Igo ? "person" : "person_add"}
                                    fill={event?.Igo}
                                    color={(event?.status === EventStatus.REJECTED || event?.isPast || !event?.Igo) ? "slate" : "cyan"}
                                    title={event?.Igo ? "Je n'y vais plus" : "Je participe"} />}
                        />
                    </button>
                    <Icon
                        icon="arrow_circle_right"
                        link={`/evenement/${id}`}
                        title={`voir les details de ${title}`}
                        bg clear
                        fill />
                </div>
            </CardFooter>
        </Card>
    );
}
