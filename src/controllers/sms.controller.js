import Sms from "../models/sms.model";

let sms = new Sms();

export const getSmss = async (req, res) => {
  const { err, dat } = await sms.getSmss();

  if (err) {
    return res.status(404).json({ err });
  } else {
    return res.status(201).json({ dat });
  }
};
export const getSms = async (req, res) => {
  sms.id = req.body.id;

  try {
    const { err, dat } = await sms.getSms();

    return res.status(202).send(sms);
  } catch (error) {
    return res.status(404).json({ err });
  }
};
export const insertSms = async (req, res) => {
  const user = req.body.user;

  // Sms
  sms.texto = req.body.sms.texto;
  sms.movil = req.body.sms.movil;
  sms.estado = req.body.sms.estado;
  // documento
  sms.idDocumento = req.body.sms.idDocumento;
  // movimiento
  sms.movimiento.usuario = req.body.sms.usuarioMov;
  sms.movimiento.tipo = req.body.sms.tipoMov;

  const { err, dat } = await sms.insert();

  if (err) {
    res.status(403).json(err);
  } else {
    res.status(202).json(sms);
  }
};
export const updateSms = async (req, res) => {
  const user = req.body.user;

  // Sms
  sms.id = req.body.sms.id;
  sms.texto = req.body.sms.texto;
  sms.movil = req.body.sms.movil;
  sms.estado = req.body.sms.estado;
  // movimiento
  sms.movimiento.usuario = req.body.sms.usuarioMov;
  sms.movimiento.tipo = req.body.sms.tipoMov;

  const { err, dat } = await sms.update();

  if (err) {
    res.status(403).json(err);
  } else {
    res.status(202).json(sms);
  }
};
export const deleteSms = async (req, res) => {
  const user = req.body.user;

  // Sms
  sms.id = req.body.sms.id;
  // movimiento
  sms.movimiento.usuario = req.body.sms.usuarioMov;
  sms.movimiento.tipo = req.body.sms.tipoMov;

  const { err, dat } = await sms.delete();

  if (err) {
    res.status(403).json(err);
  } else {
    res.status(202).json(sms);
  }
};
