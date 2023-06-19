import * as DAL from '../models/estadistica.model'

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