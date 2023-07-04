import * as DAL from '../models/formulario.model'

// formulario
export const formulario = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.formulario(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const formularios = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.formularios(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const crearFormulario = async (req, res) => {
  // context
  const formulario = {
    nifcon: req.body.formulario.NIFCON,
    nomcon: req.body.formulario.NOMCON,
    emacon: req.body.formulario.EMACON,
    telcon: req.body.formulario.TELCON,
    movcon: req.body.formulario.MOVCON,
    reffor: req.body.formulario.REFFOR,
    tipfor: req.body.formulario.TIPFOR,
    ejefor: req.body.formulario.EJEFOR,
    ofifor: req.body.formulario.OFIFOR,
    obsfor: req.body.formulario.OBSFOR,
    funfor: req.body.formulario.FUNFOR,
    liqfor: req.body.formulario.LIQFOR,
    stafor: req.body.formulario.STAFOR,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(formulario, movimiento)

  // proc
  try {
    const result = await DAL.insert(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const modificarFormulario = async (req, res) => {
  // context
  const formulario = {
    idform: req.body.formulario.IDFORM,
    nifcon: req.body.formulario.NIFCON,
    nomcon: req.body.formulario.NOMCON,
    emacon: req.body.formulario.EMACON,
    telcon: req.body.formulario.TELCON,
    movcon: req.body.formulario.MOVCON,
    reffor: req.body.formulario.REFFOR,
    tipfor: req.body.formulario.TIPFOR,
    ejefor: req.body.formulario.EJEFOR,
    ofifor: req.body.formulario.OFIFOR,
    obsfor: req.body.formulario.OBSFOR,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(formulario, movimiento)

  // proc
  try {
    const result = await DAL.update(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }  
}
export const borrarFormulario = async (req, res) => {
  // context
  const formulario = {
    idform: req.body.formulario.IDFORM,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(formulario, movimiento)

  // proc
  try {
    const result = await DAL.remove(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const asignarFormulario = async (req, res) => {
  // context
  const formulario = {
    idform: req.body.formulario.IDFORM,
    liqfor: req.body.formulario.LIQFOR,
    stafor: req.body.formulario.STAFOR,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(formulario, movimiento)

  // proc
  try {
    const result = await DAL.change(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const desasignarFormulario = async (req, res) => {
  // context
  const formulario = {
    idform: req.body.formulario.IDFORM,
    liqfor: req.body.formulario.LIQFOR,
    stafor: req.body.formulario.STAFOR,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(formulario, movimiento)

  // proc
  try {
    const result = await DAL.unasing(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const cierreFormulario = async (req, res) => {
  // context
  const formulario = {
    idform: req.body.formulario.IDFORM,
    liqfor: req.body.formulario.LIQFOR,
    stafor: req.body.formulario.STAFOR,
  }
  const sms = {
    texsms: req.body.sms.TEXSMS,
    movsms: req.body.sms.MOVSMS,
    stasms: req.body.sms.STASMS,
    tipsms: req.body.sms.TIPSMS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(formulario, sms, movimiento)

  // proc
  try {
    const result = await DAL.close(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}

// sms
export const sms = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.sms(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const smss = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.smss(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const crearSms = async (req, res) => {
  // context
  const formulario = {
    idform: req.body.formulario.IDFORM,
  }
  const sms = {
    texsms: req.body.sms.TEXSMS,
    movsms: req.body.sms.MOVSMS,
    stasms: req.body.sms.STASMS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(formulario, sms, movimiento)

  // proc
  try {
    const result = await DAL.insertSms(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const modificarSms = async (req, res) => {
  // context
  const sms = {
    idsmss: req.body.sms.IDSMSS,
    texsms: req.body.sms.TEXSMS,
    movsms: req.body.sms.MOVSMS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(sms, movimiento)

  // proc
  try {
    const result = await DAL.updateSms(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const borrarSms = async (req, res) => {
  // context
  const sms = {
    idsmss: req.body.sms.IDSMSS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(sms, movimiento)

  // proc
  try {
    const result = await DAL.removeSms(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}

// referencia
export const referencia = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.referencia(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const referencias = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.referencias(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const crearReferencia = async (req, res) => {
  // context
  const formulario = {
    idform: req.body.formulario.IDFORM,
  }
  const referencia = {
    nifref: req.body.referencia.NIFREF,
    desref: req.body.referencia.DESREF,
    tipref: req.body.referencia.TIPREF,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(formulario, referencia, movimiento)

  // proc
  try {
    const result = await DAL.insertReferencia(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const modificarReferencia = async (req, res) => {
  // context
  const referencia = {
    idrefe: req.body.referencia.IDREFE,
    nifref: req.body.referencia.NIFREF,
    desref: req.body.referencia.DESREF,
    tipref: req.body.referencia.TIPREF,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(referencia, movimiento)

  // proc
  try {
    const result = await DAL.updateReferencia(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const borrarReferencia = async (req, res) => {
  // context
  const referencia = {
    idrefe: req.body.referencia.IDREFE,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(referencia, movimiento)

  // proc
  try {
    const result = await DAL.removeReferencia(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}

// ades
export const asignarUsuarios = async (req, res) => {
  // context
  const formulario = {
    LIQFOR: req.body.formulario.LIQFOR,
    STAFOR: req.body.formulario.STAFOR,
  }  
  const formularios = {
    arrfor: {
      val: req.body.formularios.ARRFOR,
    }
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(formulario, formularios, movimiento)

  // proc
  try {
    const result = await DAL.asignarFormulariosUsuario(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const desAsignarUsuarios = async (req, res) => {
  // context
  const formulario = {
    LIQFOR: req.body.formulario.LIQFOR,
    STAFOR: req.body.formulario.STAFOR,
  }  
  const formularios = {
    arrfor: {
      val: req.body.formularios.ARRFOR,
    }
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(formulario, formularios, movimiento)

  // proc
  try {
    const result = await DAL.desAsignarFormulariosUsuario(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}