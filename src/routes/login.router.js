import express from "express";
import {
  loginPage,
  verifyLogin,
  verifyLogout,
  forgotPage,
  forgotPassword,
  registroPage,
  crearRegistro,
  okPage,
} from "../controllers/login.controller";

const loginRouter = express.Router();

// pages
loginRouter.get("/login", loginPage);
loginRouter.get("/forgot", forgotPage);
loginRouter.get("/registro", registroPage);
loginRouter.get("/ok", okPage);

// proc
loginRouter.post("/login", verifyLogin);
loginRouter.get("/logout", verifyLogout);
loginRouter.post("/forgot", forgotPassword);
loginRouter.post("/registro", crearRegistro);

export default loginRouter;
