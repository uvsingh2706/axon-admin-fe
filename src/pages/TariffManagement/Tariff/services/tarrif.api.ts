import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type { TariffListParams, TariffListResponse, TariffDetailResponse, CreateTariffRequest } from "./tarrif.types";

export const tariffApi = {
    getTariffList: async (params: TariffListParams): Promise<TariffListResponse> => {
        const response = await apiClient.get<TariffListResponse>(ApiEndpoints.TARIFF_LIST, { params });
        return response.data;
    },
    getTariffById: async (id: string): Promise<TariffDetailResponse> => {
        const response = await apiClient.get<TariffDetailResponse>(`${ApiEndpoints.TARIFF_LIST}/${id}`);
        return response.data;
    },
    createTariff: async (data: CreateTariffRequest): Promise<void> => {
        const response = await apiClient.post(ApiEndpoints.TARIFF_LIST, data);
        return response.data;
    },
    deleteTariff: async (id: string): Promise<void> => {
        const response = await apiClient.delete(`${ApiEndpoints.TARIFF_LIST}/${id}`);
        return response.data;
    },
    updateTariff: async (id: string, data: CreateTariffRequest): Promise<void> => {
        const response = await apiClient.put(`${ApiEndpoints.TARIFF_LIST}/${id}`, data);
        return response.data;
    }
};