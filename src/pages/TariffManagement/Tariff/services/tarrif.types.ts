export type TariffListParams = {
  page: number;
  limit: number;
  search?: string;
};

export interface TaxDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  taxName: string;
  value: string;
  type: string;
  updatedBy: string;
}

export interface TariffDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  tariffName: string;
  ratePerUnit: string;
  serviceFees: string;
  currency: string;
  taxId: string;
  updatedBy: string;
  tax?: TaxDTO;
  charging_point?: unknown[];
}

export interface TariffListResponse {
  status: number;
  data: {
    tariffs: TariffDTO[];
    count: number;
    page: number;
    limit: number;
  };
}

export interface TariffDetailResponse {
  status: number;
  data: TariffDTO;
}

export interface CreateTariffRequest {
  tariffName: string;
  ratePerUnit: number;
  serviceFees: number;
  currency: string;
  taxId: string;
}

export type UpdateTariffRequest = Partial<CreateTariffRequest>;
