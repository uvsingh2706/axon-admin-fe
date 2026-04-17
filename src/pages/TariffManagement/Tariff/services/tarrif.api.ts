import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type { TariffListParams, TariffListResponse, TariffDetailResponse } from "./tarrif.types";

export const tariffApi = {
    getTariffList: async (params: TariffListParams): Promise<TariffListResponse> => {
        const response = await apiClient.get<TariffListResponse>(ApiEndpoints.TARIFF_LIST, { params });
        return response.data;
    },
    getTariffById: async (id: string): Promise<TariffDetailResponse> => {
        const response = await apiClient.get<TariffDetailResponse>(`${ApiEndpoints.TARIFF_LIST}/${id}`);
        return response.data;
    },
};