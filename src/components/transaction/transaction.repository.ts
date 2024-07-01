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

  async getAllByUserId(
    id: number | undefined
  ): Promise<ITransactionSerialized[] | null> {
    try {
      const rows = await Common.dbFetch(
        TransactionRepository._tableName,
        {
          from_user_id: id,
          to_user_id: id,
        },
        null,
        "OR"
      );
      if (rows?.length) {
        const transactions = rows as ITransactionSerialized[];
        return transactions;
      } else {
        return null;
      }
    } catch (error) {
      Logger.error(error);
      return null;
    }
  }

  async getAllByBankAccountId(
    id: number | undefined
  ): Promise<ITransactionSerialized[] | null> {
    try {
      const rows = await Common.dbFetch(
        TransactionRepository._tableName,
        {
          from_bank_id: id,
          to_bank_id: id,
        },
        null,
        "OR"
      );
      if (rows?.length) {
        const transactions = rows as ITransactionSerialized[];
        return transactions;
      } else {
        return null;
      }
    } catch (error) {
      Logger.error(error);
      return null;
    }
  }
}

export default new TransactionRepository();
