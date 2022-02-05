import { Dialect } from "sequelize/dist/lib/sequelize";

interface DBConfig {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB: string;
  dialect: Dialect;
}

const config: DBConfig = {
  HOST: process.env.dbUrl || "localhost",
  USER: process.env.dbUser || "root",
  PASSWORD: process.env.dbPassword || "admin",
  DB: "knblock",
  dialect: "mysql",
};

export default config;
