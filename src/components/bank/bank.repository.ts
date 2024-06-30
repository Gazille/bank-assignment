import {
  IBank,
  IBankSerialized,
  ICreateBank,
} from "../../../models/bank/bank.interface";
import { sequelize } from "../../../config/sequelize";
import { QueryTypes } from "sequelize";
import Logger from "../../middlewares/logger";
import Common from "../../../utils/common";

class BankRepository {
  static _tableName = "banks";
  async findOneById(id: number): Promise<IBankSerialized | null> {
    try {
      const result = await sequelize.query(
        `select * from ${BankRepository._tableName} where id='${id}' limit 1`,
        { type: QueryTypes.SELECT }
      );
      if (result?.length) {
        const user = result[0] as IBankSerialized;

        return user;
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  async create(bank: ICreateBank): Promise<IBankSerialized | null> {
    try {
      const insertQuery = await Common.dbInsertion(
        BankRepository._tableName,
        bank
      );
      if (insertQuery && insertQuery.inserted) {
        const newBank = insertQuery.data[0] as IBankSerialized;
        return newBank;
      }
      return null;
    } catch (err) {
      Logger.error(err);
      return null;
    }
  }
}

export default new BankRepository();
