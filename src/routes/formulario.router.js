import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage,
  addPage,
  editPage,
  referenciasPage,
  referenciasAddPage,
  referenciasEditPage,
  smssPage,
  smssAddPage,
  smssEditPage,
  ejercicioPage,
  verTodo,
  insert,
  update,
  remove,
  asignar,
  desasignar,
  resolver,
  ejercicio,
  insertReferencia,
  updateReferencia,
  removeReferencia,
  insertSms,
  updateSms,
  removeSms,
} from '../controllers/formulario.controller'

const formularioRouter = express.Router()

// paginas
formularioRouter.get('/formularios', authRoutes, mainPage)
formularioRouter.get('/formularios/add', authRoutes, addPage)
formularioRouter.get('/formularios/edit/:id', authRoutes, editPage)

// pag ejercicio
formularioRouter.get('/formularios/ejercicio/:id', authRoutes, ejercicioPage)

// pag referencias
formularioRouter.get('/formularios/referencias/:iddoc', authRoutes, referenciasPage)
formularioRouter.get('/formularios/referencias/add/:iddoc', authRoutes, referenciasAddPage)
formularioRouter.get('/formularios/referencias/edit/:iddoc/:idref', authRoutes, referenciasEditPage)

// pag sms
formularioRouter.get('/formularios/smss/:iddoc', authRoutes, smssPage)
formularioRouter.get('/formularios/smss/add/:iddoc', authRoutes, smssAddPage)
formularioRouter.get('/formularios/smss/edit/:iddoc/:idsms', authRoutes, smssEditPage)

// procedures post
formularioRouter.post("/formularios/insert", authRoutes, insert);
formularioRouter.post("/formularios/update", authRoutes, update);
formularioRouter.post("/formularios/delete", authRoutes, remove);
formularioRouter.post("/formularios/ejercicio", authRoutes, ejercicio);
formularioRouter.post("/formularios/asignar", authRoutes, asignar);
formularioRouter.post("/formularios/desasignar", authRoutes, desasignar);
formularioRouter.post("/formularios/resolver", authRoutes, resolver);

// procs referencias
formularioRouter.post("/formularios/referencias/insert", authRoutes, insertReferencia);
formularioRouter.post("/formularios/referencias/update", authRoutes, updateReferencia);
formularioRouter.post("/formularios/referencias/delete", authRoutes, removeReferencia);

// procs sms
formularioRouter.post("/formularios/smss/insert", authRoutes, insertSms);
formularioRouter.post("/formularios/smss/update", authRoutes, updateSms);
formularioRouter.post("/formularios/smss/delete", authRoutes, removeSms);

// proc otros
formularioRouter.get("/formularios/vertodo", authRoutes, verTodo);

export default formularioRouter
