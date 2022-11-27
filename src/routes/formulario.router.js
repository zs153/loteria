import express from 'express'
import {
  formulario,
  formularios,
  crear,
  borrar,
  modificar,
  asignar,
  unasignar,
  resolver,
} from '../controllers/formulario.controller'

const apiFormularioRouter = express.Router()

// formularios
apiFormularioRouter.post("/formulario", formulario);
apiFormularioRouter.post("/formularios", formularios);
apiFormularioRouter.post("/formularios/insert", crear);
apiFormularioRouter.post("/formularios/update", modificar);
apiFormularioRouter.post("/formularios/delete", borrar);
apiFormularioRouter.post('/formularios/cambio', asignar)
apiFormularioRouter.post('/formularios/unasign', unasignar)
apiFormularioRouter.post('/formularios/resolver', resolver)

export default apiFormularioRouter