import express from "express";
import {
  gentes,
} from "../controllers/gente.controller";

const apiGenteRouter = express.Router();

// tipos
apiGenteRouter.post("/gentes", gentes);

export default apiGenteRouter;