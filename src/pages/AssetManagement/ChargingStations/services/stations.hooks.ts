import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { stationApi } from "./stations.api";
import type {
    StationListParams,
    CreateStationRequest,
    UpdateStationRequest
} from "./stations.types";

export const stationKeys = {
    all: ["station"] as const,
    list: () => [...stationKeys.all, "list"] as const,
    listParams: (params: StationListParams) => [...stationKeys.list(), params] as const,
}

export const useStationList = (params: StationListParams) => {
    return useQuery({
        queryKey: stationKeys.listParams(params),
        queryFn: () => stationApi.getStationList(params),
    })
}

export const useStationById = (id: string, enabled = true) => {
    return useQuery({
        queryKey: [...stationKeys.all, "detail", id],
        queryFn: () => stationApi.getStationById(id),
        enabled: Boolean(id) && enabled,
    })
}

export const useCreateStation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateStationRequest) => stationApi.createStation(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: stationKeys.all });
            
        },
        
    });
};

export const useUpdateStation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (args: { id: string; data: UpdateStationRequest }) => stationApi.updateStation(args),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: stationKeys.all });
            queryClient.invalidateQueries({ queryKey: [...stationKeys.all, "detail", variables.id] });
        },
    });
};

export const useDeleteStation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (args: { id: string }) => stationApi.deleteStation(args),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: stationKeys.all });
        },
    });
};
