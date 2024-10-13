import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const cloudinaryupload = async (req) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });

  try {
    // Ensure req.file exists
    if (!req.file) {
      throw new Error("No file provided");
    }

    // Upload the file to Cloudinary using its path
    const response = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
    });
    console.log("Cloudinary Upload Response:", response);
    return response.url;
  } catch (error) {
    console.log("Cloudinary Service Error:", error.message);
    return { error: error.message };
  }
};

export default cloudinaryupload;
