import {
  ICreateTransaction,
  ITransactionSerialized,
} from "../../../models/transaction/transaction.interface";
import Common from "../../../utils/common";
import Logger from "../../middlewares/logger";

class TransactionRepository {
  static _tableName = "transactions";

  async create(
    transaction: ICreateTransaction
  ): Promise<ITransactionSerialized | null> {
    try {
      const insertQuery = await Common.dbInsertion(
        TransactionRepository._tableName,
        transaction
      );

      if (insertQuery && insertQuery.inserted) {
        const newBank = insertQuery.data[0] as ITransactionSerialized;
        return newBank;
      }
      return null;
    } catch (err) {
      Logger.error(err);
      return null;
    }
  }
}

export default new TransactionRepository();
