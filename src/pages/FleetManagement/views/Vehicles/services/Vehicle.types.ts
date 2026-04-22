export type VehicleListParams = {
  page?: number;
  limit?: number;
  search?: string;
  fleetId?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
};

export interface VehicleDTO {
  id: string;
  registrationNumber: string | null;
  vehicleType: string | null;
  make: string | null;
  model: string | null;
  connectorType: string | null;
  batteryPack: number | null;
  chargingRate: string | null;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleListResponse {
  status: number;
  data: {
    vehicles: VehicleDTO[];
    count: number;
    page: number;
    limit: number;
  };
}

export interface CreateVehicleResponse {
  status: number;
  data: VehicleDTO;
}

export interface VehicleDetailResponse {
  status: number;
  data: VehicleDTO;
}

export interface UpdateVehicleResponse {
  status: number;
  data: VehicleDTO;
}

export interface DeleteVehicleResponse {
  status: number;
  message: string;
}
