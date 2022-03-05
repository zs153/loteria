import Usuario from '../models/usuario.model'
import SMS from '../models/sms.model'
import Formulario from '../models/formulario.model'
import { tiposMovimiento } from '../public/js/enumeraciones'
import bcrypt from 'bcrypt'

export const getFormularios = async (req, res) => {
  const formulario = new Formulario()
  formulario.estado = req.body.documento.stadoc

  const { err, dat } = await formulario.getFormularios()

  if (err) {
    return res.status(404).json({ err })
  } else {
    return res.status(201).json({ dat })
  }
}
export const getFormulario = async (req, res) => {
  const formulario = new Formulario()
  formulario.id = req.body.id

  try {
    const { err, dat } = await formulario.getFormulario()

    if (err) {
      res.status(404).send(err)
    } else {
      res.status(201).send(formulario)
    }
  } catch (error) {
    res.status(401).json(err)
  }
}
export const insertFormulario = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento
  const formulario = new Formulario()
  const referencia =
    'D' + randomString(10, '01289012345673456783456s7e8345678h3xyz')

  // formulario
  formulario.fecha = req.body.documento.fecha.substr(0, 10)
  formulario.nif = req.body.documento.nif
  formulario.nombre = req.body.documento.nombre
  formulario.email = req.body.documento.email
  formulario.referencia = referencia
  formulario.tipo = req.body.documento.tipo
  formulario.ejercicio = req.body.documento.ejercicio
  formulario.oficina = req.body.documento.oficina
  formulario.observaciones = req.body.documento.observaciones
  formulario.telefono = req.body.documento.telefono
  formulario.movil = req.body.documento.movil
  formulario.funcionario = req.body.documento.funcionario
  formulario.liquidador = req.body.documento.liquidador
  formulario.estado = req.body.documento.estado
  // movimiento
  formulario.movimiento.usuario = usuarioMov
  formulario.movimiento.tipo = tipoMov

  const { err, dat } = await formulario.insert()

  if (err) {
    res.status(408).json(err)
  } else {
    res.status(202).json(formulario)
  }
}
export const updateFormulario = async (req, res) => {
  const formulario = new Formulario()
  const { usuarioMov, tipoMov } = req.body.movimiento

  // formulario
  formulario.id = req.body.documento.id
  formulario.fecha = req.body.documento.fecha
  formulario.nif = req.body.documento.nif
  formulario.nombre = req.body.documento.nombre
  formulario.email = req.body.documento.email
  formulario.referencia = req.body.documento.referencia
  formulario.tipo = req.body.documento.tipo
  formulario.ejercicio = req.body.documento.ejercicio
  formulario.oficina = req.body.documento.oficina
  formulario.observaciones = req.body.documento.observaciones
  formulario.telefono = req.body.documento.telefono
  formulario.movil = req.body.documento.movil
  // movimiento
  formulario.movimiento.usuario = usuarioMov
  formulario.movimiento.tipo = tipoMov

  const { err, dat } = await formulario.update()

  if (err) {
    res.status(403).json(err)
  } else {
    res.status(202).json(formulario)
  }
}
export const deleteFormulario = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento

  const formulario = new Formulario()
  // formulario
  formulario.id = req.body.documento.id
  // movimiento
  formulario.movimiento.usuario = usuarioMov
  formulario.movimiento.tipo = tipoMov

  const { err, dat } = await formulario.delete()

  if (err) {
    res.status(403).json(err)
  } else {
    res.status(202).json(formulario)
  }
}
export const cambioEstado = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento
  const { id, liquidador, estado } = req.body.documento
  const formulario = new Formulario()

  // formulario
  formulario.id = id
  formulario.liquidador = liquidador
  formulario.estado = estado
  // movimiento
  formulario.movimiento.usuario = usuarioMov
  formulario.movimiento.tipo = tipoMov

  const { err, dat } = await formulario.cambioEstado()

  if (err) {
    res.status(403).json(err)
  } else {
    res.status(202).json(formulario)
  }
}
export const estadisticaFormularios = async (req, res) => {
  const { desde, hasta } = req.body.periodo
  const formulario = new Formulario()
  formulario.periodo = {
    desde,
    hasta,
  }

  const { err, dat } = await formulario.estadistica()

  if (err) {
    return res.status(404).json(err)
  } else {
    return res.status(201).json(dat)
  }
}
export const cambioPasswordFormulario = async (req, res) => {
  const { id, password } = req.body.usuario

  try {
    const usuario = new Usuario()
    const passSalt = await bcrypt.genSalt(10)
    const passHash = await bcrypt.hash(password, passSalt)

    usuario.id = id
    usuario.password = passHash
    // movimiento
    usuario.movimiento.usuario = id
    usuario.movimiento.tipo = tiposMovimiento.cambioPassword

    const { err, dat } = await usuario.cambioPassword()

    if (err) {
      res.status(404).json(err)
    } else {
      res.status(202).json(usuario)
    }
  } catch (error) {
    res.status(405).json(error)
  }
}
export const updatePerfilFormulario = async (req, res) => {
  const { id, nombre, email, telefono } = req.body.usuario

  try {
    const usuario = new Usuario()
    usuario.id = id
    usuario.nombre = nombre
    usuario.email = email
    usuario.telefono = telefono
    // movimiento
    usuario.movimiento.usuario = id
    usuario.movimiento.tipo = tiposMovimiento.modificarUsuario

    const { err, dat } = await usuario.updatePerfil()

    if (err) {
      res.status(404).json(err)
    } else {
      res.status(202).json(usuario)
    }
  } catch (error) {
    res.status(405).json(error)
  }
}
export const sms = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento
  try {
    const sms = new SMS()

    // sms
    sms.texto = req.body.sms.texto
    sms.movil = req.body.sms.movil
    sms.estado = req.body.sms.estado
    // documento
    sms.idDocumento = req.body.sms.idDocumento
    // movimiento
    sms.movimiento.usuario = usuarioMov
    sms.movimiento.tipo = tipoMov

    const { err, dat } = await sms.insert()

    if (err) {
      res.status(403).json(err)
    } else {
      res.status(202).json(sms)
    }
  } catch (error) {
    res.status(500).json('No se ha podido insertar el mensaje sms')
  }
}
function randomString(long, chars) {
  let result = ''
  for (let i = long; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}
