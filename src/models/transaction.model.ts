export interface Transaction {
    idempotentKey: string;
    userId: string;
    amount: number;
    type: 'credit' | 'debit';
  }
  