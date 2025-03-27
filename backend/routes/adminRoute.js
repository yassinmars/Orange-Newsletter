const express = require("express");
const adminRoute = express.Router();

const {
    signIn,
    getadmin,
    postAdmin
} = require("../controllers/adminController");

const isAuth = require("../middleware/isAuth");
const isAutho = require("../middleware/isAutho");

adminRoute.get("/admin", getadmin);
adminRoute.post("/signIn", signIn);
adminRoute.post("/addAdmin", postAdmin);
// adminRoute.get("/admin/:id", getOneadmin  ,isAuth, isAutho(/*['admin']*/) );
// adminRoute.post("/addadmin", upload.single("file"), postadmin ,isAuth, isAutho(/*['admin']*/) );

module.exports = adminRoute;