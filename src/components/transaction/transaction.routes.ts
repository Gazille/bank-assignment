import Express from "express";
import { validateRequest } from "../../middlewares/validate-request";
import transactionController from "./transaction.controller";
import { createTransactionValidation } from "./transaction.schemas";

const router = Express.Router().post(
  "/",
  validateRequest(createTransactionValidation),
  transactionController.create
);

export default router;
