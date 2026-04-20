import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type { FleetListParams, FleetListResponse, FleetDetailResponse } from "./Fleet.types";

export const fleetApi = {
  getFleetList: async (params: FleetListParams): Promise<FleetListResponse> => {
    const response = await apiClient.get<FleetListResponse>(ApiEndpoints.FLEET_LIST, { params });
    return response.data;
  },
  getFleetById: async (id: string): Promise<FleetDetailResponse> => {
    const response = await apiClient.get<FleetDetailResponse>(`${ApiEndpoints.FLEET_LIST}/${id}`);
    return response.data;
  },
  createFleet: async (data: any): Promise<any> => {
    const response = await apiClient.post(ApiEndpoints.FLEET_LIST, data);
    return response.data;
  },
};

