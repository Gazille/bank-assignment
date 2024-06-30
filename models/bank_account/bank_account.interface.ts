export interface ICreateBankAccount {
  name: string;
  user_id: number | undefined;
  bank_id: number;
  init_deposit: number;
  debit: number;
}

export interface IBankAccountSerialized {
  id: number;
  name: string;
  user_id: number;
  bank_id: number;
  init_deposit: number;
  debit: number;
}
