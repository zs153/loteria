import { createPublicKey } from 'crypto'
import { V4 } from 'paseto'
import { tiposRol } from '../public/js/enumeraciones'
import { publicKey } from '../config/settings'

const authRoutes = async (req, res, next) => {
  const tokenHeader = req.cookies.auth

  if (typeof tokenHeader !== 'undefined') {
    try {
      const key = createPublicKey(publicKey)
      const payload = await V4.verify(tokenHeader, key, {
        audience: 'urn:localhost:client',
        issuer: 'http://localhost:4000',
      })

      if (payload) {
        req.user = {
          id: payload.id,
          userID: payload.userid,
          rol: payload.rol,
          oficina: payload.oficina,
        }

        next()
      }
    } catch (error) {
      res.render('log/sign-in', {
        datos: req.body,
        alerts: [{ msg: 'La contraseña no es correcta' }],
      })
    }
  } else {
    res.render('log/sign-in', { datos: req.body, alerts: undefined })
  }
}

export const verifyTokenAndAdmin = (req, res, next) => {
  authRoutes(req, res, () => {
    if (req.user.rol === tiposRol.admin) {
      next()
    } else {
      res.status(410).json('No tienes autorización')
    }
  })
}
export const verifyTokenAndResp = (req, res, next) => {
  authRoutes(req, res, () => {
    if (req.user.rol === tiposRol.responsable || req.user.rol === tiposRol.admin) {
      next()
    } else {
      res.status(410).json('No tienes autorización')
    }
  })
}

export default authRoutes
