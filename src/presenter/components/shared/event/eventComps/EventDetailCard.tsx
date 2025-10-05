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
import { useRef } from "react";
import BtnExpandImg from "../../../common/BtnExpandImg";
import { IconAnimate } from "../../../common/IconAnimate";
import { Link } from "react-router-dom";
import { Icon } from "../../../common/IconComp";

type EventCardProps = {
    EventLoad: EventView,
    refetch?: () => Promise<void>,
    change?: (e: any) => void,
    expand: boolean
    setExpand: (expand: boolean) => void
}



export function EventDetailCard({ EventLoad, expand, setExpand }: EventCardProps) {
    const { id, title, description, label, image, participantsMin, Participants, User, Address, flagged, eventDateInfo, Group, } = EventLoad;
    const refMore = useRef(null);

    return (
        <CardLarge

            expanded={expand}
            setExpanded={setExpand}
            image={
                <img
                    onError={(e: any) => e.currentTarget.src = 'public/image/placeholder.jpg'}
                    src={image as string || '/image/placeholder.jpg'}
                    alt={title}
                    className='md3-card-large-image' >

                    <div className="!relative ml-12 scale-125 text-white">
                        <IconAnimate
                            active={EventLoad?.Igo}
                            icon={'person'} />
                    </div>
                    <CardLarge.Chips className="justify-end mt-2">
                        <DateChip
                            start={EventLoad?.createdAt}
                            prefix=" " />
                        <BtnExpandImg
                            image={EventLoad?.image as string} />
                    </CardLarge.Chips>
                </img>}>

            <CardLarge.Chips
                className="!relative !z-[3]">
                <div
                    className="md3-card-chips pl-1  w-full ">
                    <Link to={`/evenement?search=&category=${EventLoad?.category}`} >
                        <Chip
                            size="medium"
                            variant="tonal"
                            value={label}
                            color='cyan'>
                        </Chip>
                    </Link>
                    <DateChip
                        size="medium"
                        start={new Date(EventLoad?.start) as Date}
                        end={new Date(EventLoad?.end) as Date}
                        ended={new Date(EventLoad?.end) < new Date()}
                        prefix={'commence dans '} />
                </div>

                <MoreButton
                    title={title}
                    divRef={refMore}
                    ref
                    id={id}
                    type={'evenement'}
                    flagged={flagged} />
            </CardLarge.Chips>

            <CardLarge.Headline>
                {title}
            </CardLarge.Headline>

            <CardLarge.Subhead>
                <div>
                    <GroupLink group={Group} />
                </div>
            </CardLarge.Subhead>

            <CardLarge.Divider />

            <CardLarge.SupportingText className="flex flex-col gap-2 pb-2">
                <h6>Agenda : {eventDateInfo?.duration}</h6>
                <CardLarge.Chips className="flex items-center gap-6 ">

                    {!EventLoad?.isPast && <EventCalAddBtn
                        ref
                        event={EventLoad}
                        iconClass="text-primary md3-cyan-container " />}
                    <div className="flex  gap-3 md3-supporting-text">
                        <Chip

                            icon={<Icon color='green' fill bg icon="event_available" size="md" />}
                            size="medium"
                            value={eventDateInfo?.start} />
                        <Chip
                            icon={<Icon color='error' fill bg icon="event_busy" size="md" />}
                            size="medium"
                            value={eventDateInfo?.end}
                        />
                    </div>
                </CardLarge.Chips>
            </CardLarge.SupportingText>

            <CardLarge.Divider />

            <CardLarge.SupportingText className="flex flex-col gap-2 pb-2">
                <h6>Description</h6>
                {description}
            </CardLarge.SupportingText>

            <CardLarge.Divider />

            <CardLarge.Media className="flex-1 flex flex-col gap-2 pb-2">
                <h6>Localisation</h6>
                <p className="md3-card-supporting-text pl-1 line-clamp-2">
                    {Address ? `${Address?.address}, ${Address?.zipcode} ${Address?.city}` : '...'}
                </p>
                {Address ?
                    <AddressMapOpen
                        address={Address}
                        message={`${Address?.address}, ${Address?.zipcode} ${Address?.city}`} /> :
                    <Skeleton />}
            </CardLarge.Media>

            <CardLarge.Divider />
            <CardLarge.Media className="gap-2 pb-2">
                <h6>Participants</h6>
                <AvatarStack ref avatarDatas={Participants} />
                <ProgressBar
                    size='xxsmall'
                    variant={EventLoad?.Participants?.length >= (participantsMin) ? 'linear' : 'wavy'}
                    value={EventLoad?.Participants?.length}
                    max={participantsMin || 10}
                    color="cyan"
                    label={
                        <div className="md3-card-supporting-text justify-between flex-row">
                            <span>
                                {EventLoad?.Participants?.length} inscrit{EventLoad?.Participants?.length > 1 ? 's' : ''}
                            </span>
                            <span className="opacity-50"> / &nbsp;
                                {participantsMin}
                            </span>
                        </div>}
                />
            </CardLarge.Media>

            <CardLarge.Divider />
            <CardLarge.Footer className={`md3-card-large-footer pb-4`}>
                <div className="flex flex-col gap-2 w-max justify-center ">
                    <h6>Organisateur</h6>
                    <ProfileDiv
                        size="lg"
                        date={EventLoad?.createdAt}
                        profile={User} />
                </div>
            </CardLarge.Footer>
        </CardLarge>
    );
}