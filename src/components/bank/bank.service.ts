import { ICreateBankAccount } from "../../../models/bank_account/bank_account.interface";
import bankRepository from "./bank.repository";

class BankService {
  async findOneById(id: number) {
    const result = await bankRepository.findOneById(id);
    return result;
  }
}

export default new BankService();
