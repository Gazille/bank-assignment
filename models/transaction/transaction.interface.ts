export interface ICreateTransaction {
  from_bank_id: number;
  to_bank_id: number;
  from_user_id: number | undefined;
  to_user_id: number;
  note: string;
  ammount: number;
}

export interface ITransactionSerialized {
  id: number;
  from_bank_id: number;
  to_bank_id: number;
  from_user_id: number | undefined;
  to_user_id: number;
  note: string;
  ammount: number;
}
