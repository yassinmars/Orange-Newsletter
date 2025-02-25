const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/connectdb");

const User = sequelize.define(
  "newsletter",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Title: {  
      type: DataTypes.STRING,
    },
    Description: {
      type: DataTypes.STRING,
    },
    Links:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    Video:{
      type: DataTypes.STRING,
    },
    Image:{
      type: DataTypes.STRING,
    },
    Date:{
      type: DataTypes.STRING,
    },
    Category:{
      type: DataTypes.STRING,
    },
  },
  { timestamps: false },
);

module.exports = User;