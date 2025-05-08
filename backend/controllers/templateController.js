const Template = require("../models/template");

require("dotenv").config();

const getTemplate = async (req, res) => {
  try {
    const template = await Template.findAll();
    res.status(200).json({ template: template });
  } catch (error) {
    res.status(500).json({ msg: "error on getting template" });
  }
};

const postTemplate = async (req, res) => {
  try {
    const newTemplate = req.body;
    console.log(newTemplate);
    const createdTemplate = await Template.create(newTemplate);
    res.status(200).json({
      Template: createdTemplate,
      msg: "Template created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error on adding Template:", error: error.message });
  }
};

const putTemplate = async (req, res) => {
  const TemplateId = req.params.id;
  const updatedTemplate = req.body;

  try {
    const foundTemplate = await Template.findByPk(TemplateId);

    if (!foundTemplate) {
      return res.status(404).json({ msg: "Template not found" });
    }

    await foundTemplate.update(updatedTemplate);

    res.status(200).json({
      msg: "Template has been updated successfully",
      updatedTemplate: foundTemplate,
    });
  } catch (error) {
    console.error("Error updating Template:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const deleteTemplate = async (req, res) => {
  const TemplateId = req.params.id;
  try {
    const foundTemplate = await Template.findByPk(TemplateId);
    if (!foundTemplate) {
      res.status(404).json({ msg: "Template not found" });
    }
    await foundTemplate.destroy();
    res.status(200).json({ msg: "Template deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

module.exports = { getTemplate, postTemplate, putTemplate, deleteTemplate };
