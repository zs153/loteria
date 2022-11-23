import * as DAL from '../models/documento.model'

const insertFromRec = (req) => {
  const documento = {
    fecdoc: req.body.documento.FECDOC,
    nifcon: req.body.documento.NIFDOC,
    nomcon: req.body.documento.NOMCON,
    emacon: req.body.documento.EMACON,
    telcon: req.body.documento.TELCON,
    movcon: req.body.documento.MOVCON,
    refdoc: req.body.documento.REFDOC,
    tipdoc: req.body.documento.TIPDOC,
    ejedoc: req.body.documento.EJEDOC,
    ofidoc: req.body.documento.OFIDOC,
    obsdoc: req.body.documento.OBSDOC,
    fundoc: req.body.documento.FUNDOC,
    liqdoc: req.body.documento.LIQDOC,
    stadoc: req.body.documento.STADOC,
    }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(documento, movimiento)
}
const updateFromRec = (req) => {
  const documento = {
    iddocu: req.body.documento.IDDOCU,
    fecdoc: req.body.documento.FECDOC,
    nifcon: req.body.documento.NIFDOC,
    nomcon: req.body.documento.NOMCON,
    emacon: req.body.documento.EMACON,
    telcon: req.body.documento.TELCON,
    movcon: req.body.documento.MOVCON,
    refdoc: req.body.documento.REFDOC,
    tipdoc: req.body.documento.TIPDOC,
    ejedoc: req.body.documento.EJEDOC,
    ofidoc: req.body.documento.OFIDOC,
    obsdoc: req.body.documento.OBSDOC,
    fundoc: req.body.documento.FUNDOC,
    liqdoc: req.body.documento.LIQDOC,
    stadoc: req.body.documento.STADOC,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(documento, movimiento)
}
const deleteFromRec = (req) => {
  const documento = {
    iddocu: req.body.documento.IDDOCU,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(documento, movimiento)
}
const asignarFromRec = (req) => {
  const documento = {
    iddocu: req.body.fraude.IDDOCU,
    liqdoc: req.body.fraude.LIQDOC,
    stadoc: req.body.fraude.STADOC,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(documento, movimiento)
}
const unasignarFromRec = (req) => {
  const documento = {
    IDDOCU: req.body.documento.IDDOCU,
    LIQDOC: req.body.documento.LIQDOC,
    STADOC: req.body.documento.STADOC,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(documento, movimiento)
}
const resolverFromRec = (req) => {
  const documento = {
    IDDOCU: req.body.documento.IDDOCU,
    LIQDOC: req.body.documento.LIQDOC,
    STADOC: req.body.documento.STADOC,
  }
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  }

  return Object.assign(documento, movimiento)
}

export const documento = async (req, res) => {
  const context = req.body.documento

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
export const documentos = async (req, res) => {
  const context = req.body.documento

  try {
    const result = await DAL.findAll(context)

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
export const unasignar = async (req, res) => {
  try {
    const result = await DAL.unasing(unasignFromRec(req))

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
    const result = await DAL.cerrar(resolverFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
