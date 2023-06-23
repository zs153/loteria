import express from 'express'
import {
  formulario,
  formularios,
  asignarFormulario,
  crearFormulario,
  modificarFormulario,
  borrarFormulario,
  desasignarFormulario,
  cierreFormulario,
  sms,
  smss,
  crearSms,
  modificarSms,
  borrarSms,
  referencia,
  referencias,
  crearReferencia,
  modificarReferencia,
  borrarReferencia,
  asignarUsuarios,
  desAsignarUsuarios,
} from '../controllers/formulario.controller'

const apiFormularioRouter = express.Router()

// formularios
apiFormularioRouter.post('/formulario', formulario)
apiFormularioRouter.post('/formularios', formularios)
apiFormularioRouter.post('/formularios/insert', crearFormulario)
apiFormularioRouter.post('/formularios/update', modificarFormulario)
apiFormularioRouter.post('/formularios/delete', borrarFormulario)
apiFormularioRouter.post('/formularios/asign', asignarFormulario)
apiFormularioRouter.post('/formularios/unasign', desasignarFormulario)
apiFormularioRouter.post('/formularios/cierre', cierreFormulario)

// sms
apiFormularioRouter.post('/formularios/sms', sms)
apiFormularioRouter.post('/formularios/smss', smss)
apiFormularioRouter.post('/formularios/smss/insert', crearSms)
apiFormularioRouter.post('/formularios/smss/update', modificarSms)
apiFormularioRouter.post('/formularios/smss/delete', borrarSms)

// referencias
apiFormularioRouter.post('/formularios/referencia', referencia)
apiFormularioRouter.post('/formularios/referencias', referencias)
apiFormularioRouter.post('/formularios/referencias/insert', crearReferencia)
apiFormularioRouter.post('/formularios/referencias/update', modificarReferencia)
apiFormularioRouter.post('/formularios/referencias/delete', borrarReferencia)

// ades
apiFormularioRouter.post('/formularios/ades/asignar', asignarUsuarios)
apiFormularioRouter.post('/formularios/ades/desasignar', desAsignarUsuarios)

export default apiFormularioRouter