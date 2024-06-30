import { QueryTypes } from "sequelize";
import { sequelize } from "../../../config/sequelize";
import {
  IBankAccountSerialized,
  ICreateBankAccount,
} from "../../../models/bank_account/bank_account.interface";
import Common from "../../../utils/common";
import Logger from "../../middlewares/logger";

class BankAccountRepository {
  static _tableName = "bank_accounts";

  async findOneById(id: number): Promise<IBankAccountSerialized | null> {
    try {
      const result = await sequelize.query(
        `select * from ${BankAccountRepository._tableName} where id='${id}' limit 1`,
        { type: QueryTypes.SELECT }
      );
      if (result?.length) {
        const bankAccount = result[0] as IBankAccountSerialized;
        return bankAccount;
      }
      return null;
    } catch (err) {
      Logger.error(err);
      return null;
    }
  }

  async create(
    bankAccount: ICreateBankAccount
  ): Promise<IBankAccountSerialized | null> {
    try {
      const insertQuery = await Common.dbInsertion(
        BankAccountRepository._tableName,
        bankAccount
      );
      if (insertQuery && insertQuery.inserted) {
        const newBank = insertQuery.data[0] as IBankAccountSerialized;
        return newBank;
      }
      return null;
    } catch (err) {
      Logger.error(err);
      return null;
    }
  }
}

export default new BankAccountRepository();
