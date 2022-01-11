import sequelize from "../utils/sequelize";
import {DataTypes, Model} from "sequelize";
import User from "./User.model";


class Skill extends Model {}


Skill.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    author: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Skill',
    tableName: 'skills'
}).sync({ alter: true });


Skill.belongsTo(User, {
    foreignKey: 'author'
})


export default Skill;