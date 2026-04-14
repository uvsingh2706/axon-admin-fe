export type TariffData = {
  id: string;
  name: string;
  dateCreated: string;
  updatedAt: string;
  updatedBy: string;
};

export type TariffDetailData = {
  name: string;
  value: string;
  serviceFee: string;
  tax: string;
};

export type TariffEditData = {
  name: string;
  value: string;
  serviceFee: string;
  tax: string;
};
