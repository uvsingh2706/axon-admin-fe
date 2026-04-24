import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type { CreateVehicleResponse, VehicleDetailResponse, VehicleListParams, VehicleListResponse, UpdateVehicleResponse, DeleteVehicleResponse } from "./Vehicle.types";
import { useQuery } from "@tanstack/react-query";

export const vehicleApi = {
  getVehicleList: async (params: VehicleListParams): Promise<VehicleListResponse> => {
    const response = await apiClient.get<VehicleListResponse>(ApiEndpoints.VEHICLE_LIST, {
      params,
    });
    return response.data;
  },
  createVehicle: async (fleetId: string, data: any): Promise<CreateVehicleResponse> => {
    const response = await apiClient.post<CreateVehicleResponse>(`${ApiEndpoints.VEHICLE_LIST}/${fleetId}`, data);
    return response.data;
  },
  getVehicleById: async (vehicleId: string): Promise<VehicleDetailResponse> => {
    const response = await apiClient.get<VehicleDetailResponse>(`${ApiEndpoints.VEHICLE_LIST}/${vehicleId}`);
    return response.data;
  },
  updateVehicle: async (vehicleId: string, data: any): Promise<UpdateVehicleResponse> => {
    const response = await apiClient.put<UpdateVehicleResponse>(`${ApiEndpoints.VEHICLE_LIST}/${vehicleId}`, data);
    return response.data;
  },
  deleteVehicle: async (vehicleId: string): Promise<DeleteVehicleResponse> => {
    const response = await apiClient.delete<DeleteVehicleResponse>(`${ApiEndpoints.VEHICLE_LIST}/${vehicleId}`);
    return response.data;
  },
};

