import { v2 as cloudinary } from "cloudinary";

export const cloudinaryConnect = () => {
  // try {
  // 	cloudinary.config({
  // 		//!    ########   Configuring the Cloudinary to Upload MEDIA ########
  // 		cloud_name: process.env.CLOUD_NAME,
  // 		api_key: process.env.API_KEY,
  // 		api_secret: process.env.API_SECRET,
  // 	});
  // } catch (error) {
  // 	console.log(error);
  // }
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    console.log("Cloudinary connected successfully.");
  } catch (error) {
    console.error("Cloudinary connection failed:", error);
  }
};