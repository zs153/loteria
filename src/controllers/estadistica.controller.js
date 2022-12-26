import * as DAL from '../models/estadistica.model'

const situacionFromRec = (req) => {
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
const oficinasFromRec = (req) => {
  const carga = {
    refcar: req.body.carga.REFCAR,
  }
  const tipos = {
    pendoc: req.body.tipos.PENDOC,
    asidoc: req.body.tipos.ASIDOC,
    resdoc: req.body.tipos.RESDOC,
  }

  return Object.assign(carga, tipos)
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

export const estadisticasSituacion = async (req, res) => {
  try {
    const result = await DAL.statSituacion(situacionFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const estadisticasOficinas = async (req, res) => {
  try {
    const result = await DAL.statOficinas(oficinasFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const estadisticasActuacion = async (req, res) => {
  try {
    const result = await DAL.statActuacion(actuacionFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}