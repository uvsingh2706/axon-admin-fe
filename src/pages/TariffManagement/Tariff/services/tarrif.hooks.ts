import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tariffApi } from "./tarrif.api";

import type {TariffListParams, CreateTariffRequest}  from "./tarrif.types";


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
    });
};