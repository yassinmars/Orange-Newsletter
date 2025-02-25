const express = require("express");
const newsletterRoute = express.Router();

const {
    getNewsletter,
    getOneNewsletter,
    postNewsletter,
    // signIn,
    putNewsletter,
    deleteNewsletter
} = require("../controllers/newsletterController");

// const isAuth = require("../middleware/isAuth");
// const isAutho = require("../middleware/isAutho");

newsletterRoute.get("/newsletter", getNewsletter);
newsletterRoute.get("/newsletter/:id", getOneNewsletter  /*isAuth, isAutho(['admin'])*/ );
// newsletterRoute.get("/usersCount", isAuth, isAutho(['admin']), countUsers);
newsletterRoute.post("/addNewsletter", postNewsletter /*isAuth, isAutho(['admin'])*/ );
// newsletterRoute.post("/signIn", signIn);
newsletterRoute.put("/putNewsletter/:id", putNewsletter);
newsletterRoute.delete("/deleteNewsletter/:id", deleteNewsletter);

module.exports = newsletterRoute;