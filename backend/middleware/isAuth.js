const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req, res, next) =>{
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if(!token){
            return res.status(401).json({msg:"No token, authorization denied"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        console.log(req.admin);
        next();
    } catch (error) {
        console.log(error);
        console.log(error.name);
        if(error.name == "TokenExpiredError"){
            res.status(401).json({msg:"Token expired"});
        }else if (error.message == "invalid signature"){
            res.status("401").json({msg:"The token signature is invalid"})
        }else{
            res.status(500).json({msg:"Internal server error"});
        }
    }
};

module.exports = isAuth;