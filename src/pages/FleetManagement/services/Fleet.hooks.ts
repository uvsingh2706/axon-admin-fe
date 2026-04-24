import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fleetApi } from "./Fleet.api";
import type { FleetListParams } from "./Fleet.types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Pathname } from "@/utils/pathname";

export const fleetKeys = {
  all: ["fleet"] as const,
  list: () => [...fleetKeys.all, "list"] as const,
  listParams: (params: FleetListParams) => [...fleetKeys.list(), params] as const,
};

export const useFleetList = (params: FleetListParams) => {
  return useQuery({
    queryKey: fleetKeys.listParams(params),
    queryFn: () => fleetApi.getFleetList(params),
  });
};

export const useFleetById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: [...fleetKeys.all, "detail", id],
    queryFn: () => fleetApi.getFleetById(id),
    enabled: Boolean(id) && enabled,
  });
};

export const useCreateFleet = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: any) => fleetApi.createFleet(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fleetKeys.all });
      toast.success("Fleet created successfully!");
      navigate(Pathname.FLEET_MANAGEMENT);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to create fleet");
    }
  });
};

export const useDeleteFleet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => fleetApi.deleteFleet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fleetKeys.all });
      toast.success("Fleet deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete fleet");
    }
  });
};

export const useUpdateFleet = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => fleetApi.updateFleet(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: fleetKeys.all });
      queryClient.invalidateQueries({ queryKey: [...fleetKeys.all, "detail", variables.id] });
      toast.success("Fleet updated successfully!");
      navigate(`${Pathname.FLEET_MANAGEMENT}/${variables.id}`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update fleet");
    }
  });
};

