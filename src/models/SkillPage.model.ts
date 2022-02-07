import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";
import Skill from "./Skill.model";

class SkillPageModel extends Model {}

SkillPageModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    skillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    config: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "skill_page",
    modelName: "SkillPageModel",
  }
).sync({ alter: true });

SkillPageModel.belongsTo(Skill, {
  foreignKey: "skillId",
});

export default SkillPageModel;
