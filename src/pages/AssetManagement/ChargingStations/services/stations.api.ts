import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type {
    StationListParams,
    StationListResponse,
    StationDetailResponse,
    CreateStationRequest,
    UpdateStationRequest
} from "./stations.types";

export const stationApi = {
    getStationList: async (params: StationListParams): Promise<StationListResponse> => {
        const response = await apiClient.get<StationListResponse>(ApiEndpoints.CHARGING_STATIONS_LIST, { params });
        return response.data;
    },
    getStationById: async (id: string): Promise<StationDetailResponse> => {
        const response = await apiClient.get<StationDetailResponse>(`${ApiEndpoints.CHARGING_STATIONS_LIST}/${id}`);
        return response.data;
    },
    createStation: async (data: CreateStationRequest): Promise<void> => {
        const response = await apiClient.post(ApiEndpoints.CHARGING_STATIONS_LIST, data);
        return response.data;
    },
    updateStation: async ({ id, data }: { id: string; data: UpdateStationRequest }): Promise<void> => {
        const response = await apiClient.put(`${ApiEndpoints.CHARGING_STATIONS_LIST}/${id}`, data);
        return response.data;
    },
    deleteStation: async ({ id }: { id: string }): Promise<void> => {
        await apiClient.delete(`${ApiEndpoints.CHARGING_STATIONS_LIST}/${id}`);
    },
    
};
