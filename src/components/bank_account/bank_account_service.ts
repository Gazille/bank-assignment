import {
  ICreateBankAccount,
  IUpdateBankAccount,
} from "../../../models/bank_account/bank_account.interface";
import Logger from "../../middlewares/logger";
import bankAccountRepository from "./bank_account.repository";

class BankAccountService {
  async create(bankAccount: ICreateBankAccount) {
    const result = await bankAccountRepository.create(bankAccount);
    return result;
  }

  async updateById(id: number, bankAccount: IUpdateBankAccount) {
    const result = await bankAccountRepository.updateById(id, bankAccount);
    return result;
  }

  async findOneById(id: number) {
    const result = await bankAccountRepository.findOneById(id);
    return result;
  }

  async findByUserId(id: number | undefined) {
    if (id) {
      const result = await bankAccountRepository.findByUserId(id);
      return result;
    }
  }

  async findAll() {
    const result = bankAccountRepository.findAll();
    return result;
  }
}

export default new BankAccountService();
