import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { driverApi } from "./driver.api";

import { toast } from "sonner";

import type { DriverListParams } from "./driver.types";

export const driverKeys = {
    all: ["drivers"] as const,
    lists: () => [...driverKeys.all, "list"] as const,
    list: (params: DriverListParams) => [...driverKeys.lists(), params] as const,
    details: () => [...driverKeys.all, "detail"] as const,
    detail: (id: string) => [...driverKeys.details(), id] as const,
};

export const useDriverById = (id: string, enabled = true) => {
    return useQuery({
        queryKey: driverKeys.detail(id),
        queryFn: () => driverApi.getDriverById(id),
        enabled: Boolean(id) && enabled,
    });
};

export const useCreateDriver = (fleetId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => driverApi.createDriver(fleetId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: driverKeys.all });
            toast.success("Driver added successfully!");
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to add driver"
            );
        },
    });
};

export const useDriverList = (params: DriverListParams) => {
    return useQuery({
        queryKey: driverKeys.list(params),
        queryFn: () => driverApi.getDriverList(params),
        enabled: !!params.fleetId,
    });
};
