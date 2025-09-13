import { AvatarStack } from "./AvatarStack";
import AddressMapOpen from "../../../common/mapComps/AddressMapOpen";
import { DateChip } from "../../../common/ChipDate";
import { Skeleton } from "../../../common/Skeleton";
import { EventView } from "../../../../views/viewsEntities/eventViewEntities";
import { ProfileDiv } from "../../../common/ProfilDiv";
import Chip from "../../../common/adaptatersComps/Chip";
import EventCalAddBtn from "./EventCalAddBtn";
import { MoreButton } from "../../../common/moreBtn";
import { CardLarge } from "../../base/baseComps/Cards";
import { GroupLink } from "../../../common/GroupLink";
import { ProgressBar } from "../../base/baseComps/Sliders";

type EventCardProps = {
    EventLoad: EventView,
    refetch?: () => Promise<void>,
    change?: (e: any) => void,
    expand: boolean
    setExpand: (expand: boolean) => void
}

export function EventDetailCard({ EventLoad, expand, setExpand }: EventCardProps) {
    const { id, title, description, label, image, participantsMin, Participants, User, Address, flagged, end, start, eventDateInfo, Group, } = EventLoad;

    return (
        <CardLarge
            expanded={expand}
            setExpanded={setExpand}
            image={<img
                onError={(e) => e.currentTarget.src = '/image/placeholder.jpg'}
                src={image as string}
                alt={title}
                className='md3-card-large-image' >
                <CardLarge.Chips className="py-4 px-2 justify-end">
                    <DateChip
                        start={EventLoad?.createdAt}
                        prefix=" " />
                </CardLarge.Chips>


            </img>}
        >


            <CardLarge.Headline className="flex justify-between items-start">
                {title}
                <MoreButton
                    flagged={flagged}
                    id={id}
                    type="evenement"
                />
            </CardLarge.Headline>

            <CardLarge.Subhead>
                <GroupLink group={Group} />

            </CardLarge.Subhead>

            <CardLarge.MidSection className="py-1">
                <CardLarge.SupportingText className="flex sm:flex-1 flex-col sm:gap-2">
                    <h6>Description</h6>
                    <div className="flex -mt-2 items-center gap-2 justify-between border-b border-slate-400">
                        <i>{eventDateInfo.start} - {eventDateInfo.end}</i>
                        <EventCalAddBtn event={EventLoad} className="-mb-1" />
                    </div>
                    {description}
                    <CardLarge.Chips>
                        <Chip
                            value={label}
                            className="cyanChip rounded-full h-max shadow"
                            size='sm'>
                        </Chip>
                        <DateChip
                            start={start}
                            end={end}
                            ended={new Date(end).getTime() < Date.now()}
                            prefix={'commence dans '} />
                    </CardLarge.Chips>
                </CardLarge.SupportingText>
                <CardLarge.Media className="flex-1 sm:gap-2 sm:-mb-4 ">

                    {Address ?
                        <AddressMapOpen
                            address={Address}
                            message={`${Address.address}, ${Address.zipcode} ${Address.city}`} /> :
                        <Skeleton />}
                </CardLarge.Media>
            </CardLarge.MidSection>

            <CardLarge.Media className="gap-1 pb-2">
                <h6>Participants</h6>


                <AvatarStack avatarDatas={Participants} />
                <ProgressBar
                    size='xxsmall'
                    variant={EventLoad?.Participants?.length >= (participantsMin) ? 'linear' : 'wavy'}
                    value={EventLoad?.Participants?.length}
                    max={participantsMin || 10}
                    color="cyan"
                    label={
                        <div className="md3-card-supporting-text justify-between pt-1 flex-row">
                            <span>
                                {EventLoad?.Participants?.length} participant{EventLoad?.Participants?.length > 1 ? 's' : ''}
                            </span>
                            <span className="opacity-50"> / &nbsp;
                                {participantsMin}
                            </span>
                        </div>}
                />
            </CardLarge.Media>
            <CardLarge.Footer >
                <div className="flex flex-col gap-1 py-1 w-max justify-center ">
                    <h6>Organisateur</h6>
                    <ProfileDiv profile={User} />
                </div>




            </CardLarge.Footer>
        </CardLarge>
        // <Card className="CardDetailGrid">
        //     <CardHeader className="DetailCardHeader">
        //         <div className="CardImageDiv">
        //             <img
        //                 onError={(e) => e.currentTarget.src = '/image/placeholder.jpg'}
        //                 src={image as string}
        //                 alt={title}
        //                 className='CardImage' />
        //         </div>
        //         <div className="ChipDiv flex-col justify-between !h-full">
        //             <div className="flex w-full flex-wrap items-center justify-between gap-2">
        // <Chip
        //     value={label}
        //     className="cyanChip rounded-full h-max shadow"
        //     size='sm'>
        // </Chip>
        // <DateChip
        //     start={start}
        //     end={end}
        //     ended={new Date(end).getTime() < Date.now()}
        //     prefix={'commence dans '} />
        //             </div>
        //             <ProgressBarBlur
        //                 isPast={isPast}
        //                 label='participants'
        //                 value={pourcent || 0}
        //                 status={status as string}
        //                 size="lg"
        //                 needed={participantsMin - (Participants?.length || 0)} />
        //         </div>

        //     </CardHeader>

        //     {/* BODY */}
        //     <CardBody className="DetailCardBody">
        //         <Title
        //             large
        //             title={title}

        //         />
        //         <MoreButton
        //             flagged={flagged}
        //             id={id}
        //             type="evenement"
        //         />
        //         <div className="flex flex-1 gap-x-8 flex-col !justify-between sm:!flex-row h-full">
        //             <div className="relative h-max flex w-full flex-col flex-1 ">

        //                 <h6>Description</h6>
        //                 <div className="flex items-center gap-2 justify-between border-b border-slate-400">
        //                     <i>{eventDateInfo.start} - {eventDateInfo.end}</i>
        //                     <EventCalAddBtn event={EventLoad} className="-mb-1" />
        //                 </div>
        //                 <Typography
        //                     className="description">
        //                     {description}
        //                 </Typography>
        //             </div>
        //             <div className="flex flex-col gap-1 !w-full h-full min-h-[50%] md:min-h-[55%] flex-1 ">
        //                 <h6>Lieu</h6>
        //                 {Address ?
        //                     <AddressMapOpen
        //                         address={Address}
        //                         message={`${Address.address}, ${Address.zipcode} ${Address.city}`} /> :
        //                     <Skeleton />}
        //             </div>
        //         </div>
        //     </CardBody>

        //     {/* FOOTER */}
        //     <CardFooter className="DetailCardFooter overflow-hidden">

        // <div className="flex flex-col w-max justify-center">
        //     <h6>Organisateur</h6>
        //     <ProfileDiv profile={User} />
        // </div>

        // <div className="flex flex-1 overflow-auto h-full flex-col px-6 justify-center ">
        //     <h6>Participants</h6>
        //     <AvatarStack avatarDatas={Participants} />
        // </div>

        // <div className="flex flex-col  items-end gap-2">
        //     <h6>Min.</h6>
        //     <button
        //         className="flex flex-1 items-center gap-2"
        //         data-cy='btn-participate'
        //         onClick={async () => {
        //             toogleParticipate && await toogleParticipate();
        //             refetch && await refetch()
        //         }}>
        //         <Chip
        //             size='sm'
        //             value={participantsMin}
        //             variant="ghost"
        //             className="rounded-full grayChip h-max flex items-center px-4 "
        //             icon={
        //                 <Icon
        //                     icon="person"
        //                     size="md"
        //                     fill={Igo}
        //                     color={Igo ? "cyan" : "gray"}
        //                     style=" hover:text-cyan-800 "
        //                     title={Igo ? "Je n'y vais plus" : "j'y vais"} />}>

        //         </Chip>
        //     </button>
        // </div>
        //     </CardFooter>
        // </Card >
    );
}