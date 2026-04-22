export interface CreateStationRequest {
  name: string;
  image?: File | string;
  firstStreet: string;
  secondStreet: string;
  city: string;
  state: string;
  pinCode: number;
  latitude: number;
  longitude: number;
  commissionedOn: string;
  supportPersonImage?: File | string;
  supportPersonName: string;
  supportPersonNumber: number;
  supportPersonEmail: string;
  solarPanel: string;
  bess: string;
  nonSolarGeneration: string;
  chargingCapacity: string;
  totalLoad: string;
  isActive: boolean;
}

export interface StationDTO {
  id: string;
  name: string;
  image: string;
  firstStreet: string;
  secondStreet: string | null;
  city: string;
  state: string;
  pinCode: number;
  latitude: number;
  longitude: number;
  commissionedOn: string;
  supportPersonImage: string | null;
  supportPersonName: string;
  supportPersonNumber: number;
  supportPersonEmail: string;
  solarPanel: string;
  bess: string;
  nonSolarGeneration: string;
  chargingCapacity: string;
  totalLoad: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  deletedAt: string | null;
  tax?: number;
  valuePerKwh?: string | number;
}

export interface StationListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface StationListResponse {
  status: number;
  message?: string;
  data: {
    data: StationDTO[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface StationDetailResponse {
  status: number;
  message?: string;
  data: StationDTO;
}

export interface UpdateStationRequest {
  name?: string;
  image?: File | string;
  firstStreet?: string;
  secondStreet?: string;
  city?: string;
  state?: string;
  pinCode?: number;
  latitude?: number;
  longitude?: number;
  commissionedOn?: string;
  supportPersonImage?: File | string;
  supportPersonName?: string;
  supportPersonNumber?: number;
  supportPersonEmail?: string;
  solarPanel?: string;
  bess?: string;
  nonSolarGeneration?: string;
  chargingCapacity?: string;
  totalLoad?: string;
  isActive?: boolean;
}
