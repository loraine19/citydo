import { Pool, PoolDTO, PoolSurveyPage, PoolSurveysFindParams } from "../../../domain/entities/PoolSurvey";
import { SurveyDTO } from "../../DTOs/PoolSurveyDTO";
import { ApiServiceI, ApiService } from "./apiService";

export class PoolSurveyApi {
    private readonly dataType: string = 'poolsSurveys';
    private readonly api: ApiServiceI;

    constructor() {
        this.api = new ApiService();
        this.getPoolsSurveys = this.getPoolsSurveys.bind(this);
    }

    async getPoolsSurveys(page?: number, params?: PoolSurveysFindParams): Promise<PoolSurveyPage> {
        const { filter, step, sort, reverse, search, groupId } = params || {};
        const pageR = page ? `?page=${page}` : '';
        const filterR = filter ? `&filter=${filter}` : '';
        const stepR = step ? `&step=${step}` : '';
        const sortR = sort ? `&sort=${sort}` : '';
        const reverseR = reverse ? `&reverse=${reverse}` : '';
        const searchR = search ? `&search=${search}` : '';
        const groupIdR = groupId ? `&groupId=${groupId}` : '';
        return this.api.get(`${this.dataType}${pageR}${filterR}${stepR}${sortR}${reverseR}${searchR}${groupIdR}`);

    }

    ///POOLS

    async getPoolById(id: number): Promise<Pool> {
        return this.api.get(`${this.dataType}/pool/${id}`)
    }

    async postPool(data: PoolDTO): Promise<Pool> {
        return this.api.post(`${this.dataType}/pool`, data)
    }

    async updatePool(id: number, data: PoolDTO): Promise<Pool> {
        return this.api.patch(`${this.dataType}/pool/${id}`, data)
    }

    async deletePool(id: number): Promise<Event> {
        return this.api.delete(`${this.dataType}/pool/${id}`);
    }



    ///SURVEYS

    async getSurveyById(id: number): Promise<Pool> {
        return this.api.get(`${this.dataType}/survey/${id}`)
    }

    async postSurvey(data: SurveyDTO): Promise<Event> {
        const formData = this.api.createFormData(data);
        return this.api.post(`${this.dataType}/survey`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    async updateSurvey(id: number, data: SurveyDTO): Promise<Event> {
        const formData = this.api.createFormData(data);
        return this.api.patch(`${this.dataType}/survey/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    async deleteSurvey(id: number): Promise<Event> {
        return this.api.delete(`${this.dataType}/survey/${id}`);
    }
}
