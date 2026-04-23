import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type {
  CreateDriverRequest,
  CreateDriverResponse,
  DriverDetailResponse,
  DriverEditRequest,
  DriverListParams,
  DriverListResponse,
} from "./drivers.types";

export const driversApi = {
  getDriversList: async (params: DriverListParams): Promise<DriverListResponse> => {
    const response = await apiClient.get<DriverListResponse>(ApiEndpoints.DRIVER_LIST, { params });
    return response.data;
  },

  getDriverById: async (id: string): Promise<DriverDetailResponse> => {
    const response = await apiClient.get<DriverDetailResponse>(`${ApiEndpoints.DRIVER_LIST}/${id}`);
    return response.data;
  },

  createDriver: async (params: { fleetId: string; data: CreateDriverRequest }): Promise<CreateDriverResponse> => {
    const response = await apiClient.post<CreateDriverResponse>(
      `${ApiEndpoints.DRIVER_LIST}/${params.fleetId}`,
      params.data,
    );
    return response.data;
  },


  updateDriver: async (params: { id: string; data: DriverEditRequest }): Promise<void> => {
    await apiClient.put(`${ApiEndpoints.DRIVER_LIST}/${params.id}`, params.data);
  },

  deleteDriver: async (id: string): Promise<void> => {
    await apiClient.delete(`${ApiEndpoints.DRIVER_LIST}/${id}`);
  },
};
