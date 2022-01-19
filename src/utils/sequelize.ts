import {Sequelize} from "sequelize";
import dbConfig from '../config/db.config'

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    retry: {
        match: [/Deadlock/i],
        max: 3, // Maximum rety 3 times
    },
});


export default sequelize
