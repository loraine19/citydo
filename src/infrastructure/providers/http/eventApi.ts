import { Event, EventFindParams, EventPage } from "../../../domain/entities/Event";
import { EventDTO } from "../../DTOs/EventDTO";

import { ApiServiceI, ApiService } from "./apiService";

export class EventApi {
    private readonly dataType: string = 'events';

    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }

    async getEvents(page?: number, params?: EventFindParams): Promise<EventPage> {
        let paramss: EventFindParams = params ?? {};
        const { filter, category, sort, reverse, search } = paramss;
        const pageR = page ? `?page=${page}` : '';
        const filterR = filter ? `&filter=${filter}` : '';
        const categoryR = category ? `&category=${category}` : '';
        const sortR = sort ? `&sort=${sort}` : '';
        const reverseR = reverse ? `&reverse=${reverse}` : ''
        const searchR = search ? `&search=${search}` : '';
        return this.api.get(`${this.dataType}${pageR}${filterR}${categoryR}${sortR}${reverseR}${searchR}`);
    }

    async getEventById(id: number): Promise<Event> {
        return this.api.get(`${this.dataType}/${id}`);
    }

    async postEvent(event: EventDTO): Promise<Event> {
        const formData = this.api.createFormData(event);
        return this.api.post(this.dataType, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    async updateEvent(id: number, event: EventDTO): Promise<Event> {
        const formData = this.api.createFormData(event);
        console.log(event)
        return this.api.patch(`${this.dataType}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    async deleteEvent(id: number): Promise<Event> {
        return this.api.delete(`${this.dataType}/${id}`);
    }
}