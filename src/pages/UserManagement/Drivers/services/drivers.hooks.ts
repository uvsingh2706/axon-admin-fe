import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { driversApi } from "./drivers.api";
import type { CreateDriverRequest, DriverEditRequest, DriverListParams } from "./drivers.types";
import { toast } from "sonner";

export const driversKeys = {
  all: ["drivers"] as const,
  list: () => [...driversKeys.all, "list"] as const,
  listParams: (params: DriverListParams) => [...driversKeys.list(), params] as const,
  detail: (id: string) => [...driversKeys.all, "detail", id] as const,
};

export const useDriversList = (params: DriverListParams) => {
  return useQuery({
    queryKey: driversKeys.listParams(params),
    queryFn: () => driversApi.getDriversList(params),
  });
};

export const useDriverById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: driversKeys.detail(id),
    queryFn: () => driversApi.getDriverById(id),
    enabled: Boolean(id) && enabled,
  });
};

export const useCreateDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { fleetId: string; data: CreateDriverRequest }) =>
      driversApi.createDriver(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driversKeys.all });
      toast.success("Driver created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
};

export const useUpdateDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: string; data: DriverEditRequest }) =>
      driversApi.updateDriver(variables),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: driversKeys.all });
      queryClient.invalidateQueries({ queryKey: driversKeys.detail(id) });
      toast.success("Driver updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => driversApi.deleteDriver(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: driversKeys.all });
      queryClient.invalidateQueries({ queryKey: driversKeys.detail(id) });
      toast.success("Driver deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
};
