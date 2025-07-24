import { useEffect, useState } from "react";

const App = () => {
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://dummyjson.com/quotes/random");
        if (!response.ok) throw new Error("Error occurred: " + response.status);
        const data = await response.json();
        setQuote({ quote: data.quote, author: data.author });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote(); 
    const id = setInterval(fetchQuote, 5000); 
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center px-4">
      {isLoading && <h2 className="text-lg">Loading...</h2>}
      {!isLoading && !quote.quote && <h2>Data not found</h2>}
      {!isLoading && quote.quote && (
        <div>
          <h1 className="text-2xl font-bold mb-2">"{quote.quote}"</h1>
          <h2 className="text-lg text-gray-600">— {quote.author}</h2>
        </div>
      )}
    </div>
  );
};

export default App;
