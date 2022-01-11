import {Dialect} from "sequelize/dist/lib/sequelize";

interface DBConfig {
    HOST: string,
    USER: string,
    PASSWORD: string,
    DB: string,
    dialect: Dialect,
}

const config: DBConfig = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "admin",
    DB: "knblock",
    dialect: "mysql",
}

export default config