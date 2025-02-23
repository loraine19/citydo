import { ApiService } from "../../infrastructure/providers/http/apiService";
import { Pool, PoolDTO, Survey } from "../entities/PoolSurvey";

const api: ApiService = new ApiService()
const dataTypeComb = "pools-surveys";
const dataType = "pools";

export interface PoolSurveyRepository {
    getPoolsSurveys: () => Promise<(Pool | Survey)[]>,
    getPoolsSurveysMines: () => Promise<(Pool | Survey)[]>,
    getPoolsSurveysNew: () => Promise<(Pool | Survey)[]>,
}

export class PoolSurveyService implements PoolSurveyRepository {
    getPoolsSurveys = async (): Promise<(Pool | Survey)[]> => api.get(dataTypeComb)
    getPoolsSurveysMines = async (): Promise<(Pool | Survey)[]> => api.get(`${dataType}/mines`)
    getPoolsSurveysNew = async (): Promise<(Pool | Survey)[]> => api.get(`${dataType}/new`)
}

export interface PoolRepository {
    getPools: () => Promise<Pool[]>,
    getPoolById: (id: number) => Promise<Pool>,
    getPoolsMines: () => Promise<Pool[]>,
    deletePool: (id: number) => Promise<Pool>,
    patchPool: (id: number, profile: PoolDTO) => Promise<Pool>,
    postPool: (profile: PoolDTO) => Promise<Pool>,
}

export class PoolService implements PoolRepository {
    getPools = async (): Promise<Pool[]> => api.get(dataType)
    getPoolById = async (id: number): Promise<Pool> => api.get(`${dataType}/${id}`)
    getPoolsMines = async (): Promise<Pool[]> => api.get(`${dataType}/mines`)
    deletePool = async (id: number): Promise<Pool> => api.delete(`${dataType}/${id}`)
    patchPool = async (id: number, data: PoolDTO): Promise<Pool> => api.patch(`${dataType}/${id}`, data)
    postPool = async (data: PoolDTO): Promise<Pool> => api.post(dataType, data)
}
