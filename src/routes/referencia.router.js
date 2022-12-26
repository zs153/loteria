import express from "express";
import {
  referencia,
  referencias,
  crear,
  modificar,
  borrar,
} from "../controllers/referencia.controller";

const apiReferenciaRouter = express.Router();

// tipos
apiReferenciaRouter.post("/referencia", referencia);
apiReferenciaRouter.post("/referencias", referencias);
apiReferenciaRouter.post("/referencias/insert", crear);
apiReferenciaRouter.post("/referencias/update", modificar);
apiReferenciaRouter.post("/referencias/delete", borrar);

export default apiReferenciaRouter;