import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chargingPointApi } from "./chargingpoints.api";
import type { ChargingPointListParams } from "./chargingpoints.type";

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
