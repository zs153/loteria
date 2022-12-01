import * as DAL from '../models/estadistica.model'

const situacionFromRec = (req) => {
  const formulario = {
    refdoc: req.body.formulario.REFDOC,
  }

  return Object.assign(formulario)
}
const oficinasFromRec = (req) => {
  const carga = {
    refcar: req.body.carga.REFCAR,
  }

  return carga
}
const actuacionFromRec = (req) => {
  const periodo = {
    desfec: req.body.periodo.DESDE,
    hasfec: req.body.periodo.HASTA,
  }
  const formulario = {
    refdoc: req.body.formulario.REFDOC,
  }
  const tipos = {
    tipoAsign: req.body.tiposMovimiento.asignarFormulario,
    tipoResol: req.body.tiposMovimiento.resolverFormulario,
  }
  return Object.assign(periodo, formulario, tipos)
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
    res.status(500).end()
  }
}