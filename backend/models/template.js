const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/connectdb");

const template = sequelize.define(
  "template",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    TemplateType: {
      type: DataTypes.ENUM,
      values: ["Template_A", "Template_B", "Template_C"],
      required: true,
    },
    // html_skeleton: {
    //   type: DataTypes.TEXT("long"),
    //   allowNull: true,
    // },
    header: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    featured: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    news1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    news2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    news3: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    news4: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    news5: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { timestamps: false }
);

module.exports = template;
