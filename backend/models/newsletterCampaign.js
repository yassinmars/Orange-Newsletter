const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/connectdb");
const newsletter = require("./newsletter");
const template = require("./template");

const NewsletterCampaign = sequelize.define(
  "newsletter_campaign",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    templateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: template,
        key: "id",
      },
    },
    newsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: newsletter,
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("draft", "scheduled", "sent"),
      defaultValue: "draft",
    },
    scheduledAt: { type: DataTypes.DATE },
    sentAt: { type: DataTypes.DATE },
  },
  {
    tableName: "newsletter_campaign",
    timestamps: true,
  }
);

// 💡 No semicolon above this line!

NewsletterCampaign.associate = (models) => {
  NewsletterCampaign.hasMany(models.news, {
    foreignKey: "campaignId",
    as: "news",
  });
};

module.exports = NewsletterCampaign;
