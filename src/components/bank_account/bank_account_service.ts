import { ICreateBankAccount } from "../../../models/bank_account/bank_account.interface";
import bankAccountRepository from "./bank_account.repository";

class BankAccountService {
  async create(bankAccount: ICreateBankAccount) {
    const result = await bankAccountRepository.create(bankAccount);
    return result;
  }

  async findByUserId(id: number | undefined) {
    if (id) {
      const result = await bankAccountRepository.findByUserId(id);
      return result;
    }
  }
}

export default new BankAccountService();
