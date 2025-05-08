const express = require("express");
const newsletterRoute = require("./routes/newsletterRoute");
const adminRoute = require("./routes/adminRoute");
const templateRoute = require("./routes/templateRoute");
const { connectDb } = require("./configuration/connectdb");
const cors = require("cors");
const dotenv = require("dotenv");
const campaignRoute = require("./routes/newsletterCampaignRoute");
const { searchGoogle } = require("./scrape");

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
app.use("/assets", express.static("assets"));
app.use("/api", newsletterRoute);
app.use("/api", adminRoute);
app.use("/api", campaignRoute);
app.use("/api", templateRoute);

// Add /search route for scraping and sentiment analysis
app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const articles = await searchGoogle(query);
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});
