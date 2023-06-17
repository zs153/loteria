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
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
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
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const extended = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.extended(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const crearFormulario = async (req, res) => {
  // context
  const formulario = {
    fecfor: req.body.formulario.FECFOR,
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
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const modificarFormulario = async (req, res) => {
  // context
  const formulario = {
    idform: req.body.formulario.IDFORM,
    fecfor: req.body.formulario.FECFOR,
    nifcon: req.body.formulario.NIFCON,
    nomcon: req.body.formulario.NOMCON,
    emacon: req.body.formulario.EMACON,
    telcon: req.body.formulario.TELCON,
    movcon: req.body.formulario.MOVCON,
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
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
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
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
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
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
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
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const cierreFormulario = async (req, res) => {
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
    const result = await DAL.close(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
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
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
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
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const crearSms = async (req, res) => {
  // context
  const formulario = {
    IDFORM: req.body.formulario.IDFORM,
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
  const context = Object.assign(formulario, sms, movimiento)

  // proc
  try {
    const result = await DAL.insertSms(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const modificarSms = async (req, res) => {
  // context
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
  const context = Object.assign(sms, movimiento)

  // proc
  try {
    const result = await DAL.updateSms(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrarSms = async (req, res) => {
  // context
  const formulario = {
    IDFORM: req.body.formulario.IDFORM,
  }
  const sms = {
    idsmss: req.body.sms.IDSMSS,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(formulario, sms, movimiento)

  // proc
  try {
    const result = await DAL.removeSms(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

// referencia
export const relacion = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.relacion(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const relaciones = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.relaciones(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const crearRelacion = async (req, res) => {
  // context
  const formulario = {
    idform: req.body.formulario.IDFORM,
  }
  const relacion = {
    fecrel: req.body.relacion.FECREL,
    nifcon: req.body.relacion.NIFCON,
    nomcon: req.body.relacion.NOMCON,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(formulario, relacion, movimiento)

  // proc
  try {
    const result = await DAL.insertRelacion(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const modificarRelacion = async (req, res) => {
  // context
  const relacion = {
    idrela: req.body.relacion.IDRELA,
    fecrel: req.body.relacion.FECREL,
    nifcon: req.body.relacion.NIFCON,
    nomcon: req.body.relacion.NOMCON,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(relacion, movimiento)

  // proc
  try {
    const result = await DAL.updateRelacion(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrarRelacion = async (req, res) => {
  // context
  const formulario = {
    idform: req.body.formulario.IDFORM,
  }
  const relacion = {
    idrela: req.body.relacion.IDRELA,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(formulario, relacion, movimiento)

  // proc
  try {
    const result = await DAL.removeRelacion(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
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
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
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
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}