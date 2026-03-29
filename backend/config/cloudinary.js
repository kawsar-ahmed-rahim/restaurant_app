import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";
// dotenv.config()
const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  } catch (error) {
    console.log("error occur in cloudinary", error);
  }
};
export default connectCloudinary;
