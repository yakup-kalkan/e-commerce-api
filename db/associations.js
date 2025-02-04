import sequelize from './index.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

User.hasMany(Order, {
  foreignKey: {
    allowNull: false,
    name: "userId",
  },
});

Order.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    name: "userId" },
  onDelete: "CASCADE",
});

Category.hasMany(Product, {
  foreignKey: {
    allowNull: false,
    name: "categoryId",
  },
});

Product.belongsTo(Category, {
  foreignKey: {
    allowNull: false,
    name: "categoryId" },
  onDelete: "CASCADE",
});

Product.belongsToMany(Order, {
  through: 'OrderProducts',
  foreignKey: {
    name: "productId",
    allowNull: false,
  },
  otherKey: {
    name:'orderId',
    allowNull: false,
  }
});

Order.belongsToMany(Product, { 
  through: "OrderProducts"
});

(async () => {
  try {
    await sequelize.sync();
    console.log("Database synced.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();