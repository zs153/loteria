import express from "express";
import {
  loginPage,
  verifyLogin,
  verifyLogout,
  forgotPage,
  forgotPassword,
  okPage,
} from "../controllers/login.controller";

const loginRouter = express.Router();

// pages
loginRouter.get("/login", loginPage);
loginRouter.get("/forgot", forgotPage);
loginRouter.get("/ok", okPage);

// proc
loginRouter.post("/login", verifyLogin);
loginRouter.get("/logout", verifyLogout);
loginRouter.post("/forgot", forgotPassword);

export default loginRouter;
