export interface OemMockData {
  id: string;
  tariffName: string;
  isParent?: boolean;
  parentId?: string;
  models?: string[];
  additionalModelsCount?: number;
  updatedAt: string;
  updatedBy: string;
}

export const mockOemData: OemMockData[] = [
  {
    id: "1",
    tariffName: "Axon Energies",
    isParent: true,
    models: ["AX-FAST-120"],
    additionalModelsCount: 1,
    updatedAt: "-",
    updatedBy: "-",
  },
  {
    id: "1-1",
    parentId: "1",
    tariffName: "",
    models: ["AX-FAST-120"],
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "Admin",
  },
  {
    id: "1-2",
    parentId: "1",
    tariffName: "",
    models: ["Harmony Gen1 60kW"],
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "Admin",
  },
  {
    id: "2",
    tariffName: "Exicom",
    isParent: true,
    models: ["AX-FAST-120"],
    additionalModelsCount: 1,
    updatedAt: "-",
    updatedBy: "-",
  },
  {
    id: "2-1",
    parentId: "2",
    tariffName: "ABB",
    models: ["Harmony Gen1 60kW"],
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "Admin",
  },
  {
    id: "2-2",
    parentId: "2",
    tariffName: "ABB",
    models: ["Harmony Gen1 60kW"],
    updatedAt: "May 18, 2023 1:27:08 PM",
    updatedBy: "Admin",
  },
];
