import e from "express";
import cors from "cors";
const app = e();
import cookieParser from "cookie-parser";

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(e.json({ limit: "10mb" }));
app.use(e.urlencoded({ extended: true, limit: "10mb" }));
app.use(e.static("public"));
app.use(cookieParser());

//import all the routes here
import userRoutes from "./routes/user.routes.js";

app.use("/api/v1/users", userRoutes);

export { app };
