import Tipo from "../models/tipo.model";
import { tiposMovimiento } from "../public/js/enumeraciones";

let tipo = new Tipo();

export const getTipos = async (req, res) => {
  const { err, dat } = await tipo.getTipos();

  if (err) {
    return res.status(404).json({ err });
  } else {
    return res.status(200).json({ dat });
  }
};
export const getTiposByOrigen = async (req, res) => {
  tipo.origen = req.body.origen;
  try {
    const { err, dat } = await tipo.getTiposByOrigen();

    if (err) {
      res.status(402).json(err);
    } else {
      res.status(202).json(dat);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getTipo = async (req, res) => {
  tipo.id = req.body.id;

  try {
    const { err, dat } = await tipo.getTipo();

    if (err) {
      res.status(403).json(err);
    } else {
      return res.status(202).json(tipo);
    }
  } catch (error) {
    return res.status(404).json({ err });
  }
};
export const insertTipo = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento;

  // tipo
  tipo.descripcion = req.body.tipo.destip;
  tipo.textoAyuda = req.body.tipo.ayutip;
  tipo.origen = req.body.tipo.orgtip;
  // movimiento
  tipo.movimiento.usuario = usuarioMov;
  tipo.movimiento.tipo = tipoMov;

  try {
    const { err, dat } = await tipo.insert();

    if (err) {
      res.status(404).json(err);
    } else {
      tipo.id = dat.p_idtipo;

      res.status(202).json(tipo);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updateTipo = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento;

  try {
    // tipo
    tipo.id = req.body.tipo.idtipo;
    tipo.descripcion = req.body.tipo.destip;
    tipo.textoAyuda = req.body.tipo.ayutip;
    tipo.origen = req.body.tipo.orgtip;
    // movimiento
    tipo.movimiento.usuario = usuarioMov;
    tipo.movimiento.tipo = tipoMov;

    console.log(tipo);
    const { err, dat } = await tipo.update();

    if (err) {
      res.status(404).json(err);
    } else {
      res.status(202).json(tipo);
    }
  } catch (error) {
    res.status(405).json(error);
  }
};
export const deleteTipo = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento;

  try {
    // tipo
    tipo.id = req.body.tipo.idtipo;
    // movimiento
    tipo.movimiento.usuario = usuarioMov;
    tipo.movimiento.tipo = tipoMov;

    const { err, dat } = await tipo.delete();

    if (err) {
      res.status(404).json(err);
    } else {
      res.status(204).json(tipo);
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
