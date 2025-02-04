import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    tableName: "Categories",
  }
);

export default Category;
