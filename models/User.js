import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const User = sequelize.define( "User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
{
  timestamps: true,
  tableName: "Users",
}
);

export default User;
