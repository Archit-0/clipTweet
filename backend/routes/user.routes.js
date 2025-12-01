import { Router } from "express";

const router = Router();
import { upload } from "../middlewares/multer.middleware.js";
// Define your user routes here

router.post(
    "/register",
    upload.fields([{ name: "profileImage", maxCount: 1 }]),
    (req, res) => {
        // Handle user registration logic here
        res.send("User registered successfully");
    }
);
export default router;
