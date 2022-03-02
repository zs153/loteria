import Usuario from "../models/usuario.model";
import { tiposMovimiento } from "../public/js/enumeraciones";
import bcrypt from "bcrypt";

let usuario = new Usuario();

export const getUsuarios = async (req, res) => {
  const { err, dat } = await usuario.getUsuarios();

  if (err) {
    return res.status(404).json({ err });
  } else {
    return res.status(200).json({ dat });
  }
};
export const getUsuario = async (req, res) => {
  usuario.userid = req.body.userid;
  try {
    const { err, dat } = await usuario.getUsuarioByUserID();

    if (err) {
      res.status(412).send(err);
    } else {
      res.status(202).send(usuario);
    }
  } catch (error) {
    return res.status(404).json(err);
  }
};
export const insertUsuario = async (req, res) => {
  const {
    nombre,
    oficina,
    rol,
    userid,
    email,
    perfil,
    telefono,
    estado,
    usuarioMov,
  } = req.body.usuario;

  try {
    const passSalt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(userid, passSalt);

    // usuario
    usuario.nombre = nombre;
    usuario.oficina = oficina;
    usuario.rol = rol;
    usuario.userID = userid;
    usuario.email = email;
    usuario.perfil = perfil;
    usuario.telefono = telefono;
    usuario.estado = estado;
    usuario.password = passHash;
    // movimiento
    usuario.movimiento.usuario = usuarioMov;
    usuario.movimiento.tipo = tiposMovimiento.crearUsuario;

    const { err, dat } = await usuario.insert();

    if (err) {
      res.status(404).json(err);
    } else {
      usuario.id = dat.p_idusua;

      res.status(202).json(usuario);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updateUsuario = async (req, res) => {
  const {
    id,
    nombre,
    oficina,
    rol,
    userid,
    email,
    perfil,
    telefono,
    estado,
    usuarioMov,
  } = req.body.usuario;

  try {
    usuario.id = id;
    usuario.nombre = nombre;
    usuario.oficina = oficina;
    usuario.rol = rol;
    usuario.userID = userid;
    usuario.email = email;
    usuario.perfil = perfil;
    usuario.telefono = telefono;
    usuario.estado = estado;
    // movimiento
    usuario.movimiento.usuario = usuarioMov;
    usuario.movimiento.tipo = tiposMovimiento.modificarUsuario;

    const { err, dat } = await usuario.update();

    if (err) {
      res.status(404).json(err);
    } else {
      res.status(202).json(usuario);
    }
  } catch (error) {
    res.status(405).json(error);
  }
};
export const deleteUsuario = async (req, res) => {
  const { id, usuarioMov } = req.body.usuario;

  try {
    // usuario
    usuario.id = id;
    // movimiento
    usuario.movimiento.usuario = usuarioMov;
    usuario.movimiento.tipo = tiposMovimiento.borrarUsuario;

    const { err, dat } = await usuario.delete();

    if (err) {
      res.status(404).json({ err });
    } else {
      res.status(204).json("ok");
    }
  } catch (error) {
    res.status(405).json(error);
  }
};
export const cambioPassword = async (req, res) => {
  const { id, password } = req.body.usuario;

  try {
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
export const updatePerfil = async (req, res) => {
  const { id, nombre, email, telefono } = req.body.usuario;

  try {
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
export const restablecerPassword = async (req, res) => {
  const { id, usuarioMov } = req.body.usuario;

  try {
    const passSalt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(userid, passSalt);

    // usuario
    usuario.id = id;
    usuario.password = passHash;
    // movimiento
    usuario.movimiento.usuario = usuarioMov;
    usuario.movimiento.tipo = tiposMovimiento.restablecerPassword;

    const { err, dat } = await usuario.restablecerPassword();

    if (err) {
      res.status(404).json(err);
    } else {
      res.status(204).json(usuario);
    }
  } catch (error) {
    res.status(405).json(error);
  }
};
