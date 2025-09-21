import { Link } from "react-router-dom";
import { Home, KeyboardDoubleArrowDown, PartnerExchange, Search, Event, Dashboard, Ballot, Add, Person, CalendarAddOn, Flag2, ExitToApp, ExploreNearby, Visibility, ArrowCircleRight, Notifications, ArrowCircleRightFilled, ThumbUp, ThumbUpFilled, HomeFilled, PersonFilled, CircleNotifications, CircleNotificationsFilled, PersonEdit, PersonEditFilled, Diversity3, Diversity3Filled, TwoPager, TwoPagerFilled, AddCircleFilled, AddCircle, DoNotDisturbOnFilled, DoNotDisturbOn, ArrowForwardIos, ArrowBackIos, CalendarViewMonth, CalendarViewMonthFilled, SearchFilled, ArrowForwardIosFilled, ArrowBackIosFilled, NotificationsFilled, VisibilityFilled, ExploreNearbyFilled, ExitToAppFilled, Flag2Filled, CalendarAddOnFilled, AddFilled, BallotFilled, DashboardFilled, EventFilled, PartnerExchangeFilled, KeyboardDoubleArrowDownFilled, TollFilled, Toll, ArrowDropDownFilled, ArrowDropDown, CalendarMonth, CalendarMonthFilled, ListFilled, List, CancelFilled, Cancel, CheckCircleFilled, CheckCircle, SmartCardReaderFilled, SmartCardReader, SignalCellularAltFilled, SignalCellularAlt, DesignServicesFilled, DesignServices, CloseFilled, Close, ChevronRight, ChevronRightFilled, MoreUp, MoreUpFilled, ExpandContentFilled, ExpandContent, EditFilled, Edit, GroupsFilled, Groups, PersonCancelFilled, PersonCancel, AddAPhoto, AddAPhotoFilled, VisibilityOffFilled, VisibilityOff, DistanceFilled, Distance, PersonPinCircleFilled, PersonPinCircle, SyncProblemFilled, SyncProblem, KeyboardDoubleArrowUp, KeyboardDoubleArrowUpFilled, SendFilled, Send, ForumFilled, Forum, NearMeFilled, NearMe, Sms, SmsFilled, MoodFilled, Mood, MyLocationFilled, MyLocation, CallFilled, Call, Mail, MailFilled, TodayFilled, Today, LocationOn, LocationOnFilled, ClearAllFilled, ClearAll, CheckFilled, Check, Block, BlockFilled, SaveFilled, Save, SortFilled, Sort, SortByAlphaFilled, SortByAlpha, ArrowDropUpFilled, ArrowDropUp, DeleteFilled, Delete, UndoFilled, Undo, RefreshFilled, Refresh, MoveUpFilled, MoveUp, MoveDownFilled, MoveDown, ArrowUpward, ArrowUpwardFilled, ChatFilled, Chat, SaveAsFilled, SaveAs, RadioButtonCheckedFilled, RadioButtonChecked, PendingActions, PendingActionsFilled, CircleFilled, Circle, ArrowCircleUpFilled, ArrowCircleUp, PersonAddFilled, PersonAdd, KeyboardArrowRight, KeyboardArrowRightFilled, ArrowUpwardAlt, ArrowUpwardAltFilled, ArrowBack, ArrowBackFilled, GridView, GridViewFilled, ViewAgenda, ViewAgendaFilled, Output, OutputFilled, InputFilled, Input, EventBusyFilled, EventAvailableFilled, EventAvailable, EventBusy, PersonHeart, PersonHeartFilled, ViewColumn, ViewColumnFilled, Favorite, FavoriteFilled, HeartMinusFilled, HeartMinus, MoreVert, MoreVertFilled, VotingChip, VotingChipFilled, ListAltCheck, ListAltCheckFilled, ListAltAdd, ListAltAddFilled, FilterAlt, FilterAltFilled, FilterAltOff, FilterAltOffFilled, ShareFilled, Share, MoreHorizFilled, MoreHoriz, VerticalAlignTop, VerticalAlignTopFilled, CheckBox, CheckBoxFilled, CheckBoxOutlineBlank, CheckBoxOutlineBlankFilled, DarkMode, DarkModeFilled, LightMode, LightModeFilled, CalendarToday, CalendarTodayFilled, ImageFilled, Image, ImageArrowUp, ImageArrowUpFilled, HideImageFilled, HideImage, ImageSearchFilled, ImageSearch, AddLocationFilled, AddLocation, ProgressActivity, ProgressActivityFilled } from '@project-lary/react-material-symbols-400-rounded';
import { FaFacebook, FaSnapchatGhost, FaTwitter, FaWhatsapp } from "react-icons/fa"
import { IoLogoWhatsapp } from "react-icons/io";
import { JSX, useState } from "react";


export const iconMap = {
    add: { filled: AddFilled, default: Add },
    add_location: { filled: AddLocationFilled, default: AddLocation },
    add_a_photo: { filled: AddAPhotoFilled, default: AddAPhoto },
    add_circle: { filled: AddCircleFilled, default: AddCircle },
    arrow_back_ios: { filled: ArrowBackIosFilled, default: ArrowBackIos },
    arrow_back: { filled: ArrowBackFilled, default: ArrowBack },
    arrow_circle_right: { filled: ArrowCircleRightFilled, default: ArrowCircleRight },
    arrow_circle_up: { filled: ArrowCircleUpFilled, default: ArrowCircleUp },
    arrow_drop_down: { filled: ArrowDropDownFilled, default: ArrowDropDown },
    arrow_drop_up: { filled: ArrowDropUpFilled, default: ArrowDropUp },
    arrow_forward_ios: { filled: ArrowForwardIosFilled, default: ArrowForwardIos },
    arrow_upward: { filled: ArrowUpwardFilled, default: ArrowUpward },
    arrow_upward_alt: { filled: ArrowUpwardAltFilled, default: ArrowUpwardAlt },
    ballot: { filled: BallotFilled, default: Ballot },
    block: { filled: BlockFilled, default: Block },
    calendar_add_on: { filled: CalendarAddOnFilled, default: CalendarAddOn },
    calendar_month: { filled: CalendarMonthFilled, default: CalendarMonth },
    calendar_view_month: { filled: CalendarViewMonthFilled, default: CalendarViewMonth },
    calendar_today: { filled: CalendarTodayFilled, default: CalendarToday },
    call: { filled: CallFilled, default: Call },
    cancel: { filled: CancelFilled, default: Cancel },
    chat: { filled: ChatFilled, default: Chat },
    check: { filled: CheckFilled, default: Check },
    check_box: { filled: CheckBoxFilled, default: CheckBox },
    check_box_outline_blank: { filled: CheckBoxOutlineBlankFilled, default: CheckBoxOutlineBlank },
    check_circle: { filled: CheckCircleFilled, default: CheckCircle },
    chevron_right: { filled: ChevronRightFilled, default: ChevronRight },
    circle_notifications: { filled: CircleNotificationsFilled, default: CircleNotifications },
    circle: { filled: CircleFilled, default: Circle },
    clear_all: { filled: ClearAllFilled, default: ClearAll },
    close: { filled: CloseFilled, default: Close },
    dashboard: { filled: DashboardFilled, default: Dashboard },
    dark_mode: { filled: DarkModeFilled, default: DarkMode },
    distance: { filled: DistanceFilled, default: Distance },
    design_services: { filled: DesignServicesFilled, default: DesignServices },
    delete: { filled: DeleteFilled, default: Delete },
    diversity_3: { filled: Diversity3Filled, default: Diversity3 },
    do_not_disturb_on: { filled: DoNotDisturbOnFilled, default: DoNotDisturbOn },
    edit: { filled: EditFilled, default: Edit },
    event: { filled: EventFilled, default: Event },
    event_available: { filled: EventAvailableFilled, default: EventAvailable },
    event_busy: { filled: EventBusyFilled, default: EventBusy },
    exit_to_app: { filled: ExitToAppFilled, default: ExitToApp },
    expand_content: { filled: ExpandContentFilled, default: ExpandContent },
    explore_nearby: { filled: ExploreNearbyFilled, default: ExploreNearby },
    favorite: { filled: FavoriteFilled, default: Favorite },
    filter_alt: { filled: FilterAltFilled, default: FilterAlt },
    filter_alt_off: { filled: FilterAltOffFilled, default: FilterAltOff },
    flag_2: { filled: Flag2Filled, default: Flag2 },
    forum: { filled: ForumFilled, default: Forum },
    grid_view: { filled: GridViewFilled, default: GridView },
    groups: { filled: GroupsFilled, default: Groups },
    heart_minus: { filled: HeartMinusFilled, default: HeartMinus },
    home: { filled: HomeFilled, default: Home },
    image: { filled: ImageFilled, default: Image },
    image_arrow_up: { filled: ImageArrowUpFilled, default: ImageArrowUp },
    hide_image: { filled: HideImageFilled, default: HideImage },
    image_search: { filled: ImageSearchFilled, default: ImageSearch },
    input: { filled: InputFilled, default: Input },
    keyboard_double_arrow_down: { filled: KeyboardDoubleArrowDownFilled, default: KeyboardDoubleArrowDown },
    keyboard_double_arrow_up: { filled: KeyboardDoubleArrowUpFilled, default: KeyboardDoubleArrowUp },
    keyboard_arrow_right: { filled: KeyboardArrowRightFilled, default: KeyboardArrowRight },
    light_mode: { filled: LightModeFilled, default: LightMode },
    list: { filled: ListFilled, default: List },
    list_alt_add: { filled: ListAltAddFilled, default: ListAltAdd },
    list_alt_check: { filled: ListAltCheckFilled, default: ListAltCheck },
    location_on: { filled: LocationOnFilled, default: LocationOn },
    mail: { filled: MailFilled, default: Mail },
    mood: { filled: MoodFilled, default: Mood },
    more_up: { filled: MoreUpFilled, default: MoreUp },
    more_vert: { filled: MoreVertFilled, default: MoreVert },
    more_horiz: { filled: MoreHorizFilled, default: MoreHoriz },
    move_up: { filled: MoveUpFilled, default: MoveUp },
    move_down: { filled: MoveDownFilled, default: MoveDown },
    my_location: { filled: MyLocationFilled, default: MyLocation },
    near_me: { filled: NearMeFilled, default: NearMe },
    notifications: { filled: NotificationsFilled, default: Notifications },
    output: { filled: OutputFilled, default: Output },
    partner_exchange: { filled: PartnerExchangeFilled, default: PartnerExchange },
    pending_actions: { filled: PendingActionsFilled, default: PendingActions },
    person: { filled: PersonFilled, default: Person },
    person_cancel: { filled: PersonCancelFilled, default: PersonCancel },
    person_edit: { filled: PersonEditFilled, default: PersonEdit },
    person_add: { filled: PersonAddFilled, default: PersonAdd },
    person_heart: { filled: PersonHeartFilled, default: PersonHeart },
    person_pin_circle: { filled: PersonPinCircleFilled, default: PersonPinCircle },
    progress_activity: { filled: ProgressActivityFilled, default: ProgressActivity },
    radio_button_checked: { filled: RadioButtonCheckedFilled, default: RadioButtonChecked },
    refresh: { filled: RefreshFilled, default: Refresh },
    save: { filled: SaveFilled, default: Save },
    save_as: { filled: SaveAsFilled, default: SaveAs },
    search: { filled: SearchFilled, default: Search },
    share: { filled: ShareFilled, default: Share },
    signal_cellular_alt: { filled: SignalCellularAltFilled, default: SignalCellularAlt },
    sort: { filled: SortFilled, default: Sort },
    sort_by_alpha: { filled: SortByAlphaFilled, default: SortByAlpha },
    smart_card_reader: { filled: SmartCardReaderFilled, default: SmartCardReader },
    sms: { filled: SmsFilled, default: Sms },
    sync_problem: { filled: SyncProblemFilled, default: SyncProblem },
    send: { filled: SendFilled, default: Send },
    thumb_up: { filled: ThumbUpFilled, default: ThumbUp },
    today: { filled: TodayFilled, default: Today },
    toll: { filled: TollFilled, default: Toll },
    two_pager: { filled: TwoPagerFilled, default: TwoPager },
    undo: { filled: UndoFilled, default: Undo },
    vertical_align_top: { filled: VerticalAlignTopFilled, default: VerticalAlignTop },
    view_agenda: { filled: ViewAgendaFilled, default: ViewAgenda },
    view_column: { filled: ViewColumnFilled, default: ViewColumn },
    visibility: { filled: VisibilityFilled, default: Visibility },
    visibility_off: { filled: VisibilityOffFilled, default: VisibilityOff },
    voting_chip: { filled: VotingChipFilled, default: VotingChip },

    // Social icons from react-icons
    facebook: { filled: FaFacebook, default: FaFacebook },
    snapchat: { filled: FaSnapchatGhost, default: FaSnapchatGhost },
    whatsapp: { filled: IoLogoWhatsapp, default: FaWhatsapp },
    twitter: { filled: FaTwitter, default: FaTwitter },


};

function searchIcon(icon: string, fill?: boolean): JSX.Element {
    const IconComponent = iconMap[icon as keyof typeof iconMap];
    if (!IconComponent) return <>{icon}</>;
    return fill ? <IconComponent.filled /> : <IconComponent.default />;
}

export type IconProps = {
    icon: keyof typeof iconMap | string,
    style?: string,
    fill?: boolean,
    size?: string,
    onClick?: () => void,
    color?: string,
    bg?: boolean,
    title?: string,
    link?: string,
    disabled?: boolean
    clear?: boolean,
    reverse?: boolean,
    target?: '_blank' | '_self'
    rel?: 'noopener noreferrer' | string
}
export const sizeMap: any = {
    'xs': { text: 'text-[0.6875rem]', class: 'iconXs' },   // 11px
    'sm': { text: 'text-[0.875rem]', class: 'iconSm' },     // 14px
    'ms': { text: 'text-[1rem]', class: 'iconMs' },         // 16px
    'md': { text: 'text-[1.125rem]', class: 'iconMd' },     // 18px
    'lg': { text: 'text-[1.375rem]', class: 'iconLg' },     // 22px
    'xl': { text: 'text-[1.625rem]', class: 'iconXl' },     // 26px
    '2xl': { text: 'text-[1.875rem]', class: 'icon2xl' },   // 30px
    '3xl': { text: 'text-[2.125rem]', class: 'icon3xl' },   // 34px
    '4xl': { text: 'text-[2.375rem]', class: 'icon4xl' },   // 38px
    '5xl': { text: 'text-[2.625rem]', class: 'icon5xl' },   // 42px
    '6xl': { text: 'text-[2.875rem]', class: 'icon6xl' },   // 46px
}

export const Icon: React.FC<IconProps> = ({
    title,
    disabled,
    onClick,
    icon,
    size = "2xl",
    style,
    link,
    fill,
    clear,
    reverse,
    color,
    bg
}) => {


    const iconSize = (sizeMap[size as keyof typeof sizeMap]?.class ?? 'icon2xl') + '';
    const textSize = sizeMap[size as keyof typeof sizeMap]?.text ?? 'text-[1.875rem]';
    const colorClass = (bg && clear) ? ' !bg-none ' : bg ? reverse ? `md3-${color ?? 'primary'}` : `md3-${color ?? 'primary'}-container` : color ? `md3-text-${color}` : ` text-current `;




    const classIcon = () => `
    flex items-center justify-center 
    ${colorClass}  
    ${bg ? iconSize : textSize} ${style ?? ''} `

    const classActive = `hover:brightness-[0.95] active:brightness-[0.9] hover:scale-[1.03] `
    const [isFill, setIsFill] = useState(fill ? true : false);

    return (
        <div
            onMouseEnter={() => setIsFill(true)}
            onMouseLeave={() => setIsFill(fill ?? false)}
        >
            {onClick ?
                <button
                    data-cy={icon}
                    type="button"
                    onClick={onClick}
                    title={!disabled ? title : `${(title ?? 'cette action')} est indisponible`}
                    className={`group ${classIcon()} ${!disabled ? classActive : ''} `}
                    disabled={disabled}>
                    <span>
                        {searchIcon(icon, isFill)}
                    </span>
                </button>
                : link ?
                    <Link
                        data-cy={icon}
                        to={link}
                        title={!disabled ? title : `${(title ?? 'cette action')} est indisponible`}
                        target={link.startsWith('http') ? "_blank" : ""}
                        rel="noopener noreferrer"
                        className={`group ${classIcon()} ${!disabled && classActive}`}>
                        <span>
                            {searchIcon(icon, isFill)}
                        </span>
                    </Link> :
                    <span

                        data-cy={icon}
                        title={!disabled ? title : `${(title ?? 'cette action')} est indisponible`}
                        className={`group ${classIcon()}  `}>
                        <span>
                            {searchIcon(icon, isFill)}
                        </span>

                    </span>
            }
        </div>)
}
