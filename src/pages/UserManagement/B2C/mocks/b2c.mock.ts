import type { B2CUserData, B2CTransactionRow } from "../types/b2c.type";

const transactionSeed: Omit<B2CTransactionRow, "id">[] = [
  {
    invoiceId: "KA/26-27/CpD7hJv",
    stationName: "Sonam Pangiri Restau...",
    chargingPointName: "Casa Grand",
    dateTime: "May 18, 2023 - 1:27:08 pm",
    durationHours: 3,
    energyConsumptionKwh: 123,
    invoiceType: "Top Up",
    amount: "₹83",
  },
  {
    invoiceId: "KA/26-27/CpD7hJv",
    stationName: "Tiger Lily",
    chargingPointName: "Casa Grand",
    dateTime: "May 18, 2023 - 1:27:08 pm",
    durationHours: 3,
    energyConsumptionKwh: 123,
    invoiceType: "Charging",
    amount: "₹83",
  },
  {
    invoiceId: "KA/26-27/CpD7hJv",
    stationName: "Sonam Pangiri Restau...",
    chargingPointName: "Casa Grand",
    dateTime: "May 18, 2023 - 1:27:08 pm",
    durationHours: 3,
    energyConsumptionKwh: 123,
    invoiceType: "Charging",
    amount: "₹83",
  },
  {
    invoiceId: "KA/26-27/CpD7hJv",
    stationName: "Sonam Pangiri Restau...",
    chargingPointName: "Casa Grand",
    dateTime: "May 18, 2023 - 1:27:08 pm",
    durationHours: 3,
    energyConsumptionKwh: 123,
    invoiceType: "Charging",
    amount: "₹83",
  },
  {
    invoiceId: "KA/26-27/CpD7hJv",
    stationName: "Tiger Lily",
    chargingPointName: "Casa Grand",
    dateTime: "May 18, 2023 - 1:27:08 pm",
    durationHours: 3,
    energyConsumptionKwh: 123,
    invoiceType: "Charging",
    amount: "₹83",
  },
];

function buildTransactions(count: number): B2CTransactionRow[] {
  return Array.from({ length: count }).map((_, idx) => {
    const seed = transactionSeed[idx % transactionSeed.length];
    return { id: `txn_${idx + 1}`, ...seed };
  });
}

export const mockB2CUsers: B2CUserData[] = [
  {
    id: "u_1",
    name: "Ravindra Joshi",
    avatarUrl: "",
    phoneNumber: "8721937813",
    email: "-",
    location: "Delhi",
    availableBalance: 200,
    energyConsumedKwh: 1.75,
    chargingTransactions: 5,
    transactionHistory: buildTransactions(40),
  },
  {
    id: "u_2",
    name: "Vihaan Gupta",
    phoneNumber: "8721937813",
    email: "vihaan.g@example.com",
    location: "Delhi",
    availableBalance: 150,
    energyConsumedKwh: 2.5,
    chargingTransactions: 3,
    transactionHistory: buildTransactions(15),
  },
  {
    id: "u_3",
    name: "Rhea Kapoor",
    email: "rhea.kapoor@example.com",
    phoneNumber: "8721937813",
    location: "Delhi",
    availableBalance: 500,
    energyConsumedKwh: 4.2,
    chargingTransactions: 8,
    transactionHistory: buildTransactions(25),
  },
];
