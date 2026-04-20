import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type { 
  TaxListParams, 
  TaxListResponse, 
  TaxDetailResponse, 
  CreateTaxRequest, 
  UpdateTaxRequest 
} from "./Tax.types";

export const taxApi = {
    getTaxList: async (params: TaxListParams): Promise<TaxListResponse> => {
        const response = await apiClient.get<TaxListResponse>(ApiEndpoints.TAX_LIST, { params });
        return response.data;
    },
    getTaxById: async (id: string): Promise<TaxDetailResponse> => {
        const response = await apiClient.get<TaxDetailResponse>(`${ApiEndpoints.TAX_LIST}/${id}`);
        return response.data;
    },
    createTax: async (data: CreateTaxRequest): Promise<void> => {
        const response = await apiClient.post(ApiEndpoints.TAX_LIST, data);
        return response.data;
    },
    updateTax: async ({ id, data }: { id: string; data: UpdateTaxRequest }): Promise<void> => {
        const response = await apiClient.put(`${ApiEndpoints.TAX_LIST}/${id}`, data);
        return response.data;
    },
    deleteTax: async ({ id, shouldDeleteOthers }: { id: string; shouldDeleteOthers?: boolean }): Promise<void> => {
        const params = shouldDeleteOthers !== undefined ? { shouldDeleteOthers } : undefined;
        await apiClient.delete(`${ApiEndpoints.TAX_LIST}/${id}`, { params });
    },
};
