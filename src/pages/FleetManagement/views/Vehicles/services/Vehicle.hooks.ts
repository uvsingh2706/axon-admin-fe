import { useQuery } from "@tanstack/react-query";
import { vehicleApi } from "./Vehicle.api";
import type { VehicleListParams } from "./Vehicle.types";

export const vehicleKeys = {
  all: ["vehicles"] as const,
  lists: () => [...vehicleKeys.all, "list"] as const,
  list: (params: VehicleListParams) => [...vehicleKeys.lists(), params] as const,
};

export const useVehicleList = (params: VehicleListParams) => {
  return useQuery({
    queryKey: vehicleKeys.list(params),
    queryFn: () => vehicleApi.getVehicleList(params),
  });
};
