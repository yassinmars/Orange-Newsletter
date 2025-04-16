require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { searchGoogle } = require("./scrape");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  const articles = await searchGoogle(query);
  res.json(articles);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
