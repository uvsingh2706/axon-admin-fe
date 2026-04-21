import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tariffApi } from "./tarrif.api";

import type {TariffListParams, CreateTariffRequest}  from "./tarrif.types";
import { toast } from "sonner";


export const tariffKeys = {
    all: ["tariff"] as const,
    list: () => [...tariffKeys.all, "list"] as const,
    listParams: (params: TariffListParams) => [...tariffKeys.list(), params] as const,
}
    

export const useTariffList = (params: TariffListParams) => {
    return useQuery({
        queryKey: tariffKeys.listParams(params),
        queryFn: () => tariffApi.getTariffList(params),
    })
}

export const useTariffById = (id: string) => {
    return useQuery({
        queryKey: [...tariffKeys.all, "detail", id],
        queryFn: () => tariffApi.getTariffById(id),
    })
}

export const useCreateTariff = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateTariffRequest) => tariffApi.createTariff(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tariffKeys.all });
        },
        onError(error) {
            console.log(error);
        },
    });
};
export const useDeleteTariff = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => tariffApi.deleteTariff(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tariffKeys.all });
            toast.success("Tariff deleted successfully");
        },
        onError(error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to delete tariff");
        },
    });
};
export const useUpdateTariff = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, data}: {id: string, data: CreateTariffRequest}) => tariffApi.updateTariff(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tariffKeys.all });
            toast.success("Tariff updated successfully");
        },
        onError(error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to update tariff");
        },
    });
};