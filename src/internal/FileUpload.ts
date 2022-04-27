import cloudinary from "cloudinary";

const cloudinaryV2 = cloudinary.v2;
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadToCloudinary = async (file): Promise<unknown> => {
  try {
    return await cloudinaryV2.uploader.upload(file.tempFilePath);
  } catch (error) {
    return null;
  }
};
