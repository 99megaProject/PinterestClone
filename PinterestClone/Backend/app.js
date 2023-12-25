import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(cookieParser());

// import routes
import userRoute from "./src/routes/user.route.js";
import postRoute from "./src/routes/post.route.js";

app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);

export { app };
