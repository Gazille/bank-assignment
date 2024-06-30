import { Request, Response } from "express";
import { ICreateBank } from "../../../models/bank/bank.interface";
import customResponse from "../../../utils/custom-response";
import bankService from "./bank.service";

class BankController {
  async create(req: Request, res: Response) {
    const { name, init_deposit } = req.body;

    const dataOject: ICreateBank = {
      name,
      init_deposit,
    };

    const bank = await bankService.create(dataOject);
    if (bank) {
      return customResponse.send(res, bank, "Created Successfully", 200);
    } else {
      throw new Error();
    }
  }
}

export default new BankController();
