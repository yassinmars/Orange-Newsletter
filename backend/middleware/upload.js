const multer = require("multer");
const path = require("path");

//Set up the location of the file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../assets/"));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

const upload = multer({ storage: storage });

module.exports = upload;