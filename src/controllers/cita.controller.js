import Cita from "../models/cita.model";

export const getCitas = async (req, res) => {
  const cita = new Cita();
  cita.estado = req.body.documento.stacit;

  try {
    const { err, dat } = await cita.getCitas();

    if (err) {
      return res.status(404).json({ err });
    } else {
      return res.status(200).json({ dat });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getCita = async (req, res) => {
  const cita = new Cita();
  cita.id = req.body.id;

  try {
    const { err, dat } = await cita.getCita();

    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(cita);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const insertCita = async (req, res) => {
  const cita = new Cita();
  const { usuarioMov, tipoMov } = req.body.movimiento;

  // cita
  cita.fecha = req.body.documento.feccit;
  cita.nif = req.body.documento.nifcon;
  cita.nombre = req.body.documento.nomcon;
  cita.telefono = req.body.documento.telcon;
  cita.oficina = req.body.documento.oficit;
  cita.observaciones = req.body.documento.obscit;
  cita.estado = req.body.documento.stacit;
  // movimiento
  cita.movimiento.usuario = usuarioMov;
  cita.movimiento.tipo = tipoMov;

  try {
    const { err, dat } = await cita.insert();

    if (err) {
      res.status(408).json(err);
    } else {
      res.status(200).json(cita);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updateCita = async (req, res) => {
  const cita = new Cita();
  const { usuarioMov, tipoMov } = req.body.movimiento;

  // cita
  cita.id = req.body.documento.idcita;
  cita.fecha = req.body.documento.feccit;
  cita.nif = req.body.documento.nifcon;
  cita.nombre = req.body.documento.nomcon;
  cita.telefono = req.body.documento.telcon;
  cita.oficina = req.body.documento.oficit;
  cita.observaciones = req.body.documento.obscit;
  cita.estado = req.body.documento.stacit;
  // movimiento
  cita.movimiento.usuario = usuarioMov;
  cita.movimiento.tipo = tipoMov;

  try {
    const { err, dat } = await cita.update();

    if (err) {
      res.status(403).json(err);
    } else {
      res.status(200).json(cita);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deleteCita = async (req, res) => {
  const cita = new Cita();
  const { usuarioMov, tipoMov } = req.body.movimiento;

  // cita
  cita.id = req.body.documento.id;
  // movimiento
  cita.movimiento.usuario = usuarioMov;
  cita.movimiento.tipo = tipoMov;

  try {
    const { err, dat } = await cita.delete();

    if (err) {
      res.status(403).json(err);
    } else {
      res.status(200).json(cita);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const cambioEstadoCita = async (req, res) => {
  const cita = new Cita();
  const { usuarioMov, tipoMov } = req.body.movimiento;
  const { id, estado } = req.body.documento;

  // cita
  cita.id = id;
  cita.estado = estado;
  // movimiento
  cita.movimiento.usuario = usuarioMov;
  cita.movimiento.tipo = tipoMov;

  try {
    const { err, dat } = await cita.cambioEstado();

    if (err) {
      res.status(403).json(err);
    } else {
      res.status(200).json(cita);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
