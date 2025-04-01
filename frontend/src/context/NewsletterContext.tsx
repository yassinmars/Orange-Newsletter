import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const NewsletterContext = createContext();

// Provider component
export const NewsletterProvider = ({ children }) => {
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    // Fetch newsletters data using axios
    axios
      .get("http://localhost:6005/api/newsletter")
      .then((res) => {
        setNewsletters(res.data.Newsletter); // Set the newsletters state with the fetched data
      })
      .catch((err) => console.error("Error fetching newsletters:", err));
  }, []);

  return (
    <NewsletterContext.Provider value={{ newsletters }}>
      {children}
    </NewsletterContext.Provider>
  );
};
