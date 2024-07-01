import {
  ICreateTransaction,
  ITransactionSerialized,
} from "../../../models/transaction/transaction.interface";
import transactionRepository from "./transaction.repository";

class TransactionService {
  async create(
    transaction: ICreateTransaction
  ): Promise<ITransactionSerialized | null> {
    const result = await transactionRepository.create(transaction);
    return result;
  }

  async getAllByUserId(id: number | undefined) {
    const result = await transactionRepository.getAllByUserId(id);
    return result;
  }

  async getAllByBankAccountId(id: number | undefined, condition: any = null) {
    const result = await transactionRepository.getAllByBankAccountId(
      id,
      condition
    );
    return result;
  }
}

export default new TransactionService();
