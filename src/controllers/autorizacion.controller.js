import { createPrivateKey } from 'crypto'
import bcrypt from "bcrypt";
import { V4 } from 'paseto'
import { privateKey } from '../config/settings'
import * as DAL from "../models/autorizacion.model";

export const autorizacion = async (req, res) => {
  let context = {
    userid: req.body.usuario.USERID,
  }

  try {
    const rows = await DAL.find(context);

    if (rows.length === 1) {
      // devuelve usuario
      const usuario = rows[0];

      // password
      const pwdusu = req.body.usuario.PWDUSU

      // verifica contaseña
      bcrypt.compare(pwdusu, usuario.PWDUSU, async (err, ret) => {
        if (err) {
          return res.status(404).end();
        }
        if (ret) {
          // payload
          const payload = {
            id: usuario.IDUSUA,
            userid: usuario.USERID,
            rol: usuario.ROLUSU,
            oficina: usuario.OFIUSU,
          }

          // crear key
          const key = createPrivateKey(privateKey)

          // generar token
          const token = await V4.sign(payload, key, {
            audience: 'urn:localhost:client',
            issuer: 'http://localhost:4000',
            expiresIn: '6 hours',
          })

          res.status(200).json(token)
        } else {
          res.status(200).json(null)
        }
      });
    }
  } catch (err) {
    res.status(500).end();
  }
}
