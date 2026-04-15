export interface TransactionData {
  id: string;
  transactionId: string;
  user: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
  paymentMethod: string;
}
