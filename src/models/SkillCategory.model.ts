import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";
import Skill from "./Skill.model";
import CategoryModel from "./Category.model";

class SkillCategoryModel extends Model {
  skillId: number;
  categoryId: number;
}

SkillCategoryModel.init(
  {
    skillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "skill_category",
    modelName: "SkillCategoryModel",
    timestamps: false,
  }
).sync({ alter: true });

SkillCategoryModel.belongsToMany(Skill, {
  through: "skillId",
});

SkillCategoryModel.belongsToMany(CategoryModel, {
  through: "skillId",
});

export default SkillCategoryModel;
