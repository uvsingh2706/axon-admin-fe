import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type { CreateOEMRequest, OEMListParams, OEMListResponse } from "./oem.types";


export const oemApi = {
    getOEMList: async (params: OEMListParams): Promise<OEMListResponse> => {
        const response = await apiClient.get(ApiEndpoints.OEM, { params });
        return response.data;
    },
    getOEMById: async (id: string): Promise<OEMListResponse> => {
        const response = await apiClient.get(`${ApiEndpoints.OEM}/${id}`);
        return response.data;
    },
    createOEM: async (data: CreateOEMRequest): Promise<void> => {
        const response = await apiClient.post(ApiEndpoints.OEM, data);
        return response.data;
    },
    updateOEMById: async (id: string, data: CreateOEMRequest): Promise<void> => {
        const response = await apiClient.put(`${ApiEndpoints.OEM}/${id}`, data)
        return response.data;
    },
    deleteOEMById: async (id: string): Promise<void> => {
        const response = await apiClient.delete(`${ApiEndpoints.OEM}/${id}`)
        return response.data;
    }
    
};  