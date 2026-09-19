import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
/* import all the routes here */
import authRouter from "./routes/authRoutes.js";

const app = express();
app.use(cookieParser());

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
//   using all the routes here
app.use("/api/auth", authRouter);

export default app;
