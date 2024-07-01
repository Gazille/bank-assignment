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
}

export default new TransactionService();
