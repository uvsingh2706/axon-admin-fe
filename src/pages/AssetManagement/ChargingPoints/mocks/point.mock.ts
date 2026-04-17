import type {
  ChargingPointData,
  PointDetailsData,
  PointDocument,
  PointField,
  PointEditData,
} from "../types/ChargingPoints.types";

export const mockChargingPoints: ChargingPointData[] = [
  {
    id: "CP-001",
    chargingPointName: "My Home Tarkshya",
    oem: "exicom",
    model: "terra 7point4 ac",
    station: "marina skies tower 1",
    lastHeartbeatReceived: "May 18, 2023 1:27:08 PM",
    status: "Unavailable",
    tariff: "marinaskies",
    connectionType: "WIFI",
    publishedStatus: "Yes",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "admin",
  },
  {
    id: "CP-002",
    chargingPointName: "Station 2",
    oem: "exicom",
    model: "terra 7point4 ac",
    station: "aparna crest",
    lastHeartbeatReceived: "May 18, 2023 1:27:08 PM",
    status: "Available",
    tariff: "marinaskies",
    connectionType: "WIFI",
    publishedStatus: "No",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "admin",
  },
  {
    id: "CP-003",
    chargingPointName: "Station 2",
    oem: "exicom",
    model: "terra 7point4 ac",
    station: "aparna crest",
    lastHeartbeatReceived: "May 18, 2023 1:27:08 PM",
    status: "Available",
    tariff: "marinaskies",
    connectionType: "WIFI",
    publishedStatus: "Yes",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "admin",
  },
  {
    id: "CP-004",
    chargingPointName: "My Home Tarkshya",
    oem: "exicom",
    model: "terra 7point4 ac",
    station: "marina skies tower 1",
    lastHeartbeatReceived: "May 18, 2023 1:27:08 PM",
    status: "Available",
    tariff: "marinaskies",
    connectionType: "WIFI",
    publishedStatus: "Yes",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "admin",
  },
  {
    id: "CP-005",
    chargingPointName: "Station 2",
    oem: "exicom",
    model: "terra 7point4 ac",
    station: "aparna crest",
    lastHeartbeatReceived: "May 18, 2023 1:27:08 PM",
    status: "Available",
    tariff: "marinaskies",
    connectionType: "WIFI",
    publishedStatus: "Yes",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "operation",
  }
];

export const pointDetailFields: PointField[] = [
  { label: "Configuration URL", key: "configurationUrl" },
  { label: "Charging Point ID", key: "chargingPointId" },
  { label: "Serial Number", key: "serialNumber" },
  { label: "Charging Station", key: "chargingStation" },
  { label: "Communication Protocol (Version)", key: "protocolVersion" },
  { label: "OEM", key: "oem" },
  { label: "Commissioned on", key: "commissionedOn" },
  { label: "Model", key: "model" },
  { label: "Type", key: "type" },
  { label: "Published", key: "published" },
  { label: "Firmware Version", key: "firmwareVersion" },
];

export const mockPointDetailsById: Record<string, PointDetailsData> = {
  "CP-001": {
    stationName: "My Home Tarkshya",
    chargingTransactions: "2",
    totalRevenue: "₹200",
    fields: {
      configurationUrl: "ws://c-be-uel.ioncharge.tech/ocpp/smart3.t3test",
      chargingPointId: "smart3.t3test",
      serialNumber: "ME250461",
      chargingStation: "My Home Tarkshya",
      protocolVersion: "ocpp1.6",
      oem: "EVRE",
      commissionedOn: "March 10, 2026 12:00:00 AM",
      model: "Model 1",
      type: "March 10, 2026 12:00:00 AM",
      published: "True",
      firmwareVersion: "4.0.1",
    },
    documents: [
      { id: "doc-1", title: "User Manual PDF", size: "1.2MB", uploadedAt: "24/01/25" },
      { id: "doc-2", title: "Specification PDF", size: "1.2MB", uploadedAt: "U24/01/25" },
    ],
  },
};

export const mockPointEditById: Record<string, PointEditData> = {
  "CP-001": {
    pointName: "smart3.t3test",
    pointId: "smart3.t3test",
    configurationUrl: "ws://c-be-uel.ioncharge.tech/ocpp/smart3.t3test",
    station: "station-1",
    oem: "evre",
    model: "model-x1",
    commissionOn: "2026-03-10",
    tariff: "tariff-a",
    connectionType: "wifi",
    isPublic: true,
  },
};

export const getPointSummaryCards = (point: PointDetailsData) => [
  { title: "Charging Transactions", value: point.chargingTransactions },
  { title: "Total Revenue", value: point.totalRevenue },
];

export type { PointDocument };
