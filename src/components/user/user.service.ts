import {
  ICreateUser,
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

  async findOneById(id: number | undefined) {
    if (id) {
      const result = await userRepository.findOneById(id);
      return result;
    }
  }
}

export default new UserService();
