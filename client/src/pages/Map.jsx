import React, { useEffect, useRef } from "react";

const MyMap = () => {
  const mapRef = useRef(null);

  const AZURE_MAPS_API = import.meta.env.VITE_AZURE_API;

  useEffect(() => {
    const loadMap = () => {
      // Load Azure Maps CSS
      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href =
        "https://atlas.microsoft.com/sdk/javascript/mapcontrol/3/atlas.min.css";
      document.head.appendChild(cssLink);

      // Load Azure Maps JS
      const script = document.createElement("script");
      script.src =
        "https://atlas.microsoft.com/sdk/javascript/mapcontrol/3/atlas.min.js";
      script.onload = () => {
        // Initialize map
        const map = new window.atlas.Map(mapRef.current, {
          center: [77.5946, 12.9716], // Bangalore
          zoom: 13,
          language: "en-US",
          view: "Auto",
          authOptions: {
            authType: "subscriptionKey",
            subscriptionKey: AZURE_MAPS_API,
          },
        });

        map.events.add("ready", () => {
          console.log("Azure Map loaded!");
        });
      };
      document.body.appendChild(script);
    };

    loadMap();
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100vh",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    />
  );
};

export default MyMap;
