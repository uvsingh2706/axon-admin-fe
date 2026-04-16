export interface B2CTransactionRow {
  id: string;
  invoiceId: string;
  stationName: string;
  chargingPointName: string;
  dateTime: string;
  durationHours: number;
  energyConsumptionKwh: number;
  invoiceType: string;
  amount: string;
}

export interface B2CUserData {
  id: string;
  name: string;
  avatarUrl?: string;
  phoneNumber: string;
  email: string;
  location: string;
  availableBalance: number;
  energyConsumedKwh: number;
  chargingTransactions: number;
  transactionHistory: B2CTransactionRow[];
}
