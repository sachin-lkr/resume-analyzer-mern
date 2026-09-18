import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
} from "../controllers/authController.js";
import authUser from "../middlewares/authMIddlewares.js";

const authRouter = Router();

authRouter.post("/register", registerUserController);

authRouter.post("/login", loginUserController);

authRouter.get("/logout", logoutUserController);

authRouter.get("/get-me", authUser, getMeController);

export default authRouter;
