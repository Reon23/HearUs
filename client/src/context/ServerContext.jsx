import React, { createContext, useState } from "react";

import axios from "axios";

export const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // Convert Blob image to File for upload
  // async function blobUrlToFile(
  // blobUrl,
  // fileName,
  // mimeType = "application/octet-stream",
  // ) {
  // return fetch(blobUrl)
  // .then((response) => response.blob()) // Get the Blob from the response
  // .then((blob) => {
  // // If Blob type is undefined, manually set the MIME type
  // const fileType = blob.type || mimeType;
  //
  // // Create a new File object
  // const file = new File([blob], fileName, { type: fileType });
  // return file;
  // })
  // .catch((error) =>
  // console.error("Error converting Blob URL to File:", error),
  // );
  // }

  function base64ToBlob(base64, mime = "") {
    const byteCharacters = atob(base64.split(",")[1] || base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) { byteNumbers[i] = byteCharacters.charCodeAt(i); } const byteArray = new
      Uint8Array(byteNumbers); return new Blob([byteArray], { type: mime });
  } const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function uploadSingleImage(base64) {
    axios
      .post("http://localhost:3000/api/uploadImage", { image: base64 })
      .then((res) => {
        setImageUrl(res.data);
      })
      .catch((error) => {
        console.error(
          "Upload failed:",
          error.response ? error.response.data : error.message,
        );
      });
  }

  const uploadImage = async (file) => {
    console.log(file);

    if (file) {
      const blob = base64ToBlob(file);
      const base64 = await convertBase64(blob);
      uploadSingleImage(base64);
      return;
    }
  };

  // Register User
  const register = (user) => {
    console.log(user);
    axios
      .post("http://localhost:3000/api/signup", user)
      .then((res) => {
        console.log(res.data);
        setAccount(res.data);
      })
      .catch((err) => console.error(err));
  };

  const login = (user) => {
    console.log(user);
    axios
      .post("http://localhost:3000/api/login", user)
      .then((res) => {
        console.log(res.data);
        setAccount(res.data);
      })
      .catch((err) => console.error(err));
  };

  const uploadComplaint = (details) => {
    console.log(details);
    axios
      .post("http://localhost:3000/api/register", details)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  const upvoteComplaint = (id) => {
    axios
      .post(`http://localhost:3000/api/upvote/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <ServerContext.Provider value={{
      register, login, uploadImage, uploadComplaint, upvoteComplaint, account, imageUrl,
      setImageUrl,
    }}>
      {children}
    </ServerContext.Provider>
  );
};
