import Sms from '../models/sms.model'

let sms = new Sms()

export const getSmss = async (req, res) => {
  try {
    const { err, dat } = await sms.getSmss()

    if (err) {
      return res.status(404).json({ err })
    } else {
      return res.status(200).json({ dat })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
export const getSms = async (req, res) => {
  sms.id = req.body.id

  try {
    const { err, dat } = await sms.getSms()

    if (err) {
      res.status(402).send(err)
    } else {
      res.status(200).send(sms)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
export const insertSms = async (req, res) => {
  const { movil, idDocumento } = req.body.documento
  const { usuarioMov, tipoMov } = req.body.movimiento

  // Sms
  sms.texto = req.body.sms.texsms
  sms.movil = movil
  sms.estado = req.body.sms.stasms
  // documento
  sms.idDocumento = idDocumento
  // movimiento
  sms.movimiento.usuario = usuarioMov
  sms.movimiento.tipo = tipoMov

  try {
    const { err, dat } = await sms.insert()

    if (err) {
      res.status(403).json(err)
    } else {
      res.status(200).json(sms)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
export const updateSms = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento

  // Sms
  sms.id = req.body.sms.idsmss
  sms.texto = req.body.sms.texsms
  sms.estado = req.body.sms.stasms
  // movimiento
  sms.movimiento.usuario = usuarioMov
  sms.movimiento.tipo = tipoMov

  try {
    const { err, dat } = await sms.update()

    if (err) {
      res.status(403).json(err)
    } else {
      res.status(200).json(sms)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
export const deleteSms = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento

  // Sms
  sms.id = req.body.sms.idsmss
  // movimiento
  sms.movimiento.usuario = usuarioMov
  sms.movimiento.tipo = tipoMov

  try {
    const { err, dat } = await sms.delete()

    if (err) {
      res.status(403).json(err)
    } else {
      res.status(200).json(sms)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
