import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const MapSearch = ({ map }) => {
  const subscriptionKey = import.meta.env.VITE_AZURE_API;

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const debounceRef = useRef(null);

  // 🔍 Handle search input and fetch suggestions
  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      return;
    }
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://atlas.microsoft.com/search/fuzzy/json`,
          {
            params: {
              "api-version": "1.0",
              query,
              typeahead: true,
              limit: 5,
              "subscription-key": subscriptionKey,
            },
          },
        );

        const locations = response.data.results || [];
        setResults(locations);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 300);
  }, [query]);

  const handleResultClick = (result) => {
    const position = result.position;
    const name = result.poi?.name || "Location";

    setQuery(result.address?.freeformAddress);
    setResults([]);

    if (map) {
      map.setCamera({
        center: [position.lon, position.lat],
        zoom: 14,
      });
    }
  };

  return (
    <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}>
      <input
        type="text"
        placeholder="Search for a place..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {results.length > 0 && (
        <ul
          style={{
            marginTop: "4px",
            backgroundColor: "white",
            width: "300px",
            border: "1px solid #ccc",
            maxHeight: "200px",
            overflowY: "auto",
            listStyle: "none",
            padding: 0,
          }}
        >
          {results.map((result, idx) => (
            <li
              key={idx}
              onClick={() => handleResultClick(result)}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
            >
              <strong>
                {result.poi?.name || result.address?.freeformAddress}
              </strong>
              <br />
              <small>{result.address?.freeformAddress}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MapSearch;
