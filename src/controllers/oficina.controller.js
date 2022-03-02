import Oficina from "../models/oficina.model";
import Usuario from "../models/usuario.model";
import bcrypt from "bcrypt";
import { tiposMovimiento } from "../public/js/enumeraciones";

let oficina = new Oficina();

export const getOficinas = async (req, res) => {
  const { err, dat } = await oficina.getOficinas();

  if (err) {
    return res.status(404).json({ err });
  } else {
    return res.status(201).json({ dat });
  }
};
export const getOficina = async (req, res) => {
  oficina.id = req.body.id;

  try {
    const { err, dat } = await oficina.getOficina();

    return res.status(202).send(oficina);
  } catch (error) {
    return res.status(404).json({ err });
  }
};
export const insertOficina = async (req, res) => {
  const user = req.body.user;

  // oficina
  oficina.descripcion = req.body.oficina.descripcion;
  oficina.codigo = req.body.oficina.codigo;
  // movimiento
  oficina.movimiento.usuario = user.id;
  oficina.movimiento.tipo = tiposMovimiento.crearOficina;

  const { err, dat } = await oficina.insert();

  if (err) {
    res.status(403).json(err);
  } else {
    res.status(202).json(oficina);
  }
};
export const updateOficina = async (req, res) => {
  const user = req.body.user;

  // oficina
  oficina.id = req.body.oficina.id;
  oficina.descripcion = req.body.oficina.descripcion;
  oficina.codigo = req.body.oficina.codigo;
  // movimiento
  oficina.movimiento.usuario = user.id;
  oficina.movimiento.tipo = tiposMovimiento.modificarOficina;

  const { err, dat } = await oficina.update();

  if (err) {
    res.status(403).json(err);
  } else {
    res.status(202).json(oficina);
  }
};
export const deleteOficina = async (req, res) => {
  const user = req.body.user;

  // oficina
  oficina.id = req.body.oficina.id;
  // movimiento
  oficina.movimiento.usuario = user.id;
  oficina.movimiento.tipo = tiposMovimiento.borrarOficina;

  const { err, dat } = await oficina.delete();

  if (err) {
    res.status(403).json(err);
  } else {
    res.status(202).json(oficina);
  }
};
