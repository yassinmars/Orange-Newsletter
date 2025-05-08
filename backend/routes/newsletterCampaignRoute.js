const express = require("express");
const newsletterCampaignRoute = express.Router();

const {
    getNewsletterCampaign,
    postNewsletterCampaign,
    putNewsletterCampaign,
    deleteNewsletterCampaign
} = require("../controllers/newsletterCampaignController");

newsletterCampaignRoute.get("/getNewsletters", getNewsletterCampaign);
newsletterCampaignRoute.post("/createNewsletter", postNewsletterCampaign );
newsletterCampaignRoute.put("/putNewsletter/:id",putNewsletterCampaign);
newsletterCampaignRoute.delete("/deleteNewsletter/:id", deleteNewsletterCampaign);

module.exports = newsletterCampaignRoute;