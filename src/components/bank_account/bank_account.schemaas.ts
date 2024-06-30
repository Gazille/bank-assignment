import Joi from "joi";
import { IValidationSchema } from "../../../utils/joi.interfaces";

export const createBankAccountValidation: IValidationSchema = {
  body: Joi.object({
    name: Joi.string().min(2).required(),
    code: Joi.string().min(2).required(),
    bankId: Joi.number().required(),
  }).required(),
};
