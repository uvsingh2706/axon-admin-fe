export type FleetListParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
};

export interface FleetDTO {
  id: string;
  logo: string | null;
  name: string;
  vehicle_type: string | null;
  flatRate: string;
  email: string | null;
  contact_number: string
  totalDrivers: string;
  totalVehicles: string;
  createdAt: string;
  updatedAt: string;
}

export interface FleetListResponse {
  status: number;
  message: string;
  data: FleetDTO[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface FleetDetailResponse {
  status: number;
  message: string;
  data: FleetDTO;
}

export interface CreateFleetRequest {
  name: string;
  email?: string;
  contact_number?: string;
  logo?: string;
  vehicle_type?: string;
  flatRate?: string;
}

export interface DeleteFleetResponse {
  status: number;
  message: string;
}

export interface UpdateFleetRequest extends Partial<CreateFleetRequest> {}

export interface CreateFleetResponse {
  status: number;
  message: string;
  data: FleetDTO;
}

export interface UpdateFleetResponse {
  status: number;
  message: string;
  data: FleetDTO;
}
