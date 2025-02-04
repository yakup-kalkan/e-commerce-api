import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Order = sequelize.define(
  "Order",
  {
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Orders",
  }
);

export default Order;
