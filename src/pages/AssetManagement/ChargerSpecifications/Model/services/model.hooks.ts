import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateModelRequest, ModelListParams } from "./model.types";
import { modelApi } from "./model.api";
import { toast } from "sonner";


export const modelKeys = {
    all: ['model'] as const,
    list: () => [...modelKeys.all, 'list'] as const,
    listParams: (params: ModelListParams) => [...modelKeys.list(), params] as const,
}

export const useModelList = (params: ModelListParams) => {
    return useQuery({
        queryKey: modelKeys.listParams(params),
        queryFn: () => modelApi.getModelList(params),
    })
}


export const useCreateModel = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateModelRequest) => modelApi.createModel(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: modelKeys.all });
            toast.success("Model created successfully");
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to create model");
        }
    })
}

export const useModelById = (id: string | undefined, enabled = true) => {
    return useQuery({
        queryKey: [...modelKeys.all, 'details', id],
        queryFn: () => modelApi.getModelById(id!),
        enabled: enabled && !!id,
    })
}

export const useUpdateModel = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: CreateModelRequest }) => modelApi.updateModel(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: modelKeys.all });
            toast.success("Model updated successfully");
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to update model");
        }
    })
}