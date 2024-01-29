export type TTransactionEntries = {
  transaction_id: number;
  transaction_ref_id?: number;
  wallet_id: number;
  transaction_type_id: number;
  transaction_additional_detail_id: number;
  amount: string;
  description: string;
  transaction_date: string;
};
