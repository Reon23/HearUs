import uploadImage from "./uploadImage.js";

export const uploadToBlob = async (req, res) => {
  console.log("Received request to upload image");
  uploadImage(req.body.image)
    .then((url) => {
      console.log("Image uploaded successfully:", url);
      res.send(url);
    })
    .catch((err) => {
      console.error("Upload error:", err);
      res.status(500).send(err);
    });
};
