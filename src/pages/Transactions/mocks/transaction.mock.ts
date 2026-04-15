import type { TransactionData } from "../types/transaction.type";

export const mockTransactions: TransactionData[] = [
  {
    id: "1",
    transactionId: "TXN-982431",
    user: "Aarav Sharma",
    amount: "₹ 500.00",
    status: "Completed",
    date: "2024-05-15T14:30:00Z",
    paymentMethod: "Credit Card",
  },
  {
    id: "2",
    transactionId: "TXN-382910",
    user: "Vihaan Gupta",
    amount: "₹ 1,200.00",
    status: "Pending",
    date: "2024-05-15T12:05:00Z",
    paymentMethod: "UPI",
  },
  {
    id: "3",
    transactionId: "TXN-734891",
    user: "Ananya Patel",
    amount: "₹ 350.00",
    status: "Failed",
    date: "2024-05-14T09:12:00Z",
    paymentMethod: "Wallet",
  },
  {
    id: "4",
    transactionId: "TXN-102934",
    user: "Rohan Verma",
    amount: "₹ 2,500.00",
    status: "Completed",
    date: "2024-05-14T16:45:00Z",
    paymentMethod: "Net Banking",
  },
  {
    id: "5",
    transactionId: "TXN-492102",
    user: "Priya Singh",
    amount: "₹ 800.00",
    status: "Completed",
    date: "2024-05-13T10:10:00Z",
    paymentMethod: "Credit Card",
  },
];
