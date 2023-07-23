import express from 'express'
import { verifyTokenAndAdmin } from "../middleware/auth";

import * as usuario from '../controllers/admin/usuario.controller'
import * as loteria from '../controllers/admin/loteria.controller'

const adminRouter = express.Router()

//--------------- paginas
// usuarios
adminRouter.get('/usuarios', verifyTokenAndAdmin, usuario.mainPage)
adminRouter.get('/usuarios/add', verifyTokenAndAdmin, usuario.addPage)
adminRouter.get('/usuarios/edit/:id', verifyTokenAndAdmin, usuario.editPage)

// loteria
adminRouter.get("/loterias", verifyTokenAndAdmin, loteria.mainPage);
adminRouter.get("/loterias/edit/:id", verifyTokenAndAdmin, loteria.editPage);
adminRouter.get("/loterias/readonly/:id", verifyTokenAndAdmin, loteria.readonlyPage);
adminRouter.get('/loterias/change/:id', verifyTokenAndAdmin, loteria.changePage)

//--------------- procedures
// usuarios
adminRouter.post('/usuarios/insert', verifyTokenAndAdmin, usuario.insert)
adminRouter.post('/usuarios/update', verifyTokenAndAdmin, usuario.update)
adminRouter.post('/usuarios/delete', verifyTokenAndAdmin, usuario.remove)

// formularios
adminRouter.post("/loterias/update", verifyTokenAndAdmin, loteria.update);
adminRouter.post("/loterias/delete", verifyTokenAndAdmin, loteria.remove);
adminRouter.post("/loterias/change", verifyTokenAndAdmin, loteria.change);

export default adminRouter