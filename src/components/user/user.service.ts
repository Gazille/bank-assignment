import {
  ICreateUser,
  ILoginUser,
  IUser,
  IUserSerialized,
} from "../../../models/user/user.interface";
import userRepository from "./user.repository";

class UserService {
  async findOneByEmail(email: String): Promise<IUserSerialized | null> {
    const result = await userRepository.findOneByEmail(email);
    return result;
  }

  async create(user: ICreateUser): Promise<IUserSerialized | null> {
    const result = await userRepository.create(user);
    return result;
  }
}

export default new UserService();
