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

    if (err) {
      res.status(402).send(err);
    } else {
      res.status(202).send(sms);
    }
  } catch (error) {
    return res.status(404).json({ err });
  }
};
export const insertSms = async (req, res) => {
  const { movil, idDocumento } = req.body.documento;
  const { usuarioMov, tipoMov } = req.body.movimiento;

  // Sms
  sms.texto = req.body.sms.texsms;
  sms.movil = movil;
  sms.estado = req.body.sms.stasms;
  // documento
  sms.idDocumento = idDocumento;
  // movimiento
  sms.movimiento.usuario = usuarioMov;
  sms.movimiento.tipo = tipoMov;

  const { err, dat } = await sms.insert();
  if (err) {
    res.status(403).json(err);
  } else {
    res.status(202).json(sms);
  }
};
export const updateSms = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento;

  // Sms
  sms.id = req.body.sms.idsmss;
  sms.texto = req.body.sms.texsms;
  sms.estado = req.body.sms.stasms;
  // movimiento
  sms.movimiento.usuario = usuarioMov;
  sms.movimiento.tipo = tipoMov;

  const { err, dat } = await sms.update();

  if (err) {
    res.status(403).json(err);
  } else {
    res.status(202).json(sms);
  }
};
export const deleteSms = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento;

  // Sms
  sms.id = req.body.sms.idsmss;
  // movimiento
  sms.movimiento.usuario = usuarioMov;
  sms.movimiento.tipo = tipoMov;

  const { err, dat } = await sms.delete();

  if (err) {
    res.status(403).json(err);
  } else {
    res.status(202).json(sms);
  }
};
