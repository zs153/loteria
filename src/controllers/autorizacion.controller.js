import { createPrivateKey, createSecretKey, generateKeyPairSync } from 'crypto'
import bcrypt from "bcrypt";
import { V4 } from 'paseto'
import { privateKey, secreto } from '../config/settings'
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
          return res.status(402).end();
        }
        if (ret) {
          // payload
          const payload = {
            id: usuario.IDUSUA,
            userid: usuario.USERID,
            rol: usuario.ROLUSU,
            oficina: usuario.OFIUSU,
          }

          const key = createSecretKey(Buffer.from(secreto, 'hex'))
          await V3.encrypt(payload, key, {
            audience: 'urn:client:claim',
            issuer: 'http://localhost:3000',
            expiresIn: '2 hours'
          }).then(r => {
            res.status(200).json(r)
          })
        } else {
          res.status(200).json(null)
        }
      });

      return
    }
  } catch (err) {
    res.status(500).end();
  }
  /*
  */
}
export const authPublicWithPass = async (req, res) => {
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
          return res.status(402).end();
        }
        if (ret) {
          // payload
          const payload = {
            id: usuario.IDUSUA,
            userid: usuario.USERID,
            rol: usuario.ROLUSU,
            oficina: usuario.OFIUSU,
          }

          // const { publicKey, privateKey } = generateKeyPairSync('ed25519', {
          //   modulus: 4096,
          //   publicKeyEncoding: {
          //     type: 'spki',
          //     format: 'pem',
          //   },
          //   privateKeyEncoding: {
          //     type: 'pkcs8',
          //     format: 'pem',
          //     cipher: 'aes-256-cbc',
          //     passphrase: secreto,
          //   },
          // })

          const key = createPrivateKey({
            'key': privateKey,
            'format': 'pem',
            'type': 'pkcs8',
            'cipher': 'aes-256-cbc',
            'passphrase': secreto,
          })
          await V4.sign(payload, key, {
            audience: 'urn:client:claim',
            issuer: 'http://localhost:4000',
            expiresIn: '6 hours',
          }).then(r => {
            res.status(200).json(r)
          })
        } else {
          res.status(200).json(null)
        }
      });

      return
    }
  } catch (err) {
    res.status(500).end();
  }
  /*
  */
}
