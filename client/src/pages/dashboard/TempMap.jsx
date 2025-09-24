import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import locationIcon from "../../../public/location_green.svg"; // import the svg as an asset
import FloatingButton from "@/components/FloatingButton";
import FloatingExit from "../FloatingExit";

const TempMap = () => {
  const mapRef = useRef(null);
  const { state } = useLocation();
  const complaint = state?.complaint;
  const AZURE_MAPS_API = import.meta.env.VITE_AZURE_API;

  useEffect(() => {
    if (!complaint?.geotag) return;

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
        const map = new window.atlas.Map(mapRef.current, {
          center: [complaint.geotag.lng, complaint.geotag.lat],
          zoom: 14,
          language: "en-US",
          view: "Auto",
          authOptions: {
            authType: "subscriptionKey",
            subscriptionKey: AZURE_MAPS_API,
          },
        });

        map.events.add("ready", () => {
          console.log("Azure Map loaded!");

          // Create custom marker with title + SVG icon
          const markerDiv = document.createElement("div");
          markerDiv.innerHTML = `
<div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            ">
  <span style="
                background: white;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: bold;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                margin-bottom: 4px;
              ">
    ${complaint.title}
  </span>
  <img src="${locationIcon}" alt="marker" style="width:24px;height:24px;" />
</div>
`;

          const pin = new window.atlas.HtmlMarker({
            position: [complaint.geotag.lng, complaint.geotag.lat],
            htmlContent: markerDiv,
          });

          map.markers.add(pin);
        });
      };
      document.body.appendChild(script);
    };

    loadMap();
  }, [complaint]);

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "100vh", borderRadius: "8px", overflow: "hidden", }} />
      <FloatingExit />{" "}
    </>
  );
};

export default TempMap;
