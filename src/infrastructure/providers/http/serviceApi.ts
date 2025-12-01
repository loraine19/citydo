import { Service, ServiceFindParams, ServicePage, ServiceUpdate } from "../../../domain/entities/Service";
import { ServiceDTO } from "../../DTOs/ServiceDTO";
import { ApiService } from "./apiService";

export class ServiceApi {
    ;
    private readonly dataType: string = 'services';
    private readonly api: ApiService;

    constructor() { this.api = new ApiService(); }

    async getServices(page?: number, params?: ServiceFindParams): Promise<ServicePage> {
        let paramss: ServiceFindParams = params ?? {};
        const { mine, type, step, category, sort, reverse, search, groupId } = paramss;
        const pageR = page ? `?page=${page}` : '';
        const mineR = mine ? `&mine=${mine}` : '';
        const typeR = type ? `&type=${type}` : '';
        const stepR = step ? `&step=${step}` : '';
        const sortR = sort ? `&sort=${sort}` : '';
        const reverseR = reverse ? `&reverse=${reverse}` : '';
        const categoryR = category ? `&category=${category}` : '';
        const searchR = search ? `&search=${search}` : '';
        const groupIdR = groupId ? `&groupId=${groupId}` : '';
        return this.api.get(`${this.dataType}${pageR}${mineR}${typeR}${stepR}${categoryR}${sortR}${reverseR}${searchR}${groupIdR}`)
    }

    async getServiceById(id: number): Promise<Service> {
        return this.api.get(`${this.dataType}/${id}`)
    }

    async postService(data: ServiceDTO): Promise<Service> {
        const formData = this.api.createFormData(data);
        return this.api.post(this.dataType, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }

    async updateService(id: number, data: ServiceDTO): Promise<Event> {
        const formData = this.api.createFormData(data);
        return this.api.patch(`${this.dataType}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }

    async deleteService(id: number): Promise<void> {
        return this.api.delete(`${this.dataType}/${id}`)
    }

    async updateServiceStep(id: number, update?: ServiceUpdate): Promise<Service> {
        const updateR = update ? `?update=${update}` : '';
        return this.api.put(`${this.dataType}/${id}${updateR}`)
    }

}