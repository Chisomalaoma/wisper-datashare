import api from './index';

export interface Transaction {
    id: string;
    trx_ref: string;
    oldBal: number;
    newBal: number;
    status: 'successful' | 'failed' | 'pending' | 'refunded';
    desc?: string;
    amountInNaira: number;
    debit_credit: 'debit' | 'credit';
    transaction_origin: 'WALLET_TOPUP' | 'INWARD_TRANSFER' | 'OUTWARD_TRANSFER' | 'AIRTIME_PURCHASE' | 'DATA_PURCHASE';
    createdAt: string;
    updatedAt: string;
}

export interface TransactionsResponse {
    data: Transaction[];
    totalPages: number;
}

export const getTransactions = async (page: number = 1, limit: number = 20): Promise<TransactionsResponse> => {
    const response = await api.get(`/transactions?page=${page}&limit=${limit}`);
    return response.data;
};
