import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taxApi } from "./dummy.api";
import type { TaxListParams, CreateTaxRequest, UpdateTaxRequest } from "./dummy.types";

export const taxKeys = {
    all: ["tax"] as const,
    list: () => [...taxKeys.all, "list"] as const,
    listParams: (params: TaxListParams) => [...taxKeys.list(), params] as const,
}

export const useTaxList = (params: TaxListParams) => {
    return useQuery({
        queryKey: taxKeys.listParams(params),
        queryFn: () => taxApi.getTaxList(params),
    })
}

export const useTaxById = (id: string, enabled = true) => {
    return useQuery({
        queryKey: [...taxKeys.all, "detail", id],
        queryFn: () => taxApi.getTaxById(id),
        enabled: Boolean(id) && enabled,
    })
}

export const useCreateTax = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateTaxRequest) => taxApi.createTax(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: taxKeys.all });
        },
    });
};

export const useUpdateTax = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateTaxRequest }) => taxApi.updateTax({ id, data }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: taxKeys.all });
            queryClient.invalidateQueries({ queryKey: [...taxKeys.all, "detail", variables.id] });
        },
    });
};

export const useDeleteTax = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id }: { id: string }) =>
            taxApi.deleteTax({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: taxKeys.all });
        },
    });
};
