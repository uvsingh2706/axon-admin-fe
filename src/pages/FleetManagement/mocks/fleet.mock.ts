import type { EditFleetFormValues } from "../config/fleet.form";
import type { FleetData, FleetDetailStats } from "../types/fleet.type";

export const mockFleets: FleetData[] = [
  {
    id: "1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
    organisationName: "Uber Private Ltd",
    vehicleType: "Trucks",
    flatRate: "₹12",
    email: "info.uber@uber.com",
    contact: "8721937813",
    totalDrivers: "134",
    totalVehicles: "3000",
  },
  {
    id: "2",
    logo: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/78/d7/63/78d76320-1df8-3aee-0508-be9abae924cd/AppIcon-0-0-1x_U007ephone-0-0-0-1-0-0-85-220.png/1200x630wa.png",
    organisationName: "Blue Smart Pvt. Ltd.",
    vehicleType: "Buses",
    flatRate: "₹12",
    email: "info@bluesmart.com",
    contact: "8721937813",
    totalDrivers: "98",
    totalVehicles: "1200",
  },
  {
    id: "3",
    logo: "https://www.svgrepo.com/show/303255/ola-cabs-logo.svg",
    organisationName: "Station 2",
    vehicleType: "3-Wheelers",
    flatRate: "₹12",
    email: "info.ola@ola.com",
    contact: "8721937813",
    totalDrivers: "76",
    totalVehicles: "800",
  },
  {
    id: "4",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIi382lTLbczOvcE-J7POXzEcmgQtqxI6r2g&s",
    organisationName: "Rapido Pvt. Ltd.",
    vehicleType: "Electric Cars",
    flatRate: "₹12",
    email: "info@rapido.com",
    contact: "8721937813",
    totalDrivers: "150",
    totalVehicles: "950",
  },
  {
    id: "5",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-JWeX3pOOeDI7R2NKD0Cwizf3_P6QoTJf_w&s",
    organisationName: "Yulu Pvt. Ltd",
    vehicleType: "Trucks",
    flatRate: "₹12",
    email: "info@yulu.com",
    contact: "8721937813",
    totalDrivers: "45",
    totalVehicles: "400",
  },
  {
    id: "6",
    logo: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    organisationName: "Cab Rentals Services",
    vehicleType: "4-Wheelers",
    flatRate: "₹12",
    email: "rajeev@gmail.com",
    contact: "8721937813",
    totalDrivers: "60",
    totalVehicles: "500",
  },
];

export const mockFleetStatsById: Record<string, FleetDetailStats> = {
  "1": { availableBalance: "₹200", energyDelivered: "175" },
  "2": { availableBalance: "₹340", energyDelivered: "266" },
  "3": { availableBalance: "₹125", energyDelivered: "122" },
  "4": { availableBalance: "₹510", energyDelivered: "399" },
  "5": { availableBalance: "₹90", energyDelivered: "80" },
  "6": { availableBalance: "₹155", energyDelivered: "101" },
};

export const getFleetById = (id?: string) =>
  mockFleets.find((fleet) => fleet.id === id);

export const getFleetEditDefaultValues = (id?: string): EditFleetFormValues | null => {
  const fleet = getFleetById(id);
  if (!fleet) return null;

  return {
    name: fleet.organisationName,
    logo: fleet.logo,
    vehicleType: fleet.vehicleType,
    // flatRate: fleet.flatRate,
    email: fleet.email,
    contact: fleet.contact,
    totalDrivers: fleet.totalDrivers,
    totalVehicles: fleet.totalVehicles,
  };
};
