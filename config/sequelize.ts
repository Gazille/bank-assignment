import { DataTypes } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import Logger from "../src/middlewares/logger";

require("dotenv").config();

const config = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

/*
  I used `!` here, because I'm gonna check anyway to see if these
  env variables are passed or not when the server starts
  refer to checking-env-variables.ts for reference
*/
const sequelize = new Sequelize(
  config.database!,
  config.username!,
  config.password,
  {
    host: config.host,
    dialect: "postgres",
    logging: false,
    port: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const BankAccount = sequelize.define("bank_accounts", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bank_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  init_deposit: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  debit: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  createdAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: DataTypes.DATE,
  },
});

const Bank = sequelize.define("banks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  init_deposit: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: DataTypes.DATE,
  },
});

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: DataTypes.DATE,
  },
});

const Transaction = sequelize.define("transactions", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  from_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  to_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  from_bank_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  to_bank_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ammount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: DataTypes.DATE,
  },
});

User.hasMany(BankAccount, {
  foreignKey: "user_id",
});
BankAccount.belongsTo(User);

Bank.hasMany(BankAccount, {
  foreignKey: "bank_id",
});
BankAccount.belongsTo(Bank);

BankAccount.hasMany(Transaction),
  {
    foreignKey: "from_bank_id",
  };
Transaction.belongsTo(BankAccount);

const startDbConnection = async () => {
  try {
    await sequelize.authenticate().then(() => {
      User.sync();
      Bank.sync();
      BankAccount.sync();
      Transaction.sync();
    });

    Logger.info("Connection to database has been established successfully.");
  } catch (error: any) {
    Logger.error("Unable to connect to the database:");
    Logger.error(error.message);
  }
};

export { sequelize, startDbConnection };
