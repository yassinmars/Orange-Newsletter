const express = require("express");
const templateRoute = express.Router();

const {
  getTemplate,
  postTemplate,
  putTemplate,
  deleteTemplate,
} = require("../controllers/templateController");

templateRoute.get("/getTemplate", getTemplate);
templateRoute.post("/postTemplate", postTemplate);
templateRoute.put("/putTemplate/:id", putTemplate);
templateRoute.delete("/deleteTemplate/:id", deleteTemplate);

module.exports = templateRoute;
