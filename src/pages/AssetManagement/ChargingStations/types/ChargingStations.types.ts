export type ChargingStationData = {
  id: string;
  stationName: string;
  address: string;
  supportPerson: string;
  updatedAt: string;
  updatedBy: string;
};

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

export type StationEditSeedData = CreateStationFormValues;
