export type TariffListParams = {
  page: number;
  limit: number;
  search?: string;
};

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
