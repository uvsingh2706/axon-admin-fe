import type {
  ChargingPointData,
  PointDetailsData,
  PointDocument,
  PointField,
  PointEditData,
} from "../types/ChargingPoints.types";

export const mockChargingPoints: ChargingPointData[] = [
  { id: "CP-001", station: "Hub Alpha", connectorType: "CCS2", status: "Online", power: "150 kW", lastSession: "2026-04-03 09:15", energyDelivered: "42.5 kWh" },
  { id: "CP-002", station: "Hub Alpha", connectorType: "Type 2", status: "Charging", power: "22 kW", lastSession: "2026-04-03 10:30", energyDelivered: "18.2 kWh" },
  { id: "CP-003", station: "Hub Beta", connectorType: "CHAdeMO", status: "Offline", power: "50 kW", lastSession: "2026-04-02 14:00", energyDelivered: "0 kWh" },
  { id: "CP-004", station: "Hub Beta", connectorType: "CCS2", status: "Online", power: "150 kW", lastSession: "2026-04-03 08:45", energyDelivered: "67.3 kWh" },
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
