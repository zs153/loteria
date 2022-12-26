import http from 'http'
import logger from 'morgan'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { puerto } from '../config/settings'
// rutas
import apiOficinaRouter from '../routes/oficina.router'
import apiUsuarioRouter from '../routes/usuario.router'
import apiFormularioRouter from '../routes/formulario.router'
import apiTipoRouter from '../routes/tipo.router'
import apiReferenciaRouter from '../routes/referencia.router'
import apiSmsRouter from '../routes/sms.router'
import apiGenteRouter from '../routes/gente.router'
import apiCargaRouter from '../routes/carga.router'
import apiEstadisticaRouter from '../routes/estadistica.router'

let httpServer

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express()
    httpServer = http.createServer(app)

    // middleware
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(cors())

    // routes
    app.use('/api', apiOficinaRouter)
    app.use('/api', apiUsuarioRouter)
    app.use('/api', apiFormularioRouter)
    app.use('/api', apiTipoRouter)
    app.use('/api', apiReferenciaRouter)
    app.use('/api', apiSmsRouter)
    app.use('/api', apiGenteRouter)
    app.use('/api', apiCargaRouter)
    app.use('/api', apiEstadisticaRouter)

    // server
    httpServer
      .listen(puerto)
      .on('listening', () => {
        console.log(`Web server listening on port: ${puerto} `)

        resolve()
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}

module.exports.initialize = initialize

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  })
}

module.exports.close = close