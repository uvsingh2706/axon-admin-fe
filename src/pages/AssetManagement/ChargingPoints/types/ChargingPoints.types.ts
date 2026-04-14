export type ChargingPointData = {
  id: string;
  station: string;
  connectorType: string;
  status: "Online" | "Charging" | "Offline" | "Maintenance";
  power: string;
  lastSession: string;
  energyDelivered: string;
};

export type CreatePointFormValues = {
  name: string;
  id: string;
  configurationUrl?: string;
  station: string;
  oem: string;
  model: string;
  commissionOn: string;
  tariff: string;
  connectionType: string;
  isPublic: boolean;
};

export type EditPointFormValues = CreatePointFormValues;
