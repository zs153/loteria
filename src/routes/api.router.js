import express from "express";
import {
  getUsuarios,
  getUsuario,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
  updatePerfil,
  cambioPassword,
} from "../controllers/usuario.controller";
import {
  verifyLogin,
  verifyLogout,
  forgotPassword,
  crearRegistro,
} from "../controllers/login.controller";
import {
  getOficinas,
  getOficina,
  insertOficina,
  updateOficina,
  deleteOficina,
} from "../controllers/oficina.controller";
import {
  cambioEstado,
  deleteFormulario,
  estadisticaFormularios,
  getFormulario,
  getFormularioByRef,
  getFormularios,
  insertFormulario,
  updateFormulario,
  cambioPasswordFormulario,
  updatePerfilFormulario,
  sms,
} from "../controllers/formulario.controller";
import {
  cambioEstadoFraude,
  deleteFraude,
  estadisticaFraudes,
  getFraude,
  getFraudeByRef,
  getFraudes,
  insertFraude,
  updateFraude,
  cambioPasswordFraude,
  updatePerfilFraude,
  smsFraude,
} from "../controllers/fraude.controller";
import {
  deleteTipo,
  getTipo,
  getTipos,
  getTiposByOrigen,
  insertTipo,
  updateTipo,
} from "../controllers/tipo.controller";
import {
  getSmss,
  getSms,
  insertSms,
  updateSms,
  deleteSms,
} from "../controllers/sms.controller";
import {
  getHito,
  getHitos,
  getHitosFraude,
  insertHito,
  updateHito,
  deleteHito,
} from "../controllers/hito.controller";
import {
  deleteSubtipo,
  getSubtipo,
  getSubtipos,
  getTiposSubtipos,
  insertSubtipo,
  updateSubtipo,
} from "../controllers/subtipo.controller";
import { getGente } from "../controllers/gente.controller";

const apiRouter = express.Router();

// formularios
apiRouter.post("/formularios", getFormularios);
apiRouter.post("/formulario", getFormulario);
apiRouter.post("/formularios/insert", insertFormulario);
apiRouter.post("/formularios/update", updateFormulario);
apiRouter.post("/formularios/delete", deleteFormulario);
apiRouter.post("/formularios/cambioEstado", cambioEstado);
apiRouter.post("/formularios/estadistica", estadisticaFormularios);
apiRouter.post("/formularios/referencia", getFormularioByRef);
apiRouter.post("/formularios/sms", sms);
apiRouter.post("/formularios/cambio", cambioPasswordFormulario);
apiRouter.post("/formularios/updatePerfil", updatePerfilFormulario);

// fraudes
apiRouter.post("/fraudes", getFraudes);
apiRouter.post("/fraude", getFraude);
apiRouter.post("/fraudes/insert", insertFraude);
apiRouter.post("/fraudes/update", updateFraude);
apiRouter.post("/fraudes/delete", deleteFraude);
apiRouter.post("/fraudes/cambioEstado", cambioEstadoFraude);
apiRouter.post("/fraudes/estadistica", estadisticaFraudes);
apiRouter.post("/fraudes/referencia", getFraudeByRef);
apiRouter.post("/fraudes/sms", smsFraude);
apiRouter.post("/fraudes/cambio", cambioPasswordFraude);
apiRouter.post("/fraudes/updatePerfil", updatePerfilFraude);

// hitos
apiRouter.get("/fraudes/hitos", getHitos);
apiRouter.post("/fraudes/hitos", getHitosFraude);
apiRouter.post("/fraudes/hito", getHito);
apiRouter.post("/fraudes/hitos/insert", insertHito);
apiRouter.post("/fraudes/hitos/update", updateHito);
apiRouter.post("/fraudes/hitos/delete", deleteHito);

// usuarios
apiRouter.post("/usuarios", getUsuarios);
apiRouter.post("/usuario", getUsuario);
apiRouter.post("/usuarios/insert", insertUsuario);
apiRouter.post("/usuarios/update", updateUsuario);
apiRouter.post("/usuarios/delete", deleteUsuario);
apiRouter.post("/usuarios/updatePerfil", updatePerfil);
apiRouter.post("/usuarios/cambio", cambioPassword);

// gentes
apiRouter.get("/gentes/:nifgen", getGente);

// oficinas
apiRouter.get("/oficinas", getOficinas);
apiRouter.post("/oficina", getOficina);
apiRouter.post("/oficinas/insert", insertOficina);
apiRouter.post("/oficinas/update", updateOficina);
apiRouter.post("/oficinas/delete", deleteOficina);

// tipos
apiRouter.get("/tipos", getTipos);
apiRouter.post("/tipos/origen", getTiposByOrigen);
apiRouter.post("/tipo/", getTipo);
apiRouter.post("/tipos/insert", insertTipo);
apiRouter.post("/tipos/update", updateTipo);
apiRouter.post("/tipos/delete", deleteTipo);

// subtipos
apiRouter.get("/subtipos", getSubtipos);
apiRouter.post("/subtipos/tipossubtipos", getTiposSubtipos);
apiRouter.post("/subtipo/", getSubtipo);
apiRouter.post("/subtipos/insert", insertSubtipo);
apiRouter.post("/subtipos/update", updateSubtipo);
apiRouter.post("/subtipos/delete", deleteSubtipo);

// sms
apiRouter.get("/smss", getSmss);
apiRouter.post("/sms/", getSms);
apiRouter.post("/smss/insert", insertSms);
apiRouter.post("/smss/update", updateSms);
apiRouter.post("/smss/delete", deleteSms);

// login
apiRouter.post("/verificar", verifyLogin);
apiRouter.post("/logout", verifyLogout);
apiRouter.post("/forgot", forgotPassword);
apiRouter.post("/registro", crearRegistro);

export default apiRouter;
