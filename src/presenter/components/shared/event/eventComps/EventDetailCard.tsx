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

type EventCardProps = {
    EventLoad: EventView,
    refetch?: () => Promise<void>,
    change?: (e: any) => void,
    expand: boolean
    setExpand: (expand: boolean) => void
}



export function EventDetailCard({ EventLoad, expand, setExpand }: EventCardProps) {
    const { id, title, description, label, image, participantsMin, Participants, User, Address, flagged, end, start, eventDateInfo, Group, } = EventLoad;
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
                    <CardLarge.Chips className="p-2 mt-1 justify-end">
                        <DateChip
                            start={EventLoad?.createdAt}
                            prefix=" " />
                    </CardLarge.Chips>
                </img>}>

            <CardLarge.Chips

                className="!relative !z-[999]">
                <div
                    className="md3-card-chips w-full ">
                    <Chip
                        value={label}
                        color='cyan'>
                    </Chip>
                    <DateChip
                        start={start}
                        end={end}
                        ended={new Date(end).getTime() < Date.now()}
                        prefix={'commence dans '} />
                </div>

                <MoreButton
                    divRef={refMore}
                    ref
                    id={id}
                    type={'annonce'}
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

            <CardLarge.MidSection className="px-0 gap-3">
                <CardLarge.SupportingText className="flex sm:flex-1 flex-col gap-1 ">
                    <div className="flex items-center -mt-3 justify-between border-b border-slate-400">
                        <i>{eventDateInfo?.start} - {eventDateInfo?.end}</i>
                        <EventCalAddBtn
                            ref
                            event={EventLoad}
                            iconClass="!-mb-1.5 md:-mr-6 relative" />
                    </div>
                    {description}

                </CardLarge.SupportingText>
                <CardLarge.Media className="flex-1  sm:-mb-4 ">
                    {Address ?
                        <AddressMapOpen
                            address={Address}
                            message={`${Address?.address}, ${Address?.zipcode} ${Address?.city}`} /> :
                        <Skeleton />}
                </CardLarge.Media>
            </CardLarge.MidSection>

            <CardLarge.Media className="gap-2 pb-2">
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
            <CardLarge.Footer className={`md3-card-large-footer `}>
                <div className="flex flex-col gap-2 w-max justify-center ">
                    <h6>Organisateur</h6>
                    <ProfileDiv
                        date={EventLoad?.createdAt}
                        profile={User} />
                </div>
            </CardLarge.Footer>
        </CardLarge>
    );
}