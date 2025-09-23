import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [stream, setStream] = useState(null);
  const navigate = useNavigate(); // ✅ useNavigate at top

  // Start camera
  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setStream(newStream);
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // run once on mount

  // Capture photo
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
    }
  };

  // Submit photo → navigate with image
  const handleSubmit = () => {
    if (capturedImage) {
      navigate("/complaints", { state: { image: capturedImage } });
    }
  };

  // Retake photo
  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  return (
    <div className="relative w-screen h-screen bg-black">
      {!capturedImage ? (
        <>
          {/* Camera preview */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          {/* Circular shutter button */}
          <button
            onClick={capturePhoto}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 
                       w-16 h-16 rounded-full bg-white border-4 border-gray-300 
                       hover:bg-gray-200 active:scale-90 transition-transform shadow-lg"
          />
        </>
      ) : (
        <>
          {/* Captured image fullscreen */}
          <img
            src={capturedImage}
            alt="Captured"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          {/* Retake & Submit */}
          <div className="absolute bottom-8 w-full flex justify-center gap-6">
            <button
              onClick={handleRetake}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold"
            >
              Retake
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
            >
              Submit
            </button>
          </div>
        </>
      )}

      {/* Hidden canvas */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default CameraPage;
