export interface ConnectorMockData {
  id: string;
  connectorName: string;
  model: string;
  ioType: "AC" | "DC";
  connectorStandard: string;
  connectorOutput: string;
  updatedAt: string;
  updatedBy: string;
}

export const mockConnectorData: ConnectorMockData[] = [
  {
    id: "1",
    connectorName: "Type - 1 Connector",
    model: "Terra 54 CJG",
    ioType: "AC",
    connectorStandard: "Type_2",
    connectorOutput: "23 A",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "admin",
  },
  {
    id: "2",
    connectorName: "Type - 6 Connector",
    model: "Harmony Gen1 60kW",
    ioType: "DC",
    connectorStandard: "Type_2",
    connectorOutput: "23 A",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "admin",
  },
  {
    id: "3",
    connectorName: "Type - 2 Connector",
    model: "Terra 54 CJG",
    ioType: "DC",
    connectorStandard: "Type_2",
    connectorOutput: "23 A",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "admin",
  },
  {
    id: "4",
    connectorName: "Type - 5 Connector",
    model: "Terra 54 CJG",
    ioType: "DC",
    connectorStandard: "Type_2",
    connectorOutput: "23 A",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "admin",
  },
  {
    id: "5",
    connectorName: "Connector 2",
    model: "Harmony Gen1 60kW",
    ioType: "AC",
    connectorStandard: "Type_2",
    connectorOutput: "23 A",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "operation",
  },
  {
    id: "6",
    connectorName: "Type - 2 Connector",
    model: "Tata Power EZ Charge",
    ioType: "AC",
    connectorStandard: "Type_2",
    connectorOutput: "23 A",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "admin",
  },
  {
    id: "7",
    connectorName: "Type - 2 Connector",
    model: "Terra 54 CJG",
    ioType: "AC",
    connectorStandard: "Type_2",
    connectorOutput: "23 A",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "admin",
  },
  {
    id: "8",
    connectorName: "Type - 1 Connector",
    model: "Terra 54 CJG",
    ioType: "AC",
    connectorStandard: "Type_2",
    connectorOutput: "23 A",
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "admin",
  },
];
