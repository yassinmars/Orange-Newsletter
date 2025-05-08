const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../configuration/connectdb');
const NewsletterCampaign = require('./NewsletterCampaign');
const News = require('./Newsletter');  // your existing “newsletter” model

const CampaignItem = sequelize.define('campaign_item', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  campaignId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: NewsletterCampaign,
      key: 'id'
    }
  },
  newsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: News,
      key: 'id'
    }
  },
  section: {
    type: DataTypes.ENUM('Header','Featured', 'Top','additional'),
    allowNull: false
  },
}, {
  tableName: 'campaign_item',
  timestamps: false,
  indexes: [
    { unique: true, fields: ['campaignId','newsId'] }
  ]
});

// associations
// NewsletterCampaign.belongsToMany(News, {
//   through: CampaignItem,
//   foreignKey: 'campaignId',
//   otherKey: 'newsId'
// });
// News.belongsToMany(NewsletterCampaign, {
//   through: CampaignItem,
//   foreignKey: 'newsId',
//   otherKey: 'campaignId'
// });

module.exports = CampaignItem;
