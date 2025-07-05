import { defaultClient } from '../utils/axiosClient';

export interface AllocateAirtimeDto {
    phone: string;
    amount: string;
    network: string;
    pin?: string;
}

export interface AllocateAirtimeResponse {
    success: boolean;
    message: string;
    transactionId?: string;
    newBalance?: number;
}

export const allocateAirtime = async (data: AllocateAirtimeDto): Promise<AllocateAirtimeResponse> => {
    return await defaultClient.post<AllocateAirtimeResponse>('/allocate/allocateAirtime', data);
}; 