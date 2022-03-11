import Hito from "../models/hito.model";
import { hitosMovimiento } from "../public/js/enumeraciones";

let hito = new Hito();

export const getHitos = async (req, res) => {
  const { err, dat } = await hito.getHitos();

  if (err) {
    return res.status(404).json({ err });
  } else {
    return res.status(200).json({ dat });
  }
};
export const getHitosFraude = async (req, res) => {
  hito.idFraude = req.body.idfrau;
  try {
    const { err, dat } = await hito.getHitosFraude();

    if (err) {
      res.status(402).json(err);
    } else {
      res.status(202).json(dat);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getHito = async (req, res) => {
  hito.id = req.body.idhito;

  try {
    const { err, dat } = await hito.gethito();

    if (err) {
      res.status(403).json(err);
    } else {
      return res.status(202).json(hito);
    }
  } catch (error) {
    return res.status(404).json({ err });
  }
};
export const insertHito = async (req, res) => {
  const { usuarioMov, hitoMov } = req.body.movimiento;

  // hito
  hito.tipo = req.body.hito.tiphit;
  hito.subTipo = req.body.hito.subthi;
  hito.importe = req.body.hito.imphit;
  hito.observaciones = req.body.hito.obshit;
  // movimiento
  hito.movimiento.usuario = usuarioMov;
  hito.movimiento.hito = hitoMov;

  try {
    const { err, dat } = await hito.insert();

    if (err) {
      res.status(404).json(err);
    } else {
      hito.id = dat.p_idhito;

      res.status(202).json(hito);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updateHito = async (req, res) => {
  const { usuarioMov, hitoMov } = req.body.movimiento;

  // hito
  hito.id = req.body.hito.idhito;
  hito.tipo = req.body.hito.tiphit;
  hito.subTipo = req.body.hito.subthi;
  hito.importe = req.body.hito.imphit;
  hito.observaciones = req.body.hito.obshit;
  // movimiento
  hito.movimiento.usuario = usuarioMov;
  hito.movimiento.hito = hitoMov;

  try {
    const { err, dat } = await hito.update();

    if (err) {
      res.status(404).json(err);
    } else {
      res.status(202).json(hito);
    }
  } catch (error) {
    res.status(405).json(error);
  }
};
export const deleteHito = async (req, res) => {
  const { usuarioMov, hitoMov } = req.body.movimiento;

  // hito
  hito.id = req.body.hito.idhito;
  // movimiento
  hito.movimiento.usuario = usuarioMov;
  hito.movimiento.hito = hitoMov;

  try {
    const { err, dat } = await hito.delete();

    if (err) {
      res.status(404).json(err);
    } else {
      res.status(204).json(hito);
    }
  } catch (error) {
    res.status(405).json(error);
  }
};
