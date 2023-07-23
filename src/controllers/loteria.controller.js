import * as DAL from '../models/loteria.model'

// loteria
export const loteria = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.loteria(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const loterias = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.loterias(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const crear = async (req, res) => {
  // context
  const loteria = {
    declot: req.body.loteria.DECLOT,
    usulot: req.body.loteria.USULOT,
    stalot: req.body.loteria.STALOT,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(loteria, movimiento)

  // proc
  try {
    const result = await DAL.insert(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const modificar = async (req, res) => {
  // context
  const loteria = {
    idlote: req.body.loteria.IDLOTE,
    declot: req.body.loteria.DECLOT,
    usulot: req.body.loteria.USULOT,
    stalot: req.body.loteria.STALOT,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(loteria, movimiento)

  // proc
  try {
    const result = await DAL.update(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }  
}
export const borrar = async (req, res) => {
  // context
  const loteria = {
    idlote: req.body.loteria.IDLOTE,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(loteria, movimiento)

  // proc
  try {
    const result = await DAL.remove(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
export const cambiar = async (req, res) => {
  // context
  const loteria = {
    idlote: req.body.loteria.IDLOTE,
    stalot: req.body.loteria.STALOT,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(loteria, movimiento)

  // proc
  try {
    const result = await DAL.change(context)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({ stat: null, data: err })
  }
}
