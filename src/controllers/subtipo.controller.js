import Subtipo from '../models/subtipo.model'

let subtipo = new Subtipo()

export const getSubtipo = async (req, res) => {
  subtipo.id = req.body.idsubt

  try {
    const { err, dat } = await subtipo.getSubtipo()
    if (err) {
      res.status(403).json(err)
    } else {
      return res.status(202).json(subtipo)
    }
  } catch (error) {
    return res.status(404).json({ err })
  }
}
export const getSubtipos = async (req, res) => {
  const { err, dat } = await subtipo.getSubtipos()

  if (err) {
    return res.status(404).json({ err })
  } else {
    return res.status(200).json({ dat })
  }
}
export const getTiposSubtipos = async (req, res) => {
  try {
    const { err, dat } = await subtipo.getTiposSubtipos()

    if (err) {
      res.status(402).json(err)
    } else {
      res.status(202).json(dat)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
export const getSubtiposTipo = async (req, res) => {
  subtipo.idTipo = req.body.idtipo
  try {
    const { err, dat } = await subtipo.getSubtiposTipo()

    if (err) {
      res.status(402).json(err)
    } else {
      res.status(202).json(dat)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
export const insertSubtipo = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento

  // subtipo
  subtipo.descripcion = req.body.subtipo.dessub
  subtipo.idTipo = req.body.subtipo.idtipo
  // movimiento
  subtipo.movimiento.usuario = usuarioMov
  subtipo.movimiento.tipo = tipoMov

  try {
    const { err, dat } = await subtipo.insert()

    if (err) {
      res.status(404).json(err)
    } else {
      subtipo.id = dat.p_idsubt

      res.status(202).json(subtipo)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
export const updateSubtipo = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento

  try {
    // subtipo
    subtipo.id = req.body.subtipo.idsubt
    subtipo.descripcion = req.body.subtipo.dessub
    // tipo
    subtipo.idTOld = req.body.subtipo.idtold
    subtipo.idTipo = req.body.subtipo.idtipo
    // movimiento
    subtipo.movimiento.usuario = usuarioMov
    subtipo.movimiento.tipo = tipoMov

    const { err, dat } = await subtipo.update()

    if (err) {
      res.status(404).json(err)
    } else {
      res.status(202).json(subtipo)
    }
  } catch (error) {
    res.status(405).json(error)
  }
}
export const deleteSubtipo = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento

  try {
    // subtipo
    subtipo.id = req.body.subtipo.idsubt
    // movimiento
    subtipo.movimiento.usuario = usuarioMov
    subtipo.movimiento.tipo = tipoMov

    const { err, dat } = await subtipo.delete()

    if (err) {
      res.status(404).json(err)
    } else {
      res.status(204).json(subtipo)
    }
  } catch (error) {
    res.status(405).json(error)
  }
}
