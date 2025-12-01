import { ApiError } from "../utils/apiError.js";
import { uploadToCloudinary } from "../utils/cloudnary..js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
    //take the arguments from req.body
    // check the validations
    // cheeck if user already exists
    // process the profile image from req.files
    // cloudinary upload logic
    // save the user to the database
    // remove password from the response and refresh token logic
    // check user creation
    // return response

    const { username, email, password, fullName } = req.body;
    if (
        [username, email, password, fullName].some(
            (field) => field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (existingUser) {
        throw new ApiError(
            409,
            "User with given username or email already exists"
        );
    }
    // Process profile image

    const avatarUrlLocal = req.files?.avatar[0].path || null;
    if (!avatarUrlLocal) {
        throw new ApiError(400, "Profile image is required");
    }

    let coverImageUrlLocal;
    if (
        req.files?.coverImage &&
        Array.isArray(req.files.coverImage) &&
        req.files.coverImage.length > 0
    ) {
        coverImageUrlLocal = req.files.coverImage[0].path;
    }

    // const avatarUrl = await uploadToCloudinary(avatarUrlLocal);
    // const coverImageUrl = await uploadToCloudinary(avatarUrlLocal);

    // console.log(`avataer ${avatarUrl}   cover : ${coverImageUrl}`);
    const newUser = new User({
        username: username.toLowerCase(),
        email,
        password,
        fullName,
        avatar: avatarUrlLocal,
        coverImage: coverImageUrlLocal || null,
    });
    await newUser.save();
    const userById = await User.findById(newUser._id);
    if (!userById) {
        throw new ApiError(500, "User creation failed");
    }
    return res
        .status(201)
        .json(
            new ApiResponse(200, "User registered successfully", { userById })
        );

    const coverImage = res.send("User registered successfully");
});
