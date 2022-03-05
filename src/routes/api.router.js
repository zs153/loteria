import express from 'express'
import {
  getUsuarios,
  getUsuario,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
  updatePerfil,
  cambioPassword,
} from '../controllers/usuario.controller'
import {
  verifyLogin,
  verifyLogout,
  forgotPassword,
  crearRegistro,
} from '../controllers/login.controller'
import {
  getOficinas,
  getOficina,
  insertOficina,
  updateOficina,
  deleteOficina,
} from '../controllers/oficina.controller'
import {
  cambioEstado,
  deleteFormulario,
  estadisticaFormularios,
  getFormulario,
  getFormularios,
  insertFormulario,
  updateFormulario,
  cambioPasswordFormulario,
  updatePerfilFormulario,
  sms,
} from '../controllers/formulario.controller'
import {
  deleteTipo,
  getTipo,
  getTipos,
  insertTipo,
  updateTipo,
} from '../controllers/tipo.controller'
import {
  getSmss,
  getSms,
  insertSms,
  updateSms,
  deleteSms,
} from '../controllers/sms.controller'
const apiRouter = express.Router()

// formularios
apiRouter.post('/formularios', getFormularios)
apiRouter.post('/formulario', getFormulario)
apiRouter.post('/formularios/insert', insertFormulario)
apiRouter.post('/formularios/update', updateFormulario)
apiRouter.post('/formularios/delete', deleteFormulario)
apiRouter.post('/formularios/cambioEstado', cambioEstado)
apiRouter.post('/formularios/estadistica', estadisticaFormularios)
apiRouter.post('/formularios/sms', sms)
apiRouter.post('/formularios/cambio', cambioPasswordFormulario)
apiRouter.post('/formularios/updatePerfil', updatePerfilFormulario)

// usuarios
apiRouter.post('/usuarios', getUsuarios)
apiRouter.post('/usuario', getUsuario)
apiRouter.post('/usuarios/insert', insertUsuario)
apiRouter.post('/usuarios/update', updateUsuario)
apiRouter.post('/usuarios/delete', deleteUsuario)
apiRouter.post('/usuarios/updatePerfil', updatePerfil)
apiRouter.post('/usuarios/cambio', cambioPassword)

// oficinas
apiRouter.get('/oficinas', getOficinas)
apiRouter.post('/oficina', getOficina)
apiRouter.post('/oficinas/insert', insertOficina)
apiRouter.post('/oficinas/update', updateOficina)
apiRouter.post('/oficinas/delete', deleteOficina)

// tipos
apiRouter.get('/tipos', getTipos)
apiRouter.post('/tipo/', getTipo)
apiRouter.post('/tipos/insert', insertTipo)
apiRouter.post('/tipos/update', updateTipo)
apiRouter.post('/tipos/delete', deleteTipo)

// sms
apiRouter.get('/smss', getSmss)
apiRouter.post('/sms/', getSms)
apiRouter.post('/smss/insert', insertSms)
apiRouter.post('/smss/update', updateSms)
apiRouter.post('/smss/delete', deleteSms)

// login
apiRouter.post('/verificar', verifyLogin)
apiRouter.post('/logout', verifyLogout)
apiRouter.post('/forgot', forgotPassword)
apiRouter.post('/registro', crearRegistro)

export default apiRouter
