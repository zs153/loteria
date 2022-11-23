import express from "express";
import {
  usuario,
  usuarios,
  insert,
  update,
  remove,
  registro,
  perfil,
  cambioPassword,
  olvidoPassword,
} from "../controllers/usuario.controller";

const apiUsuarioRouter = express.Router();

// usuarios
apiUsuarioRouter.post("/usuario", usuario);
apiUsuarioRouter.post("/usuarios", usuarios);
apiUsuarioRouter.post("/usuarios/insert", insert);
apiUsuarioRouter.post("/usuarios/update", update);
apiUsuarioRouter.post("/usuarios/delete", remove);
apiUsuarioRouter.post("/usuarios/updatePerfil", perfil);

apiUsuarioRouter.post("/usuarios/perfil", perfil);
apiUsuarioRouter.post("/usuarios/cambio", cambioPassword);
apiUsuarioRouter.post("/usuarios/registro", registro);
apiUsuarioRouter.post("/usuarios/forgot", olvidoPassword);

export default apiUsuarioRouter;