import Express from "express";
import { validateRequest } from "../../middlewares/validate-request";
import bankController from "./bank.controller";
import { createBankValidation } from "./bank.schemas";

const router = Express.Router().post(
  "/",
  validateRequest(createBankValidation),
  bankController.create
);

export default router;
