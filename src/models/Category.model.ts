import async from "async";
import { DataTypes, Model } from "sequelize";
import { skillCategoriesColumns } from "../types/Skill.types";
import sequelize from "../utils/sequelize";
import Skill from "./Skill.model";

class CategoryModel extends Model {
  id: number;
  name: string;
}

CategoryModel.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "name",
    },
  },
  {
    sequelize,
    modelName: "CategoryModel",
    tableName: "categories",
  }
)
  .sync({ alter: true })
  .then(() => {
    async.each(skillCategoriesColumns, (item: string, cb) => {
      CategoryModel.findOrCreate({
        where: {
          name: item,
        },
      });
    });
  });

export default CategoryModel;
