export interface ICreateBankAccount {
  name: string;
  code: string;
  bankId: number;
  initDeposit: number;
  debit: number;
}

export interface IBankAccountSerialized {
  name: string;
  code: string;
  bankId: number;
  initDeposit: number;
  debit: number;
}
