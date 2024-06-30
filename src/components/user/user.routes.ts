import Express from "express";
import { validateRequest } from "../../middlewares/validate-request";
import userController from "./user.controller";
import { createUserValidation } from "./user.schemas";

const router = Express.Router()
  .post("/", validateRequest(createUserValidation), userController.signUp)
  .post("/login", userController.login);

export default router;
