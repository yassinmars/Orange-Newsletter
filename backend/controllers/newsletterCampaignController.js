const NewsletterCampaign = require("../models/newsletterCampaign");
// const Template = require("../models/template");
const newsletter = require("../models/newsletter");

require("dotenv").config();

const getNewsletterCampaign = async (req, res) => {
  try {
    const newsletterCampaign = await NewsletterCampaign.findAll();
    res.status(200).json({ newsletter: newsletterCampaign });
  } catch (error) {
    res.status(500).json({ msg: "error on getting newsletterCampaign" });
    console.error("Error fetching newsletter campaigns:", error); // 👈 crucial for debugging
  }
};

const postNewsletterCampaign = async (req, res) => {
  try {
    const newNewsletterCampaign = req.body;
    console.log(newNewsletterCampaign);

    // Step 1: Extract and create template
    // const templateData = newNewsletterCampaign.template;
    // const createdTemplate = await Template.create(templateData);

    const createdCampaign = await NewsletterCampaign.create(newNewsletterCampaign);

    res.status(200).json({
      newsletterCampaign: createdCampaign,
      // template: createdTemplate,
      msg: "newsletterCampaign created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({
        msg: "Error on adding newsletterCampaign:",
        error: error.message,
      });
  }
};

const putNewsletterCampaign = async (req, res) => {
  const newsletterCampaignId = req.params.id;
  const updatedNewsletterCampaign = req.body;

  try {
    const foundNewsletterCampaign = await newsletterCampaign.findByPk(
      newsletterCampaignId
    );

    if (!foundNewsletterCampaign) {
      return res.status(404).json({ msg: "newsletterCampaign not found" });
    }

    await foundNewsletterCampaign.update(updatedNewsletterCampaign);

    res.status(200).json({
      msg: "newsletterCampaign has been updated successfully",
      updatedNewsletterCampaign: foundNewsletterCampaign,
    });
  } catch (error) {
    console.error("Error updating newsletterCampaign:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const deleteNewsletterCampaign = async (req, res) => {
  const newsletterCampaignId = req.params.id;
  try {
    const foundNewsletterCampaign = await newsletterCampaign.findByPk(
      newsletterCampaignId
    );
    if (!foundNewsletterCampaign) {
      res.status(404).json({ msg: "newsletterCampaign not found" });
    }
    await foundNewsletterCampaign.destroy();
    res.status(200).json({ msg: "newsletterCampaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

module.exports = {
  getNewsletterCampaign,
  postNewsletterCampaign,
  putNewsletterCampaign,
  deleteNewsletterCampaign,
};
