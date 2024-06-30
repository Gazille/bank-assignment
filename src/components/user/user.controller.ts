import {
  ICreateUser,
  ILoginUser,
  IUserSerialized,
} from "../../../models/user/user.interface";
import CustomResponse from "../../../utils/custom-response";
import { JWT } from "../../../utils/jwt";
import { BadRequestError } from "../../errors/bad-request-error";
import { Password } from "../../../utils/password";
import { Request, Response } from "express";
import userService from "./user.service";

class UserController {
  async signUp(req: Request, res: Response) {
    const { firstname, lastname, email, password } = req.body;

    const existingUser = await userService.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestError("There's a user with this email already!");
    }
    const hashedPassword = await Password.toHash(password);

    const dataObject: ICreateUser = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    };

    const user = await userService.create(dataObject);
    if (user) {
      const token = JWT.sign(user);
      const result = { user, token };
      return CustomResponse.send(res, result, "Created Successfully", 200);
    } else {
      throw new Error();
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const dataObject: ILoginUser = {
      email,
      password,
    };

    const user = await userService.findOneByEmail(email);
    if (!user) {
      return CustomResponse.sendWithError(res, "Invalid Credentials!", 404);
    }

    const isMatch = await Password.compare(user.password || "", password);
    if (isMatch) {
      const token = JWT.sign(user);

      const userSerialization = user as IUserSerialized;
      userSerialization.password = undefined;

      const result = { user: userSerialization, token };
      CustomResponse.send(res, result, `Welcome Back, ${user.firstname}`);
    } else {
      return CustomResponse.sendWithError(res, "Invalid Credentials!", 400);
    }
  }
}

export default new UserController();
