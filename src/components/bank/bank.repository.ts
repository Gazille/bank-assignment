import { IBank } from "../../../models/bank/bank.interface";
import { sequelize } from "../../../config/sequelize";
import { QueryTypes } from "sequelize";

class BankRepository {
  static _tableName = "banks";
  async findOneById(id: number): Promise<IBank | null> {
    try {
      const result = await sequelize.query(
        `select * from ${BankRepository._tableName} where id='${id}' limit 1`,
        { type: QueryTypes.SELECT }
      );
      if (result?.length) {
        const user = result[0] as IBank;

        return user;
      }
      return null;
    } catch (err) {
      return null;
    }
  }
}

export default new BankRepository();
