import { apiClient } from "@/lib/axios";
import { ApiEndpoints } from "@/utils/apiEndpoints";
import type { CreateDriverResponse, DriverDetailResponse, DriverListParams, DriverListResponse, DeleteDriverResponse, EditDriverFormValues } from "./driver.types";


export const driverApi = {
    createDriver: async (fleetId: string, data: any): Promise<CreateDriverResponse> => {
        const response = await apiClient.post<CreateDriverResponse>(
            `${ApiEndpoints.DRIVER_LIST}/${fleetId}`,
            data
        );
        return response.data;
    },
    getDriverList: async (params: DriverListParams): Promise<DriverListResponse> => {
        const response = await apiClient.get<DriverListResponse>(ApiEndpoints.DRIVER_LIST, {
            params,
        });
        return response.data;
    },
    getDriverById: async (driverId: string): Promise<DriverDetailResponse> => {
        const response = await apiClient.get<DriverDetailResponse>(`${ApiEndpoints.DRIVER_LIST}/${driverId}`);
        return response.data;
    },
    editDriver: async (driverId: string, data: any): Promise<EditDriverFormValues> => {
        const response = await apiClient.put<EditDriverFormValues>(
            `${ApiEndpoints.DRIVER_LIST}/${driverId}`,
            data
        );
        return response.data;
    },
    deleteDriver: async (driverId: string): Promise<DeleteDriverResponse> => {
        const response = await apiClient.delete(
            `${ApiEndpoints.DRIVER_LIST}/${driverId}`
        );
        return response.data;
    },
};
