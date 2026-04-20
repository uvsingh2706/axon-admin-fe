export type TaxListParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
};

export interface TaxDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  taxName: string;
  value: string | number;
  type: string;
  updatedBy: string;
}

export interface TaxListResponse {
  status: number;
  data: {
    data: TaxDTO[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    }
  };
}

export interface TaxDetailResponse {
  status: number;
  data: TaxDTO;
}

export interface CreateTaxRequest {
  taxName: string;
  type: string;
  value: number;
}

export interface UpdateTaxRequest {
  taxName?: string;
  type?: string;
  value?: number;
}
