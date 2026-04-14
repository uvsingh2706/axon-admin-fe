import type { ChargingStationData, StationDetailsData, StationEditSeedData } from "../types/ChargingStations.types";

export const mockChargingStations: ChargingStationData[] = [
  { id: "CS-001", stationName: "My Home Tarkshya", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Rahul Rathore", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "CS-002", stationName: "Station 2", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Ravi Singh", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "CS-003", stationName: "Station 2", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Maneshwar", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "CS-004", stationName: "My Home Tarkshya", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Maneshwar", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
  { id: "CS-005", stationName: "Station 2", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Rahul Rathore", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "operation" },
  { id: "CS-006", stationName: "My Home Tarkshya", address: "Sector 15, New Delhi, Delhi - 110015, Petrol...", supportPerson: "Maneshwar", updatedAt: "May 18, 2023 1:27:08 PM", updatedBy: "admin" },
];

export const mockStationDetailsById: Record<string, StationDetailsData> = {
  "CS-001": {
    name: "My Home Tarkshya",
    sessions: "4",
    revenue: "₹1,200",
    energy: "1.75",
    address: "Sector 15, New Delhi, Delhi - 110015, Petrol Pump Station",
    addressLine2: "-",
    pincode: "500075",
    city: "new-delhi",
    state: "delhi",
    latLng: "28.6139, 77.2090",
    commissionOn: "2021-06-26",
    areaManager: { name: "Rahul Sharma", email: "rahul123@gmail.com", phone: "+91 98765 43210" },
    energyCapacity: { solar: "50 KWp", bess: "100 KWh", nonSolar: "100 KW", totalCapacity: "100 KW", totalLoad: "100 KW" },
  },
};

export const mockStationEditById: Record<string, StationEditSeedData> = {
  "CS-001": {
    stationName: "My Home Tarkshya",
    stationImage: null,
    addressLine1: "Sector 15, Petrol Pump Station",
    addressLine2: "",
    pincode: "110015",
    city: "new-delhi",
    state: "delhi",
    latitude: "28.6139",
    longitude: "77.2090",
    commissionOn: "2021-06-26",
    supportPersonName: "Rahul Sharma",
    contactNumber: "+91 98765 43210",
    emailId: "rahul123@gmail.com",
    solar: "50 KWp",
    bess: "100 KWh",
    nonSolarGeneration: "100 KW",
    totalChargingCapacity: "100 KW",
    totalOnSiteLoad: "100 KW",
  },
};
