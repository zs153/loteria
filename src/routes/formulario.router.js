import express from 'express'
import {
  formulario,
  formularios,
  crear,
  borrar,
  modificar,
  asignar,
  desasignar,
  resolver,
  crearReferencia,
  borrarReferencia,
  referencias,
  referencia,
  modificarReferencia,
  sms,
  smss,
  crearSms,
  modificarSms,
  borrarSms,
} from '../controllers/formulario.controller'

const apiFormularioRouter = express.Router()

// formularios
apiFormularioRouter.post("/formulario", formulario);
apiFormularioRouter.post("/formularios", formularios);
apiFormularioRouter.post("/formularios/insert", crear);
apiFormularioRouter.post("/formularios/update", modificar);
apiFormularioRouter.post("/formularios/delete", borrar);
apiFormularioRouter.post('/formularios/cambio', asignar)
apiFormularioRouter.post('/formularios/unasign', desasignar)
apiFormularioRouter.post('/formularios/resolver', resolver)

// referencia
apiFormularioRouter.post('/formularios/referencia', referencia)
apiFormularioRouter.post('/formularios/referencias', referencias)
apiFormularioRouter.post('/formularios/referencias/insert', crearReferencia)
apiFormularioRouter.post('/formularios/referencias/update', modificarReferencia)
apiFormularioRouter.post('/formularios/referencias/delete', borrarReferencia)

// sms
apiFormularioRouter.post('/formularios/sms', sms)
apiFormularioRouter.post('/formularios/smss', smss)
apiFormularioRouter.post('/formularios/smss/insert', crearSms)
apiFormularioRouter.post('/formularios/smss/update', modificarSms)
apiFormularioRouter.post('/formularios/smss/delete', borrarSms)

export default apiFormularioRouter