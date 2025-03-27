const express = require("express");
const newsletterRoute = require("./routes/newsletterRoute");
const adminRoute = require("./routes/adminRoute");
const { connectDb } = require("./configuration/connectdb");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(cors());

const port = process.env.PORT;
connectDb();

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running on port ${port}`);
  }
});

app.use(express.json());
app.use("/api", newsletterRoute);
app.use("/api", adminRoute);
