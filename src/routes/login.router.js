import express from "express";
import {
  loginPage,
  forgotPage,
  auth,
  verifyLogout,
  forgotPassword,
  okPage,
} from "../controllers/login.controller";

const loginRouter = express.Router();

// pages
loginRouter.get("/login", loginPage);
loginRouter.get("/forgot", forgotPage);
loginRouter.get("/ok", okPage);

// proc
loginRouter.post("/pass", auth);
loginRouter.get("/logout", verifyLogout);
loginRouter.post("/forgot", forgotPassword);

export default loginRouter;
