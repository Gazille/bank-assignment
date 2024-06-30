import { Request, Response } from "express";
import { ICreateBankAccount } from "../../../models/bank_account/bank_account.interface";
import customResponse from "../../../utils/custom-response";
import Logger from "../../middlewares/logger";
import bankService from "../bank/bank.service";
import bank_account_service from "./bank_account_service";

class BankAccountController {
  async create(req: Request, res: Response) {
    const { name, code, bankId } = req.body;
    const bank = await bankService.findOneById(bankId);

    const dataOject: ICreateBankAccount = {
      code,
      name,
      bankId,
      initDeposit: bank?.initDeposit || 50000,
      debit: bank?.initDeposit || 50000,
    };

    const bankAccount = await bank_account_service.create(dataOject);
    Logger.info(bankAccount);
    if (bankAccount) {
      return customResponse.send(res, bankAccount, "Created Successfully", 200);
    } else {
      throw new Error();
    }
  }
}

export default new BankAccountController();
