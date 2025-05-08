import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import NewsletterPreview from "./NewsletterPreview";

const SearchNews = () => {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await axios.get(
        `http://localhost:6005/search?q=${query}`
      );
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="space-y-4 mt-4 ml-4 mr-4">
      <div className="flex gap-2">  
        <Input
          type="text"
          placeholder="Enter a topic to search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
        <Button
          onClick={handleSearch}
          variant="orange"
          className="flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>
      <ul className="space-y-2">
        {articles.map((article, index) => (
          <li key={index} className="border p-4 rounded-lg">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              {article.title}
            </a>
            <p className="text-gray-600">{article.snippet}</p>
          </li>
        ))}
      </ul>
      {articles.length > 0 && <NewsletterPreview articles={articles} />}
    </div>
  );
};

export default SearchNews;