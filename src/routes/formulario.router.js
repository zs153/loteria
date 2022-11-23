import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage,
  addPage,
  editPage,
  verTodo,
  insert,
  update,
  remove,
  asignar,
  unasignar,
  resolver,
  ejercicio,
  relacion,
  sms,
} from '../controllers/formulario.controller'

const formularioRouter = express.Router()

// paginas
formularioRouter.get('/formularios', authRoutes, mainPage)
formularioRouter.get('/formularios/add', authRoutes, addPage)
formularioRouter.get('/formularios/edit/:id', authRoutes, editPage)

// procedures get
formularioRouter.get("/fraudes/vertodo", authRoutes, verTodo);

// procedures post
formularioRouter.post("/formularios/insert", authRoutes, insert);
formularioRouter.post("/formularios/update", authRoutes, update);
formularioRouter.post("/formularios/delete", authRoutes, remove);
formularioRouter.post("/formularios/ejercicio", authRoutes, ejercicio);
formularioRouter.post("/formularios/relacionado", authRoutes, relacion);
formularioRouter.post("/formularios/asignar", authRoutes, asignar);
formularioRouter.post("/formularios/desasignar", authRoutes, unasignar);
formularioRouter.post("/formularios/resolver", authRoutes, resolver);
formularioRouter.post("/formularios/sms", authRoutes, sms);

export default formularioRouter
