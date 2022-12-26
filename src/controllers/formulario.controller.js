import * as DAL from '../models/formulario.model'

const insertFromRec = (req) => {
  const formulario = {
    fecdoc: req.body.formulario.FECDOC,
    nifcon: req.body.formulario.NIFCON,
    nomcon: req.body.formulario.NOMCON,
    emacon: req.body.formulario.EMACON,
    telcon: req.body.formulario.TELCON,
    movcon: req.body.formulario.MOVCON,
    refdoc: req.body.formulario.REFDOC,
    tipdoc: req.body.formulario.TIPDOC,
    ejedoc: req.body.formulario.EJEDOC,
    ofidoc: req.body.formulario.OFIDOC,
    obsdoc: req.body.formulario.OBSDOC,
    fundoc: req.body.formulario.FUNDOC,
    liqdoc: req.body.formulario.LIQDOC,
    stadoc: req.body.formulario.STADOC,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(formulario, movimiento)
}
const updateFromRec = (req) => {
  const formulario = {
    iddocu: req.body.formulario.IDDOCU,
    fecdoc: req.body.formulario.FECDOC,
    nifcon: req.body.formulario.NIFCON,
    nomcon: req.body.formulario.NOMCON,
    emacon: req.body.formulario.EMACON,
    telcon: req.body.formulario.TELCON,
    movcon: req.body.formulario.MOVCON,
    tipdoc: req.body.formulario.TIPDOC,
    ejedoc: req.body.formulario.EJEDOC,
    ofidoc: req.body.formulario.OFIDOC,
    obsdoc: req.body.formulario.OBSDOC,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(formulario, movimiento)
}
const deleteFromRec = (req) => {
  const formulario = {
    iddocu: req.body.formulario.IDDOCU,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(formulario, movimiento)
}
const asignarFromRec = (req) => {
  const formulario = {
    iddocu: req.body.formulario.IDDOCU,
    liqdoc: req.body.formulario.LIQDOC,
    stadoc: req.body.formulario.STADOC,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(formulario, movimiento)
}
const desasignarFromRec = (req) => {
  const formulario = {
    iddocu: req.body.formulario.IDDOCU,
    liqdoc: req.body.formulario.LIQDOC,
    stadoc: req.body.formulario.STADOC,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(formulario, movimiento)
}
const resolverFromRec = (req) => {
  const formulario = {
    iddocu: req.body.formulario.IDDOCU,
    liqdoc: req.body.formulario.LIQDOC,
    stadoc: req.body.formulario.STADOC,
  }
  const sms = {
    movsms: req.body.sms.MOVSMS,
    texsms: req.body.sms.TEXSMS,
    stasms: req.body.sms.STASMS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(formulario, req.body.sms.CHKENV ? sms : '', movimiento)
}
const insertReferenciaFromRec = (req) => {
  const formulario = {
    iddocu: req.body.formulario.IDDOCU,
  }
  const referencia = {
    fecref: req.body.referencia.FECREF,
    nifref: req.body.referencia.NIFREF,
    desref: req.body.referencia.DESREF,
    tipref: req.body.referencia.TIPREF,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(formulario, referencia, movimiento)
}
const updateReferenciaFromRec = (req) => {
  const referencia = {
    idrefe: req.body.referencia.IDREFE,
    nifref: req.body.referencia.NIFREF,
    tipref: req.body.referencia.TIPREF,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(referencia, movimiento)
}
const deleteReferenciaFromRec = (req) => {
  const referencia = {
    idrefe: req.body.referencia.IDREFE,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(referencia, movimiento)
}
const insertSmsFromRec = (req) => {
  const formulario = {
    iddocu: req.body.formulario.IDDOCU,
  }
  const sms = {
    fecsms: req.body.sms.FECSMS,
    texsms: req.body.sms.TEXSMS,
    movsms: req.body.sms.MOVSMS,
    stasms: req.body.sms.STASMS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(formulario, sms, movimiento)
}
const updateSmsFromRec = (req) => {
  const sms = {
    idsmss: req.body.sms.IDSMSS,
    fecsms: req.body.sms.FECSMS,
    texsms: req.body.sms.TEXSMS,
    movsms: req.body.sms.MOVSMS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(sms, movimiento)
}
const deleteSmsFromRec = (req) => {
  const sms = {
    idsmss: req.body.sms.IDSMSS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(sms, movimiento)
}

// formulario
export const formulario = async (req, res) => {
  const context = req.body.formulario

  try {
    const result = await DAL.find(context)

    if (result.length === 1) {
      return res.status(200).json(result[0])
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const formularios = async (req, res) => {
  const context = req.body.formulario

  try {
    const result = await DAL.find(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const crear = async (req, res) => {
  try {
    const result = await DAL.insert(insertFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const modificar = async (req, res) => {
  try {
    const result = await DAL.update(updateFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrar = async (req, res) => {
  try {
    const result = await DAL.remove(deleteFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const asignar = async (req, res) => {
  try {
    const result = await DAL.asignar(asignarFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const desasignar = async (req, res) => {
  try {
    const result = await DAL.desasingar(desasignarFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const resolver = async (req, res) => {
  try {
    const result = await DAL.resolver(resolverFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}

// referencia
export const referencias = async (req, res) => {
  const context = req.body.formulario

  try {
    const result = await DAL.findReferencia(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const crearReferencia = async (req, res) => {
  try {
    const result = await DAL.insertReferencia(insertReferenciaFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const modificarReferencia = async (req, res) => {
  try {
    const result = await DAL.updateReferencia(updateReferenciaFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrarReferencia = async (req, res) => {
  try {
    const result = await DAL.removeReferencia(deleteReferenciaFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}

// sms
export const smss = async (req, res) => {
  const context = req.body.formulario

  try {
    const result = await DAL.findSms(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const crearSms = async (req, res) => {
  try {
    const result = await DAL.insertSms(insertSmsFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const modificarSms = async (req, res) => {
  try {
    const result = await DAL.updateSms(updateSmsFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrarSms = async (req, res) => {
  try {
    const result = await DAL.removeSms(deleteSmsFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
