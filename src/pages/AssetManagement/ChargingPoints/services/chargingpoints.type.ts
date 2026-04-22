export interface ChargingPointData {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  chargingPointName: string;
  chargingPointId: string;
  hardwareIdentity: string | null;
  chargingStationId: string;
  chargingStation?: {
    id: string;
    name: string;
    image?: string | null;
    firstStreet?: string;
    secondStreet?: string;
    city?: string;
    state?: string;
    pinCode?: number;
    country?: string;
    latitude?: string;
    longitude?: string;
    commissionedOn?: string;
    amenities?: string;
    supportPersonName?: string;
    supportPersonNumber?: string;
    supportPersonEmail?: string;
    supportPersonImage?: string | null;
    solarPanel?: string;
    bess?: string;
    nonSolarGeneration?: string;
    chargingCapacity?: string;
    totalLoad?: string;
    isActive?: boolean;
    updatedBy?: string | null;
  };
  oemId: string;
  oem?: {
    id: string;
    oemName: string;
    isActive: boolean;
  };
  chargerModelId: string;
  chargerModel?: {
    id: string;
    chargerModelName: string;
    chargerModelType?: string;
    currentType?: string;
    phase?: string;
    outputMax?: string;
    chargerOutputPower?: string;
    isActive?: boolean;
  };
  tariffId: string;
  tariff?: {
    id: string;
    tariffName: string;
    ratePerUnit: string;
    serviceFees: string;
    currency: string;
    taxId: string;
  };
  commissionedOn: string;
  decommissionedAt: string | null;
  lastHeartBeatReceivedAt: string | null;
  status: string;
  isPublished: boolean;
  isSuperFast: boolean;
  maxOutputPowerW: number;
  serialNumber: string | null;
  boxNumber: string;
  firmwareVersion: string | null;
  vendor: string | null;
  communicationProtocol: string;
  connectionType: string;
  authKey: string | null;
  configurationUrl: string;
  latitude: string;
  longitude: string;
  updatedBy: string | null;
  updatedByName: string | null;
}

export interface ChargingPointListParams {
  page?: number;
  limit?: number;
  search?: string;
  chargingStationId?: string;
}

export interface ChargingPointListResponse {
  status: number;
  message?: string;
  data: {
    total: number;
    page: number;
    limit: number;
    data: ChargingPointData[];
  };
}

export interface ChargingPointDetailResponse {
  status: number;
  message?: string;
  data: ChargingPointData;
}
