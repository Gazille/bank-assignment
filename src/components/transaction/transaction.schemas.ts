import Joi from "joi";
import { IValidationSchema } from "../../../utils/joi.interfaces";

export const createTransactionValidation: IValidationSchema = {
  body: Joi.object({
    fromBankAccountId: Joi.number().required(),
    toBankAccountId: Joi.number().required(),
    note: Joi.string().optional(),
    ammount: Joi.number().required(),
  }).required(),
};
