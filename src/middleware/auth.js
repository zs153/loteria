import jwt from 'jsonwebtoken'
import { secret } from '../settings'

const authRoutes = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        res.status(403).json('Token invalido')
      }

      req.user = user
      next()
    })
  } else {
    res.status(404).json('Token no definido')
  }
}

// export const verifyTokenAndAuthorization = (req, res, next) => {
//   authRoutes(req, res, () => {
//     if (req.user.userID === req.params.userid) {
//       next()
//     } else {
//       res.status(403).json('No tienes autorización')
//     }
//   })
// }

// export const verifyTokenAndAdmin = (req, res, next) => {
//   authRoutes(req, res, () => {
//     if (req.user.esAdmin) {
//       next()
//     } else {
//       res.status(403).json('No tienes autorización')
//     }
//   })
// }

export default authRoutes
