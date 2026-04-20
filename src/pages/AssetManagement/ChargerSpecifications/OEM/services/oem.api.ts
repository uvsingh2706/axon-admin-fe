import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type { CreateOEMRequest, OEMListParams, OEMListResponse } from "./oem.types";


export const oemApi = {
    getOEMList: async (params: OEMListParams): Promise<OEMListResponse> => {
        const response = await apiClient.get(ApiEndpoints.OEM_LIST, { params });
        return response.data;
    },
    getOEMById: async (id: string): Promise<OEMListResponse> => {
        const response = await apiClient.get(`${ApiEndpoints.OEM_LIST}/${id}`);
        return response.data;
    },
    createOEM: async (data: CreateOEMRequest): Promise<void> => {
        const response = await apiClient.post(ApiEndpoints.OEM_LIST, data);
        return response.data;
    },
    
};