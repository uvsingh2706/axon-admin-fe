import type { DriverData, DriverDetailsData } from "../types/driver.type";

export const mockDrivers: DriverData[] = [
  {
    id: "drv_001",
    fleetId: "1",
    name: "Arjun Singh",
    contact: "8721937813",
    driverId: "OLA123",
    assignedVehicle: "Tata Nexon EV",
    email: "arjun.singh@example.com",
    gender: "Male",
    updatedBy: "admin",
    avatarUrl: "",
  },
  {
    id: "drv_002",
    fleetId: "1",
    name: "Ravindra Kumar",
    contact: "8721937813",
    driverId: "BLUE123",
    assignedVehicle: "Tata Nexon EV",
    email: "ravindra.kumar@example.com",
    gender: "Male",
    updatedBy: "admin",
    avatarUrl: "",
  },
  {
    id: "drv_003",
    fleetId: "1",
    name: "Ravi Kumar",
    contact: "8721937813",
    driverId: "BLUE123",
    assignedVehicle: "Tata Nexon EV",
    email: "ravi.kumar@example.com",
    gender: "Male",
    updatedBy: "admin",
    avatarUrl: "",
  },
  {
    id: "drv_004",
    fleetId: "1",
    name: "Deepak Patel",
    contact: "8721937813",
    driverId: "BLUE123",
    assignedVehicle: "Tata Nexon EV",
    email: "deepak.patel@example.com",
    gender: "Male",
    updatedBy: "admin",
    avatarUrl: "",
  },
  {
    id: "drv_005",
    fleetId: "1",
    name: "Ravi Bhupumar",
    contact: "8721937813",
    driverId: "BLUE123",
    assignedVehicle: "Tata Nexon EV",
    email: "ravi.bhupumar@example.com",
    gender: "Male",
    updatedBy: "operation",
    avatarUrl: "",
  },
  {
    id: "drv_006",
    fleetId: "1",
    name: "Eshan Patel",
    contact: "8721937813",
    driverId: "BLUE123",
    assignedVehicle: "Tata Nexon EV",
    email: "eshan.patel@example.com",
    gender: "Male",
    updatedBy: "admin",
    avatarUrl: "",
  },
  {
    id: "drv_007",
    fleetId: "1",
    name: "Ravi Karmakar",
    contact: "8721937813",
    driverId: "BLUE123",
    assignedVehicle: "Tata Nexon EV",
    email: "ravi.karmakar@example.com",
    gender: "Male",
    updatedBy: "admin",
    avatarUrl: "",
  },
  {
    id: "drv_008",
    fleetId: "1",
    name: "Amit Patel",
    contact: "8721937813",
    driverId: "BLUE123",
    assignedVehicle: "Tata Nexon EV",
    email: "amit.patel@example.com",
    gender: "Male",
    updatedBy: "admin",
    avatarUrl: "",
  },
];

const chargingHistoryDummy = [
  {
    stationName: "Sonam Pangri Restaurant",
    chargingPointName: "Casa Grand",
    dateTime: "May 18, 2023 • 12:07:08 pm",
    durationHours: 3,
    energyConsumptionKwh: 3,
    amount: "₹8743",
  },
  {
    stationName: "Tiger Lily",
    chargingPointName: "Casa Grand",
    dateTime: "May 18, 2023 • 12:07:08 pm",
    durationHours: 3,
    energyConsumptionKwh: 3,
    amount: "₹8743",
  },
];

export const mockDriverDetailsById: Record<string, DriverDetailsData> = {
  drv_001: {
    ...mockDrivers[0],
    organisationName: "Ola Electric Private Ltd.",
    personalEmailId: "info@ola.com",
    licenseNumber: "KA-01-20190012345",
    licenseExpiryDate: "31/12/2027",
    vehicleInfo: {
      vehicleName: "Tata Nexon EV",
      model: "Tigor EV XE",
      connectorType: "CCS2",
      registrationNumber: "DL-33L-2453",
    },
    chargingHistory: Array.from({ length: 10 }).map((_, idx) => {
      const seed = chargingHistoryDummy[idx % chargingHistoryDummy.length];
      return {
        id: `ch_${idx + 1}`,
        ...seed,
      };
    }),
  },
};

export function getDriversByFleetId(fleetId: string) {
  return mockDrivers.filter((d) => d.fleetId === fleetId);
}

export function getDriverById(fleetId: string, driverId: string) {
  return mockDrivers.find((d) => d.fleetId === fleetId && d.id === driverId);
}

export function getDriverDetailsById(driverId: string) {
  return mockDriverDetailsById[driverId];
}

