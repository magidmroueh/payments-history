export interface PaymentItem {
  id: number;
  contract_id: number;
  description: string;
  value: number;
  time: Date;
  is_imported: Boolean;
  created_at: Date;
  updated_at: Date;
  is_deleted: Boolean;
}

export interface InputPaymentItem {
  contract_id: number;
  description: string;
  value: number;
  time: string
}
