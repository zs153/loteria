import * as DAL from '../models/estadistica.model'

const usuariosFromRec = (req) => {
  const formulario = {
    refdoc: req.body.formulario.REFDOC,
  }
  const tipos = {
    asidoc: req.body.tipos.ASIDOC,
    resdoc: req.body.tipos.RESDOC,
  }

  return Object.assign(formulario, tipos)
}
const oficinasFromRec = (req) => {
  const formulario = {
    refdoc: req.body.formulario.REFDOC,
  }
  const tipos = {
    pendoc: req.body.tipos.PENDOC,
    asidoc: req.body.tipos.ASIDOC,
    resdoc: req.body.tipos.RESDOC,
  }

  return Object.assign(formulario, tipos)
}
const actuacionFromRec = (req) => {
  const formulario = {
    refdoc: req.body.formulario.REFDOC,
  }
  const periodo = {
    desde: req.body.periodo.DESDE,
    hasta: req.body.periodo.HASTA,
  }
  const tipos = {
    asidoc: req.body.tipos.ASIDOC,
    resdoc: req.body.tipos.RESDOC,
    desdoc: req.body.tipos.DESDOC,
  }

  return Object.assign(formulario, periodo, tipos)
}

export const usuarios = async (req, res) => {
  // context
  const context = req.body.context

  try {
    const result = await DAL.usuarios(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const oficinas = async (req, res) => {
  // context
  const context = req.body.context

  try {
    const result = await DAL.oficinas(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const actuacion = async (req, res) => {
  // context
  const context = req.body.context

  try {
    const result = await DAL.actuacion(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}