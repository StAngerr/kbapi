import sequelize from "../utils/sequelize";
import { DataTypes, Model } from "sequelize";

class User extends Model {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    lastName: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "email",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmedEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
).sync({ alter: true });

User.update(
  {
    password: "123",
  },
  {
    where: {
      password: "",
    },
  }
)
  .then(console.log)
  .catch(console.log);

export default User;
