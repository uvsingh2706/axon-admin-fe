import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { vehicleApi } from "./Vehicle.api";
import type { VehicleListParams } from "./Vehicle.types";
import { toast } from "sonner";

export const vehicleKeys = {
  all: ["vehicles"] as const,
  lists: () => [...vehicleKeys.all, "list"] as const,
  list: (params: VehicleListParams) => [...vehicleKeys.lists(), params] as const,
  details: () => [...vehicleKeys.all, "detail"] as const,
  detail: (id: string) => [...vehicleKeys.details(), id] as const,
};

export const useVehicleList = (params: VehicleListParams, enabled = true) => {
  return useQuery({
    queryKey: vehicleKeys.list(params),
    queryFn: () => vehicleApi.getVehicleList(params),
    enabled,
  });
};


export const useVehicleById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: vehicleKeys.detail(id),
    queryFn: () => vehicleApi.getVehicleById(id),
    enabled: Boolean(id) && enabled,
  });
};

export const useCreateVehicle = (fleetId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => vehicleApi.createVehicle(fleetId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleKeys.all });
      toast.success("Vehicle added successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to add vehicle");
    },
  });
};

export const useUpdateVehicle = (vehicleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => vehicleApi.updateVehicle(vehicleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleKeys.all });
      toast.success("Vehicle updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update vehicle");
    },
  });
};

export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vehicleId: string) => vehicleApi.deleteVehicle(vehicleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleKeys.all });
      toast.success("Vehicle deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete vehicle");
    },
  });
};
