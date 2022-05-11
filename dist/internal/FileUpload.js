"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const cloudinaryV2 = cloudinary_1.default.v2;
cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
const uploadToCloudinary = async (file) => {
    try {
        return await cloudinaryV2.uploader.upload(file.tempFilePath);
    }
    catch (error) {
        return null;
    }
};
exports.uploadToCloudinary = uploadToCloudinary;
//# sourceMappingURL=FileUpload.js.map