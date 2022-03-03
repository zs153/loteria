import Usuario from '../models/usuario.model'
import {
  estadosUsuario,
  tiposMovimiento,
  tiposPerfil,
  tiposRol,
} from '../public/js/enumeraciones'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secret } from '../settings'

export const verifyLogin = async (req, res) => {
  const { userid, password } = req.body.user

  try {
    let usuario = new Usuario()
    usuario.userID = userid

    const result = await usuario.getUsuarioByUserID()
    if (!(usuario.userID === userid)) {
      res.status(404).json('Usuario no encontrado')
    } else {
      bcrypt.compare(password, usuario.password, (err, result) => {
        if (err) {
          res.status(405).json('La contraseña no es correcta')
        }

        if (result) {
          const accessToken = jwt.sign(
            {
              id: usuario.id,
              userID: usuario.userid,
              nombre: usuario.nombre,
              email: usuario.email,
              rol: usuario.rol,
              oficina: usuario.oficina,
            },
            secret,
            { expiresIn: '2h' }
          )

          const { pasusu, ...resto } = usuario
          res
            .header('authorization', accessToken)
            .status(202)
            .json({ ...resto, accessToken })
        }
      })
    }
  } catch (error) {
    res.status(500).json('No se ha podido conectar con el servidor')
  }
}
export const verifyLogout = async (req, res) => {
  const options = {
    path: '/',
    sameSite: true,
    maxAge: 1,
    httpOnly: true,
  }

  res.clearCookie('x-access_token')
  res.cookie('auth', undefined, options)

  res.status(201).json('Ha finalizado la sesión')
}
export const forgotPassword = async (req, res) => {
  const { email } = req.body.user
  const randomString = Math.random().toString().slice(2, 6)

  try {
    const usuario = new Usuario()

    usuario.emausu = email
    const { err, dat } = await usuario.getUsuarioByEmail()

    if (err) {
      res.status(406).json('No existe el usuario')
    } else {
      const password = usuario.userid + randomString

      const salt = await bcrypt.genSalt(10)
      const passHash = await bcrypt.hash(password, salt)

      usuario.password = passHash
      usuario.movimiento.tipo = tiposMovimiento.olvidoPassword
      usuario.salt = randomString

      const { err, dat } = await usuario.forgotPassword()

      if (err) {
        res.status(401).json('No se ha podido generar nueva contraseña')
      } else {
        res.status(201).json('Se ha generado una nueva contraseña')
      }
    }
  } catch (error) {
    res.status(500).json('No se ha podido conectar con el servidor')
  }
}
export const crearRegistro = async (req, res) => {
  const { nombre, oficina, rol, userid, email, perfil, telefono, estado } =
    req.body.nuevoRegistro
  const randomString = Math.random().toString().slice(2, 6)
  const password = userid + randomString

  try {
    const usuario = new Usuario()
    const salt = await bcrypt.genSalt(10)
    const passHash = await bcrypt.hash(password, salt)

    usuario.nombre = nombre
    usuario.oficina = oficina
    usuario.rol = rol
    usuario.userid = userid
    usuario.email = email
    usuario.perfil = perfil
    usuario.telefono = telefono
    usuario.estado = estado
    usuario.password = passHash
    usuario.movimiento.tipo = tiposMovimiento.registroUsuario
    usuario.salt = randomString

    const { err, dat } = await usuario.registro()

    if (err) {
      res.status(401).json(err)
    } else {
      res.status(201).json('Se ha generado una nueva contraseña')
    }
  } catch (error) {
    res.status(500).json('No se ha podido conectar con el servidor')
  }
}
