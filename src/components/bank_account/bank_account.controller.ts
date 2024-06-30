import { Request, Response } from "express";
import { ICreateBankAccount } from "../../../models/bank_account/bank_account.interface";
import CustomResponse from "../../../utils/custom-response";
import Logger from "../../middlewares/logger";
import bankService from "../bank/bank.service";
import userService from "../user/user.service";
import bank_account_service from "./bank_account_service";

class BankAccountController {
  async create(req: Request, res: Response) {
    const { name, bankId } = req.body;
    const bank = await bankService.findOneById(bankId);

    const dataOject: ICreateBankAccount = {
      name,
      user_id: req.user?.id,
      bank_id: bankId,
      init_deposit: bank?.init_deposit || 50000,
      debit: bank?.init_deposit || 50000,
    };

    const bankAccount = await bank_account_service.create(dataOject);
    Logger.info(bankAccount);
    if (bankAccount) {
      return CustomResponse.send(res, bankAccount, "Created Successfully", 200);
    } else {
      throw new Error();
    }
  }

  async getBankAccountsByUserId(req: Request, res: Response) {
    const user = await userService.findOneById(req.user?.id);
    if (user) {
      const bankAccount = await bank_account_service.findByUserId(req.user?.id);
      CustomResponse.send(res, bankAccount, "Get Successfully", 200);
    } else {
      return CustomResponse.sendWithError(res, "Invalid Credentials!", 400);
    }
  }
}

export default new BankAccountController();
