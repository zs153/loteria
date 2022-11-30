import * as DAL from '../models/estadistica.model'

const estadisticaFromRec = (req) => {
  const periodo = {
    desfec: req.body.periodo.DESDE,
    hasfec: req.body.periodo.HASTA,
  }
  const formulario = {
    refdoc: req.body.fraude.REFDOC,
  }

  return Object.assign(periodo, formulario)
}

export const estadisticasSituacion = async (req, res) => {
  try {
    const result = await DAL.statSituacion(estadisticaFromRec(req))

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
    const result = await DAL.statOficinas(cargaFromRec(req))

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
    const result = await DAL.statActuacion(estadisticaFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}