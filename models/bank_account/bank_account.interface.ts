import { ITransactionSerialized } from "../transaction/transaction.interface";

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
  transactions?: ITransactionSerialized[];
}

export interface IUpdateBankAccount {
  name?: string | undefined;
  user_id?: number | undefined;
  bank_id?: number | undefined;
  debit: number;
  [key: string]: any;
}
