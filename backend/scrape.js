require("dotenv").config();
const axios = require("axios");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

async function searchGoogle(query) {
  const newsQuery = `${query} site:news.google.com`; // Search only Google News
  const url = `https://www.googleapis.com/customsearch/v1?q=${newsQuery}&key=${API_KEY}&cx=${SEARCH_ENGINE_ID}`;

  try {
    const response = await axios.get(url);
    return response.data.items.map((item) => {
      const analysis = sentiment.analyze(item.title + " " + item.snippet);
      const label =
        analysis.score > 0
          ? "positive"
          : analysis.score < 0
          ? "negative"
          : "neutral";

      return {
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        sentiment: label,
      };
    });
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
}

module.exports = { searchGoogle };
