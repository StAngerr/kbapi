import sequelize from "../utils/sequelize";
import { DataTypes, Model } from "sequelize";
import User from "./User.model";
import CategoryModel from "./Category.model";

class Skill extends Model {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  author: number;
  categories: CategoryModel[];
}

Skill.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    shortDescription: {
      type: DataTypes.TEXT,
    },
    author: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Skill",
    tableName: "skills",
  }
).sync({ alter: true });

Skill.belongsTo(User, {
  foreignKey: "author",
});

export default Skill;
