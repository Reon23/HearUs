import FloatingButton from "@/components/FloatingButton";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import location from "../../public/location.svg";
import { ServerContext } from "@/context/ServerContext";

const MyMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const { upvoteComplaint } = useContext(ServerContext);
  const [popupData, setPopupData] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const AZURE_MAPS_API = import.meta.env.VITE_AZURE_API;

  useEffect(() => {
    const loadMap = async () => {
      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href =
        "https://atlas.microsoft.com/sdk/javascript/mapcontrol/3/atlas.min.css";
      document.head.appendChild(cssLink);

      const script = document.createElement("script");
      script.src =
        "https://atlas.microsoft.com/sdk/javascript/mapcontrol/3/atlas.min.js";
      script.onload = async () => {
        mapInstance.current = new window.atlas.Map(mapRef.current, {
          center: [77.5946, 12.9716],
          zoom: 13,
          language: "en-US",
          view: "Auto",
          authOptions: {
            authType: "subscriptionKey",
            subscriptionKey: AZURE_MAPS_API,
          },
        });

        mapInstance.current.events.add("ready", async () => {
          console.log("Azure Map loaded!");

          try {
            const response = await axios.get(
              "http://localhost:3000/map/mapdata",
            );
            const complaintsArray = response.data.MapData;
            console.log(complaintsArray);

            complaintsArray.forEach((c) => {
              const lat = parseFloat(c.lat?.replace(",", "."));
              const lng = parseFloat(c.lng?.replace(",", "."));

              if (isNaN(lat) || isNaN(lng)) {
                console.warn("Skipping complaint due to invalid lat/lng:", c);
                return;
              }

              const markerDiv = document.createElement("img");

              markerDiv.style.color = "white";
              markerDiv.src = location;
              markerDiv.style.height = "16px";
              markerDiv.style.width = "16px";

              markerDiv.onclick = async () => {
                const response = await axios.get(
                  `http://localhost:3000/map/mapdata/${c.id}`,
                );
                const latestComplaint = response.data.MapData;
                setPopupData({
                  id: latestComplaint.id,
                  label: latestComplaint.title,
                  description: latestComplaint.desc,
                  image: latestComplaint.imgurl,
                  upvotes: latestComplaint.upvotes,
                });
                setPopupVisible(true);
              };

              const marker = new window.atlas.HtmlMarker({
                htmlContent: markerDiv,
                position: [lng, lat],
              });

              mapInstance.current.markers.add(marker);
            });
          } catch (error) {
            console.error("Error fetching complaints:", error);
          }
        });
      };
      document.body.appendChild(script);
    };

    loadMap();
  }, []);

  const closePopup = () => {
    setPopupVisible(false);
    setTimeout(() => setPopupData(null), 300); // wait for animation
  };

  const handleUpvote = ({ id }) => {
    upvoteComplaint(id);
    setPopupData((prevData) => ({
      ...prevData,
      upvotes: (prevData.upvotes || 0) + 1,
    }));
  };

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "100vh", borderRadius: "8px", overflow: "hidden", }} />
      <FloatingButton />

      {/* Bottom sliding popup */}
      {popupData && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, width: "100%", background: "#fff", padding: "20px",
          boxShadow: "0 -5px 20px rgba(0,0,0,0.3)", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", transform:
            popupVisible ? "translateY(0)" : "translateY(100%)", transition: "transform 0.3s ease-in-out", zIndex: 999,
        }}>
          {/* Close button at top-right */}
          <button style={{
            position: "absolute", top: "12px", right: "12px", background: "#ff4d4f", color: "#fff",
            border: "none", borderRadius: "50%", width: "32px", height: "32px", fontWeight: "700", cursor: "pointer",
          }}
            onClick={closePopup}>
            ×
          </button>

          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <img src={popupData.image} alt={popupData.label} style={{
              width: "150px", height: "100px", objectFit: "cover",
              borderRadius: "12px", flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "700", color: "#333", }}>
                {popupData.label}
              </h2>
              <p style={{ marginTop: "6px", color: "#555", fontSize: "1rem" }}>
                {popupData.description}
              </p>
              <button style={{
                margin: "1rem", background: "cyan", padding: ".5rem", borderRadius: "15px",
                fontWeight: "bold",
              }} onClick={() => handleUpvote({ id: popupData.id })}
              >
                Upvote {popupData.upvotes ? popupData.upvotes : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyMap;
