import { defaultClient } from '../utils/axiosClient';
import { API_CONFIG } from '../config/apiConfig';

export interface DataPlan {
    id: string;
    plan_id: number;
    network: string;
    price: number;
    resellerPrice: number;
    volume: number;
    unit: 'mb' | 'gb' | 'tb';
    validity: string;
}

export type DataPlansByNetwork = {
    [network: string]: DataPlan[];
};

// Fetch all data plans
export const getDataPlans = async (): Promise<DataPlansByNetwork> => {
    return defaultClient.get<DataPlansByNetwork>(API_CONFIG.ENDPOINTS.DATAPLAN.GET);
};

export interface AllocateDataDto {
    phone: string;
    plan_size: string;
    network: string;
    pin?: string;
}

export interface AllocateDataResponse {
    success: boolean;
    message: string;
    transactionId?: string;
    newBalance?: number;
}

export const allocateData = async (data: AllocateDataDto): Promise<AllocateDataResponse> => {
    return await defaultClient.post<AllocateDataResponse>('/allocate/allocateData', data);
}; 