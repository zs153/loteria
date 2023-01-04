import express from "express";
import {
  authPublicWithPass,
  autorizacion,
} from "../controllers/autorizacion.controller";

const apiAuthRouter = express.Router();

// autorizacion
apiAuthRouter.post("/auth", authPublicWithPass);

export default apiAuthRouter;