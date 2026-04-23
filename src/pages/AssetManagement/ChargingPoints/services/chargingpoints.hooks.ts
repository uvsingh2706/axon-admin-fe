import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chargingPointApi } from "./chargingpoints.api";
import type { ChargingPointListParams, CreateChargingPointRequest } from "./chargingpoints.type";
import { toast } from "sonner";
import { modelApi } from "../../ChargerSpecifications/Model/services/model.api";

export const pointKeys = {
    all: ["point"] as const,
    list: () => [...pointKeys.all, "list"] as const,
    listParams: (params: ChargingPointListParams) => [...pointKeys.list(), params] as const,
}

export const useChargingPointList = (params: ChargingPointListParams) => {
    return useQuery({
        queryKey: pointKeys.listParams(params),
        queryFn: () => chargingPointApi.getChargingPointList(params),
    })
}

export const useChargingPointById = (id: string, enabled = true) => {
    return useQuery({
        queryKey: [...pointKeys.all, "detail", id],
        queryFn: () => chargingPointApi.getChargingPointById(id),
        enabled: Boolean(id) && enabled,
    })
}

export const useDeleteChargingPoint = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (args: { id: string }) => chargingPointApi.deleteChargingPoint(args),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pointKeys.all });
        },
    });
};

export const useModelListByOemId = (oemId: string, enabled = true) => {
    return useQuery(
        {
            queryKey: [...pointKeys.all, "model-list", oemId],
            queryFn: () => modelApi.getModelByOemId(oemId),
            enabled: Boolean(oemId) && enabled,
        }
    )
}
export const useCreateChargingPoint = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateChargingPointRequest) => chargingPointApi.createChargingPoint(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pointKeys.all });
            toast.success("Charging point created successfully");
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to create charging point");
        }
    })
}
export const useUpdateChargingPoint = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: CreateChargingPointRequest }) => 
            chargingPointApi.updateChargingPoint({ id, data }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: pointKeys.all });
            queryClient.invalidateQueries({ queryKey: [...pointKeys.all, "detail", variables.id] });
            toast.success("Charging point updated successfully");
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to update charging point");
        }
    })
}
