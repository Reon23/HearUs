import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FileComplaint.css";
import { ServerContext } from "@/context/ServerContext";

function FileComplaint() {
  const { state } = useLocation();
  const { uploadImage, imageUrl, setImageUrl, uploadComplaint } =
    useContext(ServerContext);
  const capturedImage = state?.image || null;
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [geotag, setGeotag] = useState(null);

  const navigate = useNavigate();

  // Fetch geolocation when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGeotag({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("Geolocation error:", err);
        },
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please enter a title and content.");
      return;
    }
    uploadImage(capturedImage.split(",")[1]);
  };

  useEffect(() => {
    if (imageUrl) {
      const details = {
        imgurl: imageUrl,
        title: title,
        desc: content,
        lat: String(geotag.lat),
        lng: String(geotag.lng),
      };
      console.log(details);
      uploadComplaint(details);
      setImageUrl(null);
      navigate("/");
    }
  }, [imageUrl]);

  return (
    <div className="complaint-page">
      <h2>File a Complaint</h2>
      <form onSubmit={handleSubmit} className="complaint-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Complaint details"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Preview captured image */}
        {capturedImage && (
          <div className="post-preview">
            <img src={capturedImage} alt="Captured" className="captured-img" />
          </div>
        )}

        {/* Show geotag if available */}
        {geotag ? (
          <p className="geotag"></p>
        ) : (
          <p className="geotag">Fetching location...</p>
        )}

        <button type="submit">Post Complaint</button>
      </form>
    </div>
  );
}

export default FileComplaint;
