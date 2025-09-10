import { Event, EventCategory, EventStatus } from "../../../domain/entities/Event";
import { Flag } from "../../../domain/entities/Flag";
import { dayMS } from "../../../domain/entities/frontEntities";
import DI from "../../../di/ioc";
import { EventImage } from "../../constants";


export class EventView extends Event {
    actif?: boolean;
    isPast: boolean;
    days?: Date[] | string[];
    Igo: boolean;
    label: string;
    pourcent: number;
    flagged: boolean;
    mine: boolean;
    isValidate: boolean;
    agendaLink: string;
    agendaICalLink: string;
    eventDateInfo: { start: string; end: string };
    toogleParticipate: () => Promise<EventView | any>;
    image: string = '';

    constructor(event: Event, userId: number) {
        super(event)
        if (!event) {
            throw new Error('Impossible de récupérer l\'événement')
        }
        this.isPast = new Date(event?.end) < new Date(Date.now());
        this.image = (typeof event?.image === 'string' && event?.image) ? event.image : this.getDefaultImage(event?.category as EventCategory);
        this.days = this.getDays(event);
        this.Igo = event?.Participants?.some((p) => p.userId === userId) ? true : false;
        this.mine = event?.userId === userId;
        this.label = EventCategory[event?.category as unknown as keyof typeof EventCategory];
        this.pourcent = Math.floor((event?.Participants?.length || 0) / event?.participantsMin * 100);
        this.flagged = event?.Flags ? event?.Flags?.some((flag: Flag) => flag.userId === userId) : false;
        this.agendaLink = this.generateCalendarLink(event);
        this.agendaICalLink = this.generateICalLink(event);
        this.eventDateInfo = this.eventdateInfo(event);
        this.isValidate = this.status === EventStatus.VALIDATED || event?.Participants?.length >= event.participantsMin;
        this.toogleParticipate = async () => {
            await DI.resolve('toogleParticipantUseCase').execute(event, event.id, userId);
            const updatedEvent = await DI.resolve('getEventByIdUseCase').execute(event.id);
            if (!updatedEvent) throw new Error('Impossible de mettre à jour la participation à l\'événement');
            return new EventView(updatedEvent, userId);
        }
    }

    private eventdateInfo = (event: Event) => {
        return {
            start: new Date(event.start).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric', minute: 'numeric', hour: 'numeric' }),
            end: (new Date(event?.start).toDateString() === new Date(event?.end).toDateString() ?
                new Date(event?.end).toISOString().slice(11, 16) :
                new Date(event?.end).toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric', minute: 'numeric', hour: 'numeric' }))
        }
    }

    private generateCalendarLink(event: Event): string {
        const start = new Date(event?.start).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const end = new Date(event?.end).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const title = encodeURIComponent(event.title);
        const location = encodeURIComponent(`${event.Address.address} , ${event.Address.zipcode} ${event.Address.city}` || "");
        const details = encodeURIComponent(event.description || "");
        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    }

    // Generates a link for native calendar apps (iCal format)
    public generateICalLink(event: Event): string {
        const dtStart = new Date(event?.start).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const dtEnd = new Date(event?.end).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const title = event.title;
        const location = `${event.Address.address} , ${event.Address.zipcode} ${event.Address.city}` || "";
        const description = event.description || "";
        const icsContent =
            `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DTSTART:${dtStart}
DTEND:${dtEnd}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;
        return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
    }



    private getDays(event: Event): Date[] {
        const start = new Date(event?.start).getTime();
        const end = new Date(event?.end).getTime();
        const days: Date[] = [];
        for (let time = start; time <= end; time += dayMS) {
            days.push(new Date(time));
        }
        return days;
    }

    public getDefaultImage(category: EventCategory): string {
        switch (category) {
            case EventCategory.CATEGORY_1:
                return EventImage.CATEGORY_1;
            case EventCategory.CATEGORY_2:
                return EventImage.CATEGORY_2;
            case EventCategory.CATEGORY_3:
                return EventImage.CATEGORY_3;
            case EventCategory.CATEGORY_4:
                return EventImage.CATEGORY_4;
            case EventCategory.CATEGORY_5:
                return EventImage.CATEGORY_5;
            default:
                return EventImage.default;
        }
    }

}
