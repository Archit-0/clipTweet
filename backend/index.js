import dotenv from "dotenv";
import connectDb from "./db/dbIndex.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT || 4000;
connectDb()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed", err);
    });
