import express from 'express'
import {
  loteria,
  loterias,
  crear,
  modificar,
  borrar,
  cambiar,
} from '../controllers/loteria.controller'

const apiLoteriaRouter = express.Router()

// loterias
apiLoteriaRouter.post('/loteria', loteria)
apiLoteriaRouter.post('/loterias', loterias)
apiLoteriaRouter.post('/loterias/insert', crear)
apiLoteriaRouter.post('/loterias/update', modificar)
apiLoteriaRouter.post('/loterias/delete', borrar)
apiLoteriaRouter.post('/loterias/change', cambiar)

export default apiLoteriaRouter