import express from "express";
import {
  autorizacion,
} from "../controllers/autorizacion.controller";

const apiAuthRouter = express.Router();

// autorizacion
apiAuthRouter.post("/auth", autorizacion);

export default apiAuthRouter;