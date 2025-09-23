import React, { useState, useRef, useEffect } from "react";
import "./FileComplaint.css";

function FileComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [geotag, setGeotag] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const videoRef = useRef(null);

  // useEffect hook to manage the camera stream
  useEffect(() => {
    const openCamera = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error("Camera not supported on this browser.");
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true); // Permission granted
      } catch (err) {
        console.error("Camera access error: ", err);
        setHasCameraPermission(false); // Permission denied
        alert(`Camera access denied. You will not be able to capture photos.`);
      }
    };

    openCamera();

    // Cleanup function to stop the camera stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // The empty array ensures this effect runs only on mount and unmount

  const capturePhoto = () => {
    // Only allow capturing if permission is granted
    if (!hasCameraPermission) {
      alert("Camera permission is required to capture a photo.");
      return;
    }

    // Create a new canvas element to capture the image from the video stream
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    setImage(dataURL);

    // Get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeotag({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Geolocation not available or access denied.");
          return;
        },
      );
    } else {
      alert("Geolocation not supported by this browser.");
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please enter a title and content.");
      return;
    }

    const newComplaint = {
      id: Date.now(),
      title,
      content,
      image,
      geotag,
      upvotes: 0,
      downvotes: 0,
      comments: [],
    };

    setComplaints([newComplaint, ...complaints]);
    setTitle("");
    setContent("");
    setImage(null);
    setGeotag(null);
  };

  const vote = (id, type) => {
    setComplaints(
      complaints.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            [type === "up" ? "upvotes" : "downvotes"]:
              c[type === "up" ? "upvotes" : "downvotes"] + 1,
          };
        }
        return c;
      }),
    );
  };

  const addComment = (id, text) => {
    setComplaints(
      complaints.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            comments: [...c.comments, { user: "Anonymous", text }],
          };
        }
        return c;
      }),
    );
  };

  return (
    <div className="complaint-page">
      <h2>File a Complaint</h2>
      <form onSubmit={handleSubmit} className="complaint-form">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}
        />
        <textarea placeholder="Complaint details" value={content} onChange={(e) => setContent(e.target.value)}
        />

        <div className="camera-container">
          {hasCameraPermission ? (
            <video ref={videoRef} className="camera-preview" autoPlay playsInline muted></video>
          ) : (
            <div className="camera-placeholder">
              Camera access denied.
              <br />
              Please grant permission in your browser settings.
            </div>
          )}
        </div>

        {image && (
          <div className="post-preview">
            <img src={image} alt="Captured" className="captured-img" />
            {geotag && (
              <p className="geotag">
                Geotag: {geotag.lat}, {geotag.lng}
              </p>
            )}
          </div>
        )}

        <button type="button" onClick={capturePhoto} disabled={!hasCameraPermission}>
          Capture Photo & Geotag
        </button>
        <button type="submit">Post Complaint</button>
      </form>

      <div className="complaints-list">
        {complaints.map((c) => (
          <div key={c.id} className="complaint-card">
            <h3>{c.title}</h3>
            <p>{c.content}</p>
            {c.image && <img src={c.image} alt="Complaint" />}
            {c.geotag && (
              <p>
                Geotag: {c.geotag.lat}, {c.geotag.lng}
              </p>
            )}
            <div className="votes">
              <button onClick={() => vote(c.id, "up")}>
                Agree ({c.upvotes})
              </button>
              <button onClick={() => vote(c.id, "down")}>
                Disagree ({c.downvotes})
              </button>
            </div>
            <div className="comments">
              {c.comments.map((com, i) => (
                <p key={i}>
                  <b>{com.user}:</b> {com.text}
                </p>
              ))}
              <CommentInput complaintId={c.id} addComment={addComment} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sub-component for comment input (no changes needed here)
function CommentInput({ complaintId, addComment }) {
  const [text, setText] = useState("");
  const handleAdd = () => {
    if (text) {
      addComment(complaintId, text);
      setText("");
    }
  };
  return (
    <div className="comment-input">
      <input type="text" placeholder="Add opinion" value={text} onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Comment</button>
    </div>
  );
}

export default FileComplaint;
