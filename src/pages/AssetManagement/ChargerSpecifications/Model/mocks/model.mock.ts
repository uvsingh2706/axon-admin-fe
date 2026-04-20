export interface ModelMockData {
  id: string;
  model: string;
  oemName: string;
  noOfConnectors: number;
  outputMax: string;
  chargingModelType: "AC" | "DC";
  currentType: "AC" | "DC";
  phaseType: number;
  manualPdf: string;
  specPdf: string;
  updatedAt: string;
  updatedBy: string;
}

export const mockModelData: ModelMockData[] = [
  {
    id: "1",
    model: "AX-FAST-120",
    oemName: "Axon Energies",
    noOfConnectors: 2,
    outputMax: "23 A",
    chargingModelType: "AC",
    currentType: "AC",
    phaseType: 1,
    manualPdf: "MAN-78456-...",
    specPdf: "SPE-78456-...",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "admin",
  },
  {
    id: "2",
    model: "Harmony Gen1 60kW",
    oemName: "Exicom",
    noOfConnectors: 4,
    outputMax: "23 A",
    chargingModelType: "DC",
    currentType: "DC",
    phaseType: 2,
    manualPdf: "MAN-78456-...",
    specPdf: "SPE-78456-...",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "admin",
  },
  {
    id: "3",
    model: "Sicharge D 160kW",
    oemName: "Siemens",
    noOfConnectors: 2,
    outputMax: "23 A",
    chargingModelType: "DC",
    currentType: "DC",
    phaseType: 1,
    manualPdf: "-",
    specPdf: "-",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "admin",
  },
  {
    id: "4",
    model: "Terra 54 CJG",
    oemName: "ABB",
    noOfConnectors: 1,
    outputMax: "23 A",
    chargingModelType: "DC",
    currentType: "DC",
    phaseType: 2,
    manualPdf: "MAN-78456-...",
    specPdf: "SPE-78456-...",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "admin",
  },
  {
    id: "5",
    model: "DC Wallbox 25kW",
    oemName: "Delta Electronics",
    noOfConnectors: 4,
    outputMax: "23 A",
    chargingModelType: "AC",
    currentType: "AC",
    phaseType: 2,
    manualPdf: "MAN-78456-...",
    specPdf: "SPE-78456-...",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "operation",
  },
  {
    id: "6",
    model: "TP-DC-60kW Fast Charger",
    oemName: "Tata Power EZ Charge",
    noOfConnectors: 2,
    outputMax: "23 A",
    chargingModelType: "AC",
    currentType: "AC",
    phaseType: 2,
    manualPdf: "MAN-78456-...",
    specPdf: "SPE-78456-...",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "admin",
  },
];
