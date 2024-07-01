import express, { Request, Response } from "express";
import "express-async-errors";
import bodyParser from "body-parser";

import { NotFoundError } from "./src/errors/not-found-error";
import { errorHandler } from "./src/middlewares/error-handler";
import { currentUser } from "./src/middlewares/current-user";
import userRouter from "./src/components/user/user.routes";
import bankRouter from "./src/components/bank/bank.routes";
import transactionRouter from "./src/components/transaction/transaction.routes";
import bankAccountRoutes from "./src/components/bank_account/bank_account.routes";

const app = express();
app.use(express.json());
app.use(currentUser);
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response): void => {
  res.send("Welcome to the home page!");
});

app.use("/users", userRouter);
app.use("/banks", bankRouter);
app.use("/bank_accounts", bankAccountRoutes);
app.use("/transactions", transactionRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
