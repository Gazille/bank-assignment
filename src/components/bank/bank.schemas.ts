import Joi from "joi";
import { IValidationSchema } from "../../../utils/joi.interfaces";

export const createBankValidation: IValidationSchema = {
  body: Joi.object({
    name: Joi.string().min(2).required(),
    init_deposit: Joi.number().required(),
  }).required(),
};
