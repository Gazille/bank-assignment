export interface IBank {
  name: string;
  init_deposit: number;
}

export interface ICreateBank {
  name: string;
  init_deposit: number;
}

export interface IBankSerialized {
  id: number;
  name: string;
  init_deposit: number;
}
