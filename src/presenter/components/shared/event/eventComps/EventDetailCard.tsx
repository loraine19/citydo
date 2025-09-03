import { Card, CardHeader, CardBody, CardFooter, Typography, } from "@material-tailwind/react";
import { AvatarStack } from "./AvatarStack";
import AddressMapOpen from "../../../common/mapComps/AddressMapOpen";
import { Icon } from "../../../common/IconComp";
import { DateChip } from "../../../common/ChipDate";
import { Skeleton } from "../../../common/Skeleton";
import { EventView } from "../../../../views/viewsEntities/eventViewEntities";
import { Title } from "../../../common/CardTitle";
import { ProgressBarBlur } from "../../../common/ProgressBar";
import { ProfileDiv } from "../../../common/ProfilDiv";
import Chip from "../../../common/adaptatersComps/Chip";
import EventCalAddBtn from "./EventCalAddBtn";

type EventCardProps = {
    EventLoad: EventView,
    refetch?: () => Promise<void>,
    change?: (e: any) => void
}

export function EventDetailCard({ EventLoad, refetch }: EventCardProps) {
    const { id, title, description, label, image, participantsMin, pourcent, Participants, Igo, User, Address, flagged, end, start, toogleParticipate, eventDateInfo, status, isPast, Group } = EventLoad;

    return (

        <Card className="CardDetailGrid">
            <CardHeader className="DetailCardHeader">
                <div className="ChipDiv flex-col justify-between !h-full">
                    <div className="flex w-full flex-wrap items-center justify-between gap-2">
                        <Chip
                            value={label}
                            className="CyanChip rounded-full h-max shadow"
                            size='sm'>
                        </Chip>
                        <DateChip
                            start={start}
                            end={end}
                            ended={new Date(end).getTime() < Date.now()}
                            prefix={'commence dans '} />
                    </div>
                    <ProgressBarBlur
                        isPast={isPast}
                        label='participants'
                        value={pourcent || 0}
                        status={status as string}
                        size="lg"
                        needed={participantsMin - (Participants?.length || 0)} />
                </div>
                <div className="CardImageDiv">
                    <img
                        onError={(e) => e.currentTarget.src = '/image/placeholder.jpg'}
                        src={image as string}
                        alt={title}
                        className='CardImage' />
                </div>
            </CardHeader>

            {/* BODY */}
            <CardBody className="DetailCardBody">
                <Title
                    title={title}
                    flagged={flagged}
                    id={id}
                    CreatedAt={start}
                    type='evenement'
                    group={Group}
                />
                <div className="flex flex-1 gap-x-8 flex-col  sm:!justify-evenly sm:!flex-row h-full">
                    <div className="relative h-max flex w-full flex-col flex-1 ">

                        <h6>Description</h6>
                        <div className="flex items-center gap-2 justify-between border-b border-slate-400">
                            <i>{eventDateInfo}</i>
                            <EventCalAddBtn event={EventLoad} className="-mb-1" />
                        </div>
                        <Typography
                            className="description">
                            {description}
                        </Typography>
                    </div>
                    <div className="flex flex-col gap-1 !w-full h-full min-h-[55%] flex-1 ">
                        <h6>Lieu</h6>
                        {Address ?
                            <AddressMapOpen
                                address={Address}
                                message={`${Address.address}, ${Address.zipcode} ${Address.city}`} /> :
                            <Skeleton />}
                    </div>
                </div>
            </CardBody>

            {/* FOOTER */}
            <CardFooter className="DetailCardFooter overflow-hidden">

                <div className="flex flex-col w-max justify-center">
                    <h6>Organisateur</h6>
                    <ProfileDiv profile={User} />
                </div>

                <div className="flex flex-1 overflow-auto flex-col px-6 justify-center ">
                    <h6>Participants</h6>
                    <AvatarStack avatarDatas={Participants} />
                </div>

                <div className="flex flex-col  items-end gap-2">
                    <h6>Min.</h6>
                    <button
                        className="flex flex-1 items-center gap-2"
                        data-cy='btn-participate'
                        onClick={async () => {
                            toogleParticipate && await toogleParticipate();
                            refetch && await refetch()
                        }}>
                        <Chip
                            size='sm'
                            value={participantsMin}
                            variant="ghost"
                            className="rounded-full GrayChip h-max flex items-center px-4 "
                            icon={
                                <Icon
                                    icon="person"
                                    size="md"
                                    fill={Igo}
                                    color={Igo ? "cyan" : "gray"}
                                    style=" hover:text-cyan-800 "
                                    title={Igo ? "Je n'y vais plus" : "j'y vais"} />}>

                        </Chip>
                    </button>
                </div>
            </CardFooter>
        </Card >
    );
}