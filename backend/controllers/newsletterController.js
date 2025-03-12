const Newsletter = require("../models/newsletter");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const getNewsletter = async (req, res) => {
  try {
    const newsletters = await Newsletter.findAll();
    res.status(200).json({ Newsletter: newsletters });
  } catch (error) {
    res.status(500).json({ msg: "error on getting newsletter" });
  }
};

const getOneNewsletter = async (req, res) => {
  const id = req.params.id;
  console.log(req.Newsletter);
  try {
    const foundNewsletter = await User.findByPk(id);
    if (foundNewsletter) {
      res.status(200).json({ newsletter: foundNewsletter });
    } else {
      res.status(404).json({ msg: "The newsletter does not exist" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error on getting newsletter" });
  }
};

const postNewsletter = async (req, res) => {
  try {
    const newNewsletter = req.body;
    console.log(newNewsletter);
    if (req.file) {
      newNewsletter.filePath = req.filePath; // Store uploaded file path
      newNewsletter.Image = req.filePath;
    }

    const createdNewsletter = await Newsletter.create(newNewsletter);
    res
      .status(200)
      .json({ newsletter: createdNewsletter, msg: "newsletter created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error on adding newsletter:", error: error.message });
  }
};

const putNewsletter = async (req, res) => {
  const NewsletterId = req.params.id;
  const updatedNewsletter = req.body;

  try {
    const foundNewsletter = await Newsletter.findByPk(NewsletterId);

    if (!foundNewsletter) {
      return res.status(404).json({ msg: "Newsletter not found" });
    }

    // Check if a new file was uploaded
    let updatedFilePath = foundNewsletter.Image;  // Default to old image path if no new file

    if (req.file) {
      // If there is a new file uploaded, delete the old file
      if (foundNewsletter.Image) {
        // Extract the relative path of the old image
        const oldFilePath = path.join(__dirname, "..", foundNewsletter.Image); // Assuming Image is a relative path
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath); // Delete the old file
        }
      }

      // Update the file path with the new uploaded file
      updatedFilePath = req.filePath;  // The relative path set by multer
    }

    await foundNewsletter.update({
      ...updatedNewsletter,
      Image: updatedFilePath,  // Set the new file path
      filePath: updatedFilePath // Update the file path if needed
    });

    res.status(200).json({
      msg: "Newsletter has been updated successfully",
      updatedNewsletter: foundNewsletter,
    });
  } catch (error) {
    console.error("Error updating newsletter:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const deleteNewsletter = async(req, res) =>{
  const NewsletterId = req.params.id;
  try {
  const foundNewsletter = await Newsletter.findByPk(NewsletterId);
  if(!foundNewsletter){
    res.status(404).json({msg:"Newsletter not found"});
  }
  
  const imagePath = path.join(__dirname, "..", foundNewsletter.Image); // Assuming Image is a relative path

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath); // Delete the old file
  }

  await foundNewsletter.destroy();
  res.status(200).json({msg:"Newsletter deleted successfully"});
  } catch (error) {
    res.status(500).json({msg:"internal server error"});
  }
}

// const signIn = async (req, res) => {
//   const Newsletter = req.body;
//   try {
//     const foundNewsletter = await Newsletter.findOne({ where: { email: Newsletter.email } });
//     if (foundUser) {
//       if (user.password === foundUser.password) {
//         const token = jwt.sign(
//           { 
//             id: foundUser.id, 
//             role: foundUser.role, 
//             email: foundUser.email,
//             nickname: foundUser.nickname,
//            },
//           process.env.JWT_SECRET
//         );
//         res.status(200).json({ user: foundUser, token: token});
//       } else {
//         res.status(401).json({ msg: "wrong email or password" });
//       }
//     } else {
//       res.status(400).json({ msg: "User is not registered" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "internal server error" });
//   }
// };


module.exports = { getOneNewsletter, getNewsletter, postNewsletter, /*signIn,*/ putNewsletter, deleteNewsletter};
