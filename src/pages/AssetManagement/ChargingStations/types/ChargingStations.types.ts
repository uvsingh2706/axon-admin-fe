import type { StationDTO } from "../services/stations.types";

export type ChargingStationData = StationDTO;

export type CreateStationFormValues = {
  stationName: string;
  stationImage: any;
  addressLine1: string;
  addressLine2?: string;
  pincode: string;
  city: string;
  state: string;
  latitude: string;
  longitude: string;
  commissionOn: string;
  supportPersonName: string;
  contactNumber: string;
  emailId: string;
  solar: string;
  bess: string;
  nonSolarGeneration: string;
  totalChargingCapacity: string;
  totalOnSiteLoad: string;
};

export type EditStationFormValues = Omit<CreateStationFormValues, "stationImage"> & {
  stationImage?: any;
};

export type StationEnergyCapacity = {
  solar: string;
  bess: string;
  nonSolar: string;
  totalCapacity: string;
  totalLoad: string;
};

export type StationDetailsData = {
  name: string;
  sessions: string;
  revenue: string;
  energy: string;
  address: string;
  addressLine2: string;
  pincode: string;
  city: string;
  state: string;
  latLng: string;
  commissionOn: string;
  areaManager: {
    name: string;
    email: string;
    phone: string;
  };
  energyCapacity: StationEnergyCapacity;
};

export interface ChargingStationListProps {
  // data: ChargingPointData[];
  search: string;
}

export type StationEditSeedData = CreateStationFormValues;
