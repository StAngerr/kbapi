import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/sequelize";
import User from "./User.model";

class UserAuthModel extends Model {
  userId: number;
  changePasswordVerifyToken: string;
  confirmEmailToken: string;
}

UserAuthModel.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    changePasswordVerifyToken: {
      type: DataTypes.CHAR,
    },
    confirmEmailToken: {
      type: DataTypes.CHAR,
    },
  },
  {
    sequelize,
    modelName: "UserAuth",
    tableName: "user_auth",
  }
).sync({ alter: true });

UserAuthModel.belongsTo(User, {
  foreignKey: "userId",
});

export default UserAuthModel;
