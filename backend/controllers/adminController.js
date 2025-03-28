const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const getadmin = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json({ admin: admins });
  } catch (error) {
    res.status(500).json({ msg: "error on getting admin" });
  }
};

const postAdmin = async (req, res) => {
    try {
      const newAdmin = req.body;
      console.log(newAdmin);
      const createdAdmin = await Admin.create(newAdmin);
      res
        .status(200)
        .json({ Admin: createdAdmin, msg: "Admin created successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error on adding Admin:", error: error.message });
    }
  };

const signIn = async (req, res) => {
  const admin = req.body;
  try {
    const foundadmin = await Admin.findOne({ where: { Email: admin.Email } });
    if (foundadmin) {
      if (admin.Password === foundadmin.Password) {
        const token = jwt.sign(
          {
            id: foundadmin.id,
            // role: foundadmin.role,
            Email: foundadmin.Email,
            Password: foundadmin.Password,
          },
          process.env.JWT_SECRET
        );
        res.status(200).json({ admin: foundadmin, token: token });
      } else {
        res.status(401).json({ msg: "Wrong email or password" });
      }
    } else {
      res.status(400).json({ msg: "Admin is not registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "internal server error" });
  }
};

module.exports = { getadmin, signIn, postAdmin };
