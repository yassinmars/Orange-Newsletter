// Load environment variables
require("dotenv").config();

// Imports
const express = require("express");
const cors = require("cors");
const http = require("http");

const { searchGoogle } = require("./scrape");
const newsletterRoute = require("./routes/newsletterRoute");
const { connectDb } = require("./configuration/connectdb");

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to database
connectDb();

// Define routes
app.use("/api", newsletterRoute);

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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error("Server error:", err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
