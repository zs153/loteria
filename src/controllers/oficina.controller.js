import Oficina from "../models/oficina.model";

let oficina = new Oficina();

export const getOficinas = async (req, res) => {
  try {
    const { err, dat } = await oficina.getOficinas();

    if (err) {
      return res.status(404).json({ err });
    } else {
      return res.status(201).json({ dat });
    }
  } catch (error) {
    res.status(500).status(error);
  }
};
export const getOficina = async (req, res) => {
  oficina.id = req.body.idofic;

  try {
    const { err, dat } = await oficina.getOficina();

    if (err) {
      res.status(404).json(err);
    } else {
      return res.status(202).send(oficina);
    }
  } catch (error) {
    return res.status(500).json({ err });
  }
};
export const insertOficina = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento;
  const user = req.body.user;

  // oficina
  oficina.descripcion = req.body.oficina.desofi;
  oficina.codigo = req.body.oficina.codofi;
  // movimiento
  oficina.movimiento.usuario = usuarioMov;
  oficina.movimiento.tipo = tipoMov;

  const { err, dat } = await oficina.insert();

  if (err) {
    res.status(403).json(err);
  } else {
    res.status(202).json(oficina);
  }
};
export const updateOficina = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento;

  // oficina
  oficina.id = req.body.oficina.idofic;
  oficina.descripcion = req.body.oficina.desofi;
  oficina.codigo = req.body.oficina.codofi;
  // movimiento
  oficina.movimiento.usuario = usuarioMov;
  oficina.movimiento.tipo = tipoMov;

  const { err, dat } = await oficina.update();

  if (err) {
    res.status(403).json(err);
  } else {
    res.status(202).json(oficina);
  }
};
export const deleteOficina = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento;
  const user = req.body.user;

  // oficina
  oficina.id = req.body.oficina.idofic;
  // movimiento
  oficina.movimiento.usuario = usuarioMov;
  oficina.movimiento.tipo = tipoMov;

  const { err, dat } = await oficina.delete();

  if (err) {
    res.status(403).json(err);
  } else {
    res.status(202).json(oficina);
  }
};
