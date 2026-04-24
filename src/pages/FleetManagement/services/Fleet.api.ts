import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type { FleetListParams,  FleetListResponse,  FleetDetailResponse, CreateFleetRequest, DeleteFleetResponse,  UpdateFleetRequest, CreateFleetResponse, UpdateFleetResponse} from "./Fleet.types";

export const fleetApi = {
  getFleetList: async (params: FleetListParams): Promise<FleetListResponse> => {
    const response = await apiClient.get<FleetListResponse>(ApiEndpoints.FLEET_LIST, { params });
    return response.data;
  },
  getFleetById: async (id: string): Promise<FleetDetailResponse> => {
    const response = await apiClient.get<FleetDetailResponse>(`${ApiEndpoints.FLEET_LIST}/${id}`);
    return response.data;
  },
  createFleet: async (data: CreateFleetRequest): Promise<CreateFleetResponse> => {
    const response = await apiClient.post<CreateFleetResponse>(ApiEndpoints.FLEET_LIST, data);
    return response.data;
  },
  deleteFleet: async (id: string): Promise<DeleteFleetResponse> => {
    const response = await apiClient.delete<DeleteFleetResponse>(`${ApiEndpoints.FLEET_LIST}/${id}`);
    return response.data;
  },
  updateFleet: async (id: string, data: UpdateFleetRequest): Promise<UpdateFleetResponse> => {
    const response = await apiClient.put<UpdateFleetResponse>(`${ApiEndpoints.FLEET_LIST}/${id}`, data);
    return response.data;
  },
};

