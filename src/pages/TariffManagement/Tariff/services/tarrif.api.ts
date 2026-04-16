import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type { TariffListParams, TariffListResponse } from "./tarrif.types";

export const tariffApi = {
    getTariffList: async (params: TariffListParams): Promise<TariffListResponse> => {
        const response = await apiClient.get<TariffListResponse>(ApiEndpoints.TARIFF_LIST, { params });
        return response.data;
    },
};