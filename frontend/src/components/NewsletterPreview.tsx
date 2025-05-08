const NewsletterPreview = ({ articles }) => {
    const grouped = {
      positive: [],
      neutral: [],
      negative: [],
    };
  
    articles.forEach((article) => grouped[article.sentiment]?.push(article));
  
    return (
      <div id="newsletter" className="space-y-6 bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">🗞️ Daily News Digest</h1>
  
        {Object.entries(grouped).map(
          ([sentiment, group]) =>
            group.length > 0 && (
              <div key={sentiment}>
                <h2 className="text-xl font-semibold mb-2 capitalize">
                  {sentiment === "positive" && "🟢 Positive News"}
                  {sentiment === "neutral" && "🟡 Neutral News"}
                  {sentiment === "negative" && "🔴 Negative News"}
                </h2>
                <ul className="space-y-2">
                  {group.map((article, index) => (
                    <li key={index}>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {article.title}
                      </a>
                      <p className="text-sm text-gray-600">{article.snippet}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )
        )}
      </div>
    );
  };
  export default NewsletterPreview;