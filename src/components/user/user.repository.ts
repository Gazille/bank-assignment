import { QueryTypes } from "sequelize";
import { sequelize } from "../../../config/sequelize";
import {
  ICreateUser,
  IUserSerialized,
} from "../../../models/user/user.interface";
import Common from "../../../utils/common";
import Logger from "../../middlewares/logger";

class UserRepository {
  constructor() {}

  static _tableName = "users";

  async findOneByEmail(email: String): Promise<IUserSerialized | null> {
    try {
      const result = await sequelize.query(
        `select * from ${UserRepository._tableName} where email='${email}' limit 1`,
        { type: QueryTypes.SELECT }
      );
      if (result?.length) {
        const user = result[0] as IUserSerialized;

        return user;
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  async findOneById(id: number): Promise<IUserSerialized | null> {
    const rows = await Common.dbFetch(UserRepository._tableName, { id });
    if (rows?.length) {
      const user = rows[0] as IUserSerialized;

      // removing password from the object before serializing it
      user.password = undefined;
      return user;
    } else {
      return null;
    }
  }

  async create(user: ICreateUser): Promise<IUserSerialized | null> {
    try {
      const insertQuery = await Common.dbInsertion(
        UserRepository._tableName,
        user
      );
      if (insertQuery && insertQuery.inserted) {
        const newBank = insertQuery.data[0] as IUserSerialized;
        return newBank;
      }
      return null;
    } catch (err) {
      Logger.error(err);
      return null;
    }
  }
}

export default new UserRepository();
