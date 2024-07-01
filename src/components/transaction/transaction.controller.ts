import { Request, Response } from "express";
import { IUpdateBankAccount } from "../../../models/bank_account/bank_account.interface";
import { ICreateTransaction } from "../../../models/transaction/transaction.interface";
import CustomResponse from "../../../utils/custom-response";
import Logger from "../../middlewares/logger";
import bankAccountService from "../bank_account/bank_account_service";
import transactionService from "./transaction.service";

class TransactionController {
  async create(req: Request, res: Response) {
    const { fromBankAccountId, toBankAccountId, note, ammount } = req.body;

    const fromBank = await bankAccountService.findOneById(fromBankAccountId);
    if (!fromBank) {
      return CustomResponse.sendWithError(res, "Invalid From Bank!", 400);
    }

    const toBank = await bankAccountService.findOneById(toBankAccountId);
    if (!toBank) {
      return CustomResponse.sendWithError(res, "Invalid To Bank!", 400);
    }

    if (Number(fromBank.debit) - Number(fromBank.init_deposit) < ammount) {
      return CustomResponse.sendWithError(
        res,
        "Insufficient balance From Bank!",
        400
      );
    }

    const dataObject: ICreateTransaction = {
      from_bank_id: fromBankAccountId,
      to_bank_id: toBankAccountId,
      note,
      ammount,
      from_user_id: req.user?.id,
      to_user_id: toBank.user_id,
    };
    const transaction = await transactionService.create(dataObject);

    if (transaction) {
      const dataUpdateFromBank: IUpdateBankAccount = {
        debit: Number(fromBank.debit) - ammount,
      };

      const dataUpdateToBank: IUpdateBankAccount = {
        debit: Number(toBank.debit) + ammount,
      };

      await bankAccountService.updateById(fromBank.id, dataUpdateFromBank);
      await bankAccountService.updateById(toBank.id, dataUpdateToBank);

      CustomResponse.send(res, transaction, "Create Successfully", 200);
    } else {
      return CustomResponse.sendWithError(res, "Invalid Credentials!", 400);
    }
  }
}

export default new TransactionController();
