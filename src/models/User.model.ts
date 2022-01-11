import sequelize from "../utils/sequelize";
import {DataTypes, Model} from "sequelize";


class User extends Model {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    lastName: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize, modelName: 'User', tableName: 'user'}).sync({alter: true})


export default User;