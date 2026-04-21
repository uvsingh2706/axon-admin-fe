import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { connectorApi } from "./connector.api";
import type { ConnectorListParams, CreateConnectorPayload } from "./connector.type";
import { toast } from "sonner";

export const connectorKeys = {
    all: ["connector"] as const,
    list: () => [...connectorKeys.all, "list"] as const,
    listParams: (params: ConnectorListParams) => [...connectorKeys.list(), params] as const,
}

export const useCreateConnector = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateConnectorPayload) => connectorApi.createConnector(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: connectorKeys.all });
            toast.success("Connector created successfully");
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to create connector");
        }
    })
}

export const useConnectorList = (params: ConnectorListParams) => {
    return useQuery({
        queryKey: connectorKeys.listParams(params),
        queryFn: () => connectorApi.getConnectorList(params),
    })
}

export const useConnectorById = (id: string | undefined, enabled = true) => {
    return useQuery({
        queryKey: [...connectorKeys.all, 'connector-by-id', id],
        queryFn: () => connectorApi.getConnectorById(id!),
        enabled: enabled && !!id,
    })
}   
export const useUpdateConnectorById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, data}: {id: string, data: CreateConnectorPayload}) => connectorApi.updateConnectorById(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: connectorKeys.all });
            toast.success("Connector updated successfully");
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to update connector");
        }
    })
}