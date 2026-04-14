export type TaxData = {
  id: string;
  taxName: string;
  type: string;
  dateCreated: string;
  updatedAt: string;
  updatedBy: string;
};

export type TaxDetailData = {
  taxName: string;
  type: string;
  percentageValue: string;
};

export type TaxEditData = {
  taxName: string;
  type: string;
  percentageValue: string;
};
