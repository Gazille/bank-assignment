import { ICreateBank } from "../../../models/bank/bank.interface";
import bankRepository from "./bank.repository";

class BankService {
  async create(bank: ICreateBank) {
    const result = await bankRepository.create(bank);
    return result;
  }

  async findOneById(id: number) {
    const result = await bankRepository.findOneById(id);
    return result;
  }
}

export default new BankService();
