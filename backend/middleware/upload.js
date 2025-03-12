const multer = require("multer");
const path = require("path");

//Set up the location of the file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../assets/"));
    },
    filename: function (req, file, cb) {
      const uniqueFilename = Date.now() + "-" + file.originalname
      cb(null, uniqueFilename);

      req.filePath = `/assets/${uniqueFilename}`;
    },
  });

const upload = multer({ storage: storage });

module.exports = upload;