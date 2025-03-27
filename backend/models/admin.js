const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/connectdb");

const User = sequelize.define(
  "admin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Email: {  
      type: DataTypes.STRING,
      allowNull:false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    // Role:{
    //   enum: DataTypes.STRING,
    //   allowNull: false,
    // },
  },
  { timestamps: false },
);

module.exports = User;