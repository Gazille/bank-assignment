import { QueryTypes } from "sequelize";
import { sequelize } from "../../../config/sequelize";
import {
  IBankAccountSerialized,
  ICreateBankAccount,
  IUpdateBankAccount,
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

  async updateById(id: number, bankAccount: IUpdateBankAccount) {
    try {
      const query = `
      UPDATE ${BankAccountRepository._tableName}
      SET ${Object.keys(bankAccount)
        .map((col) => `${col} = '${bankAccount[col]}'`)
        .join(", ")}
      WHERE id = '${id}';
    `;
      await sequelize.query(query, { type: QueryTypes.UPDATE });
    } catch (err) {
      Logger.error(err);
      return null;
    }
  }

  async findByUserId(
    id: number | undefined
  ): Promise<IBankAccountSerialized[]> {
    try {
      const query = `
        SELECT ba.*
        FROM ${BankAccountRepository._tableName} ba
        INNER JOIN users u ON ba.user_id = u.id
        WHERE u.id = '${id}';
      `;
      const bankAccounts = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return bankAccounts as IBankAccountSerialized[];
    } catch (err) {
      Logger.error(err);
      return [];
    }
  }
}

export default new BankAccountRepository();
