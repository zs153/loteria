import Usuario from '../models/usuario.model'
import SMS from '../models/sms.model'
import Formulario from '../models/formulario.model'
import { tiposMovimiento } from '../public/js/enumeraciones'
import bcrypt from 'bcrypt'

export const getFormularios = async (req, res) => {
  const formulario = new Formulario()
  formulario.estado = req.body.documento.stadoc
  formulario.oficina = req.body.documento.ofidoc

  try {
    const { err, dat } = await formulario.getFormularios()

    if (err) {
      return res.status(404).json({ err })
    } else {
      return res.status(201).json({ dat })
    }
  } catch (error) {
    res.status(500).json(error)
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
    res.status(500).json(error)
  }
}
export const getFormularioByRef = async (req, res) => {
  const formulario = new Formulario()
  formulario.referencia = req.body.referencia

  try {
    const { err, dat } = await formulario.getFormularioByRef()

    if (err) {
      res.status(404).send(err)
    } else {
      res.status(201).send(formulario)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
export const insertFormulario = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento
  const formulario = new Formulario()

  // formulario
  formulario.fecha = req.body.documento.fecdoc
  formulario.nif = req.body.documento.nifcon
  formulario.nombre = req.body.documento.nomcon
  formulario.email = req.body.documento.emacon
  formulario.telefono = req.body.documento.telcon
  formulario.movil = req.body.documento.movcon
  formulario.referencia = req.body.documento.refdoc
  formulario.tipo = req.body.documento.tipdoc
  formulario.ejercicio = req.body.documento.ejedoc
  formulario.oficina = req.body.documento.ofidoc
  formulario.observaciones = req.body.documento.obsdoc
  formulario.funcionario = req.body.documento.fundoc
  formulario.liquidador = req.body.documento.liqdoc
  formulario.estado = req.body.documento.stadoc
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
  formulario.id = req.body.documento.iddocu
  formulario.fecha = req.body.documento.fecdoc
  formulario.nif = req.body.documento.nifcon
  formulario.nombre = req.body.documento.nomcon
  formulario.email = req.body.documento.emacon
  formulario.telefono = req.body.documento.telcon
  formulario.movil = req.body.documento.movcon
  formulario.tipo = req.body.documento.tipdoc
  formulario.ejercicio = req.body.documento.ejedoc
  formulario.oficina = req.body.documento.ofidoc
  formulario.observaciones = req.body.documento.obsdoc
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
  const { usuarioMov, tipoMov } = req.body.movimiento

  try {
    const usuario = new Usuario()
    const passSalt = await bcrypt.genSalt(10)
    const passHash = await bcrypt.hash(req.body.usuario.password, passSalt)

    usuario.id = req.body.usuario.id
    usuario.password = passHash
    // movimiento
    usuario.movimiento.usuario = usuarioMov
    usuario.movimiento.tipo = tipoMov

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
  const { usuarioMov, tipoMov } = req.body.movimiento

  try {
    const usuario = new Usuario()
    usuario.id = req.body.usuario.id
    usuario.nombre = req.body.usuario.nombre
    usuario.email = req.body.usuario.email
    usuario.telefono = req.body.usuario.telefono
    usuario.oficina = req.body.usuario.oficina
    // movimiento
    usuario.movimiento.usuario = usuarioMov
    usuario.movimiento.tipo = tipoMov

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
    sms.texto = req.body.sms.texsms
    sms.movil = req.body.sms.movsms
    sms.estado = req.body.sms.stasms
    // documento
    sms.idDocumento = req.body.sms.iddocu
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
export const referenciaSms = async (req, res) => {
  const { referencia } = req.body.referencia
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
