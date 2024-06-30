import Express from "express";
import { validateRequest } from "../../middlewares/validate-request";
import bankAccountController from "./bank_account.controller";
import { createBankAccountValidation } from "./bank_account.schemaas";

const router = Express.Router()
  .post(
    "/",
    validateRequest(createBankAccountValidation),
    bankAccountController.create
  )
  .get("/", bankAccountController.getBankAccountsByUserId);

export default router;
