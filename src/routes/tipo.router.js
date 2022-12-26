import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
} from "../controllers/tipo.controller";

const tipoRouter = express.Router();

// paginas
tipoRouter.get("/tipos", verifyTokenAndAdmin, mainPage);
tipoRouter.get("/tipos/add", verifyTokenAndAdmin, addPage);
tipoRouter.get("/tipos/edit/:id", verifyTokenAndAdmin, editPage);

// procedures
tipoRouter.post("/tipos/insert", verifyTokenAndAdmin, insert);
tipoRouter.post("/tipos/update", verifyTokenAndAdmin, update);
tipoRouter.post("/tipos/delete", verifyTokenAndAdmin, remove);

export default tipoRouter;
