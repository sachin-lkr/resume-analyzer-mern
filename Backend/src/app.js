import express from "express"
import cookieParser from "cookie-parser"
/* import all the routes here */
import authRouter from "./routes/authRoutes.js";

const app =express()
app.use(cookieParser())

app.use(express.json());
//   using all the routes here
app.use("/api/auth",authRouter)

export default app