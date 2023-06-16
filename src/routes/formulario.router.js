import express from 'express'
import {
  formulario,
  formularios,
  extended,
  asignarFormulario,
  crearFormulario,
  modificarFormulario,
  borrarFormulario,
  desasignarFormulario,
  sms,
  smss,
  crearSms,
  modificarSms,
  borrarSms,
  relacion,
  relaciones,
  crearRelacion,
  modificarRelacion,
  borrarRelacion,
  asignarUsuarios,
  desAsignarUsuarios,
  cierreFormulario,
} from '../controllers/formulario.controller'

const apiFormularioRouter = express.Router()

// formularios
apiFormularioRouter.post('/formulario', formulario)
apiFormularioRouter.post('/formularios', formularios)
apiFormularioRouter.post('/formularios/extended', extended)
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

// relacionados
apiFormularioRouter.post('/formularios/relacion', relacion)
apiFormularioRouter.post('/formularios/relaciones', relaciones)
apiFormularioRouter.post('/formularios/relaciones/insert', crearRelacion)
apiFormularioRouter.post('/formularios/relaciones/update', modificarRelacion)
apiFormularioRouter.post('/formularios/relaciones/delete', borrarRelacion)

// ades
apiFormularioRouter.post('/formularios/ades/asignar', asignarUsuarios)
apiFormularioRouter.post('/formularios/ades/desasignar', desAsignarUsuarios)

export default apiFormularioRouter