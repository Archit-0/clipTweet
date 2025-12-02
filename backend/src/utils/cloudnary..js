// import { v2 as cloudinary } from "cloudinary";
import cloudinary from "./utils.js";
import { ApiError } from "../utils/apiError.js";
import FileSystem from "fs";


const uploadToCloudinary = async (LocalUrl) => {
    try {
        if (!LocalUrl) return null;
        console.log(
            `cloudname : ${process.env.CLOUD_NAME} , ${process.env.API_KEY} ,, ${process.env.API_SECRET}`
        );
        console.log(
            "API_KEY:",
            process.env.API_KEY,
            typeof process.env.API_KEY
        );

        const uploadedResponse = await cloudinary.uploader.upload(LocalUrl, {
            resource_type: "auto",
        });
        console.log(uploadedResponse);
        // FileSystem.unlinkSync(LocalUrl);
        return uploadedResponse;
    } catch (error) {
        FileSystem.unlinkSync(LocalUrl);
        throw new ApiError(500, "Cloudinary Upload Error", error.message);
    }
};

export { uploadToCloudinary };
