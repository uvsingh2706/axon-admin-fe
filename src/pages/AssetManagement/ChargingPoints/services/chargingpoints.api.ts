import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type {
    ChargingPointListParams,
    ChargingPointListResponse,
    ChargingPointDetailResponse,
    CreateChargingPointRequest
} from "./chargingpoints.type";

export const chargingPointApi = {
    getChargingPointList: async (params: ChargingPointListParams): Promise<ChargingPointListResponse> => {
        const response = await apiClient.get<ChargingPointListResponse>(ApiEndpoints.CHARGING_POINTS_LIST, { params });
        return response.data;
    },
    getChargingPointById: async (id: string): Promise<ChargingPointDetailResponse> => {
        const response = await apiClient.get<ChargingPointDetailResponse>(`${ApiEndpoints.CHARGING_POINTS_LIST}/${id}`);
        return response.data;
    },
    deleteChargingPoint: async ({ id }: { id: string }): Promise<void> => {
        await apiClient.delete(`${ApiEndpoints.CHARGING_POINTS_LIST}/${id}`);
    },
    createChargingPoint: async (data: CreateChargingPointRequest): Promise<void> => {
        const response = await apiClient.post(ApiEndpoints.CHARGING_POINTS_LIST, data);
        return response.data;
    },
    updateChargingPoint: async ({ id, data }: { id: string, data: CreateChargingPointRequest }): Promise<void> => {
        const response = await apiClient.put(`${ApiEndpoints.CHARGING_POINTS_LIST}/${id}`, data);
        return response.data;
    },
};
