import { QueryTypes } from "sequelize";
import { sequelize } from "../../../config/sequelize";
import {
  IBankAccountSerialized,
  ICreateBankAccount,
} from "../../../models/bank_account/bank_account.interface";
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
      const [row, inserted] = await sequelize.query(
        `insert  into ${BankAccountRepository._tableName} (${Object.keys(
          bankAccount
        )
          .map((k) => k)
          .join(", ")}) VALUES (${Object.values(bankAccount)
          .map((k) => `'${k}'`)
          .join(", ")}) RETURNING *`,
        { type: QueryTypes.INSERT }
      );
      if (inserted) {
        const result = await this.findOneById(bankAccount.bankId);
        return result as IBankAccountSerialized;
      }
      return null;
    } catch (err) {
      Logger.error(err);
      return null;
    }
  }
}

export default new BankAccountRepository();
