import type { CreateFleetFormValues, EditFleetFormValues } from "../config/fleet.form";

export type FleetData = {
  id: string;
  logo: string;
  organisationName: string;
  vehicleType: string;
  flatRate: string;
  email: string;
  contact: string;
  totalDrivers: string;
  totalVehicles: string;
};

export type FleetDetailStats = {
  availableBalance: string;
  energyDelivered: string;
};

export type FleetStatCard = {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
};

export type FleetManagementListProps = {
  search: string;
};

export type FleetFormLogoValue = File | string | null;

export type FleetFormSectionsWithoutLogo = ReturnType<
  typeof import("../config/fleet.form")["fleetFormSections"]["filter"]
>;

export type FleetEditDefaultValues = EditFleetFormValues | null;
export type FleetCreateSubmitPayload = CreateFleetFormValues & { logo: FleetFormLogoValue };
export type FleetEditSubmitPayload = EditFleetFormValues & { logo: FleetFormLogoValue };
