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
  fleetId: string;
  vehicleName: string;
  brand: string;
  model: string;
  vehicleId: string;
  registrationNumber: string;
  connectorType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleListResponse {
  status: number;
  message: string;
  data: VehicleDTO[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
