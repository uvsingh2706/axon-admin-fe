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
