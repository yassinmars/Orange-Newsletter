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
      allowNull:false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    Links:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    Video:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    Image:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    Date:{
      type: DataTypes.STRING,
    },
    Category:{
      type: DataTypes.STRING,
    },
    Status:{
      type: DataTypes.ENUM({
        values: ['draft', 'scheduled', 'sent'],
        defaultValue : 'draft',
      })
    },
  },
  { timestamps: false },
);

module.exports = User;