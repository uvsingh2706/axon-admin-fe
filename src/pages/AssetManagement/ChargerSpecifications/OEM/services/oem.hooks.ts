import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { oemApi } from "./oem.api";
import type { CreateOEMRequest, OEMListParams } from "./oem.types";
import { toast } from "sonner";

export const oemKeys = {
    all: ["oem"] as const,
    list: () => [...oemKeys.all, "list"] as const,
    listParams: (params: OEMListParams) => [...oemKeys.list(), params] as const,
}

export const useOEMList = (params: OEMListParams) => {
    return useQuery({
        queryKey: oemKeys.listParams(params),
        queryFn: () => oemApi.getOEMList(params),
    })
}

export const useOEMById = (id: string, enabled = true) => {
    return useQuery({
        queryKey: [...oemKeys.all, 'oem-by-id', id],
        queryFn: () => oemApi.getOEMById(id),
        enabled: enabled && !!id,
    })
}

export const useCreateOEM = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateOEMRequest) => oemApi.createOEM(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: oemKeys.all });
            toast.success("OEM created successfully");
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to create OEM");
        }
    })
}

export const useUpdateOEM = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, data}: {id: string, data: CreateOEMRequest}) => oemApi.updateOEMById(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: oemKeys.all });
            toast.success("OEM updated successfully");
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to update OEM");
        }   
    })
}
export const useDeleteOEM = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => oemApi.deleteOEMById(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: oemKeys.all });
            toast.success("OEM deleted successfully");
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to delete OEM");
        }   
    })
}
    
