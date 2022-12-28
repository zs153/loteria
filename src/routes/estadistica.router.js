import express from 'express'
import {
  estadisticasOficinas,
  estadisticasActuacion,
  estadisticasUsuarios,
} from '../controllers/estadistica.controller'

const apiEstadisticaRouter = express.Router()

apiEstadisticaRouter.post('/estadisticas/usuarios', estadisticasUsuarios)
apiEstadisticaRouter.post('/estadisticas/oficinas', estadisticasOficinas)
apiEstadisticaRouter.post('/estadisticas/actuacion', estadisticasActuacion)

export default apiEstadisticaRouter