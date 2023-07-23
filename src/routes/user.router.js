import express from 'express'
import authRoutes from '../middleware/auth'
import * as usuario from '../controllers/user/usuario.controller'
import * as loteria from '../controllers/user/loteria.controller'

const userRouter = express.Router()

//--------------- paginas
// loteria
userRouter.get("/loterias", authRoutes,loteria.mainPage);
userRouter.get("/loterias/add", authRoutes, loteria.addPage);
userRouter.get("/loterias/edit/:id", authRoutes, loteria.editPage);

// main
userRouter.get('/', authRoutes, usuario.mainPage)
userRouter.get("/logout", usuario.logoutPage)

// perfil
userRouter.get('/perfil/:userid', authRoutes, usuario.perfilPage)

//--------------- procedures
// loterias
userRouter.post("/loterias/insert", authRoutes, loteria.insert);
userRouter.post("/loterias/update", authRoutes, loteria.update);
userRouter.post("/loterias/delete", authRoutes, loteria.remove);

// perfil
userRouter.post('/perfil', authRoutes, usuario.updatePerfil)

// cambio password
userRouter.post('/cambio', authRoutes, usuario.changePassword)

// actualizar recurso
userRouter.post('/actualizar', authRoutes, usuario.updateRecurso)

export default userRouter