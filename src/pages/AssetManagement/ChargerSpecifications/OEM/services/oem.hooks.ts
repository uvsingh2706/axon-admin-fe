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

export const useOEMById = (id: string) => {
    return useQuery({
        queryKey: [...oemKeys.all, 'oem-by-id', id],
        queryFn: () => oemApi.getOEMById(id),
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
    
