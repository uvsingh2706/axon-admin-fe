export type ChargingPointData = {
  id: string;
  chargingPointName: string;
  oem: string;
  model: string;
  station: string;
  lastHeartbeatReceived: string;
  status: string;
  tariff: string;
  connectionType: string;
  publishedStatus: "Yes" | "No";
  updatedAt: string;
  updatedBy: string;
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

export type PointField = {
  label: string;
  key: string;
};

export type PointDocument = {
  id: string;
  title: string;
  size: string;
  uploadedAt: string;
};

export type PointDetailsData = {
  stationName: string;
  chargingTransactions: string;
  totalRevenue: string;
  fields: Record<string, string>;
  documents: PointDocument[];
};

export type PointEditData = {
  pointName: string;
  pointId: string;
  configurationUrl: string;
  station: EditPointFormValues["station"];
  oem: EditPointFormValues["oem"];
  model: EditPointFormValues["model"];
  commissionOn: string;
  tariff: EditPointFormValues["tariff"];
  connectionType: EditPointFormValues["connectionType"];
  isPublic: boolean;
};
