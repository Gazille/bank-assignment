import app from "./app";
import { startDbConnection } from "./config/sequelize";
import Logger from "./src/middlewares/logger";

const start = async () => {
  await startDbConnection();

  app.listen(3000, () => Logger.info("Listening on port 3000!"));
};

start();
