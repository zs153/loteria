import Usuario from "../models/usuario.model";
import SMS from "../models/sms.model";
import Fraude from "../models/fraude.model";
import { tiposMovimiento } from "../public/js/enumeraciones";
import bcrypt from "bcrypt";

export const getFraudes = async (req, res) => {
  const fraude = new Fraude();
  fraude.estado = req.body.documento.stafra;

  const { err, dat } = await fraude.getFraudes();

  if (err) {
    return res.status(404).json(err);
  } else {
    return res.status(201).json({ dat });
  }
};
export const getFraude = async (req, res) => {
  const fraude = new Fraude();
  fraude.id = req.body.id;

  try {
    const { err, dat } = await fraude.getFraude();

    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(fraude);
    }
  } catch (error) {
    res.status(401).json(err);
  }
};
export const getFraudeByRef = async (req, res) => {
  const fraude = new Fraude();
  fraude.referencia = req.body.referencia;

  try {
    const { err, dat } = await fraude.getFraudeByRef();

    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(fraude);
    }
  } catch (error) {
    res.status(401).json(err);
  }
};
export const insertFraude = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento;
  const fraude = new Fraude();

  // fraude
  fraude.fecha = req.body.documento.fecfra;
  fraude.nif = req.body.documento.nifcon;
  fraude.nombre = req.body.documento.nomcon;
  fraude.email = req.body.documento.emacon;
  fraude.telefono = req.body.documento.telcon;
  fraude.movil = req.body.documento.movcon;
  fraude.referencia = req.body.documento.reffra;
  fraude.tipo = req.body.documento.tipfra;
  fraude.ejercicio = req.body.documento.ejefra;
  fraude.oficina = req.body.documento.ofifra;
  fraude.observaciones = req.body.documento.obsfra;
  fraude.funcionario = req.body.documento.funfra;
  fraude.liquidador = req.body.documento.liqfra;
  fraude.estado = req.body.documento.stafra;
  // movimiento
  fraude.movimiento.usuario = usuarioMov;
  fraude.movimiento.tipo = tipoMov;

  const { err, dat } = await fraude.insert();

  if (err) {
    res.status(408).json(err);
  } else {
    res.status(202).json(fraude);
  }
};
export const updateFraude = async (req, res) => {
  const fraude = new Fraude();
  const { usuarioMov, tipoMov } = req.body.movimiento;

  // fraude
  fraude.id = req.body.documento.idfrau;
  fraude.fecha = req.body.documento.fecfra;
  fraude.nif = req.body.documento.nifcon;
  fraude.nombre = req.body.documento.nomcon;
  fraude.email = req.body.documento.emacon;
  fraude.telefono = req.body.documento.telcon;
  fraude.movil = req.body.documento.movcon;
  fraude.referencia = req.body.documento.reffra;
  fraude.tipo = req.body.documento.tipfra;
  fraude.ejercicio = req.body.documento.ejefra;
  fraude.oficina = req.body.documento.ofifra;
  fraude.observaciones = req.body.documento.obsfra;
  fraude.funcionario = req.body.documento.funfra;
  // movimiento
  fraude.movimiento.usuario = usuarioMov;
  fraude.movimiento.tipo = tipoMov;

  const { err, dat } = await fraude.update();

  if (err) {
    res.status(403).json(err);
  } else {
    res.status(202).json(fraude);
  }
};
export const deleteFraude = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento;

  const fraude = new Fraude();
  // fraude
  fraude.id = req.body.documento.id;
  // movimiento
  fraude.movimiento.usuario = usuarioMov;
  fraude.movimiento.tipo = tipoMov;

  const { err, dat } = await fraude.delete();

  if (err) {
    res.status(403).json(err);
  } else {
    res.status(202).json(fraude);
  }
};
export const cambioEstadoFraude = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento;
  const { id, liquidador, estado } = req.body.documento;
  const fraude = new Fraude();

  // fraude
  fraude.id = id;
  fraude.liquidador = liquidador;
  fraude.estado = estado;
  // movimiento
  fraude.movimiento.usuario = usuarioMov;
  fraude.movimiento.tipo = tipoMov;

  const { err, dat } = await fraude.cambioEstado();

  if (err) {
    res.status(403).json(err);
  } else {
    res.status(202).json(fraude);
  }
};
export const estadisticaFraudes = async (req, res) => {
  const { desde, hasta } = req.body.periodo;
  const fraude = new Fraude();
  fraude.periodo = {
    desde,
    hasta,
  };

  const { err, dat } = await fraude.estadistica();

  if (err) {
    return res.status(404).json(err);
  } else {
    return res.status(201).json(dat);
  }
};
export const cambioPasswordFraude = async (req, res) => {
  const { id, password } = req.body.usuario;

  try {
    const usuario = new Usuario();
    const passSalt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, passSalt);

    usuario.id = id;
    usuario.password = passHash;
    // movimiento
    usuario.movimiento.usuario = id;
    usuario.movimiento.tipo = tiposMovimiento.cambioPassword;

    const { err, dat } = await usuario.cambioPassword();

    if (err) {
      res.status(404).json(err);
    } else {
      res.status(202).json(usuario);
    }
  } catch (error) {
    res.status(405).json(error);
  }
};
export const updatePerfilFraude = async (req, res) => {
  const { id, nombre, email, telefono } = req.body.usuario;

  try {
    const usuario = new Usuario();
    usuario.id = id;
    usuario.nombre = nombre;
    usuario.email = email;
    usuario.telefono = telefono;
    // movimiento
    usuario.movimiento.usuario = id;
    usuario.movimiento.tipo = tiposMovimiento.modificarUsuario;

    const { err, dat } = await usuario.updatePerfil();

    if (err) {
      res.status(404).json(err);
    } else {
      res.status(202).json(usuario);
    }
  } catch (error) {
    res.status(405).json(error);
  }
};
export const smsFraude = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento;
  try {
    const sms = new SMS();

    // sms
    sms.texto = req.body.sms.texto;
    sms.movil = req.body.sms.movil;
    sms.estado = req.body.sms.estado;
    // documento
    sms.idDocumento = req.body.sms.idDocumento;
    // movimiento
    sms.movimiento.usuario = usuarioMov;
    sms.movimiento.tipo = tipoMov;

    const { err, dat } = await sms.insert();

    if (err) {
      res.status(403).json(err);
    } else {
      res.status(202).json(sms);
    }
  } catch (error) {
    res.status(500).json("No se ha podido insertar el mensaje sms");
  }
};
export const referenciaSms = async (req, res) => {
  const { referencia } = req.body.referencia;
  try {
    const sms = new SMS();

    // sms
    sms.texto = req.body.sms.texto;
    sms.movil = req.body.sms.movil;
    sms.estado = req.body.sms.estado;
    // documento
    sms.idDocumento = req.body.sms.idDocumento;
    // movimiento
    sms.movimiento.usuario = usuarioMov;
    sms.movimiento.tipo = tipoMov;

    const { err, dat } = await sms.insert();

    if (err) {
      res.status(403).json(err);
    } else {
      res.status(202).json(sms);
    }
  } catch (error) {
    res.status(500).json("No se ha podido insertar el mensaje sms");
  }
};
