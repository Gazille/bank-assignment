export interface ICreateBankAccount {
  name: string;
  code: string;
  bankId: number;
  init_deposit: number;
  debit: number;
}

export interface IBankAccountSerialized {
  id: number;
  name: string;
  code: string;
  bankId: number;
  init_deposit: number;
  debit: number;
}
