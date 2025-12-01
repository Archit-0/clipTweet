import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError.js";
import FileSystem from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = async (LocalUrl) => {
    try {
        if (!LocalUrl) return null;
        const uploadedResponse = await cloudinary.uploader.upload(LocalUrl, {
            resource_type: "auto",
        });
        // FileSystem.unlinkSync(LocalUrl);
        return uploadedResponse;
    } catch (error) {
        FileSystem.unlinkSync(LocalUrl);
        throw new ApiError(500, "Cloudinary Upload Error", error.message);
    }
};

export { uploadToCloudinary };
