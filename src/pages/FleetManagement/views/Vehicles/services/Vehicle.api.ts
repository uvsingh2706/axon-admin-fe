import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type { VehicleListParams, VehicleListResponse } from "./Vehicle.types";

export const vehicleApi = {
  getVehicleList: async (params: VehicleListParams): Promise<VehicleListResponse> => {
    const response = await apiClient.get<VehicleListResponse>(ApiEndpoints.VEHICLE_LIST, {
      params,
    });
    return response.data;
  },
};
