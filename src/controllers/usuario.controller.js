import axios from 'axios'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secret } from '../config/settings'
import {
  arrTiposRol,
  arrTiposPerfil,
  arrEstadosUsuario,
  estadosUsuario,
  tiposMovimiento,
  tiposRol,
  tiposPerfil,
} from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const usuario = {}

  try {
    const result = await axios.post('http://localhost:8000/api/usuarios')
    const datos = {
      usuarios: JSON.stringify(result.data),
      estadosUsuario,
      tiposRol,
    }

    res.render('admin/usuarios', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const addPage = async (req, res) => {
  const user = req.user
  const usuario = {
    STAUSU: estadosUsuario.activo,
    ROLUSU: tiposRol.usuario,
    PERUSU: tiposPerfil.general,
  }
  const filteredRol = arrTiposRol.filter(itm => itm.id <= user.rol)

  try {
    const result = await axios.post('http://localhost:8000/api/oficinas')

    const datos = {
      usuario,
      oficinas: result.data,
      filteredRol,
      arrTiposPerfil,
      arrEstadosUsuario,
    }

    res.render('admin/usuarios/add', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editPage = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: req.params.id,
  }

  try {
    const oficinas = await axios.post('http://localhost:8000/api/oficinas')
    const result = await axios.post('http://localhost:8000/api/usuario', {
      usuario,
    })
    const filteredRol = arrTiposRol.filter(itm => itm.id <= user.rol)

    const datos = {
      usuario: result.data,
      oficinas: oficinas.data,
      filteredRol,
      arrTiposPerfil,
      arrEstadosUsuario,
    }

    res.render('admin/usuarios/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const perfilPage = async (req, res) => {
  const user = req.user
  let usuario = {
    userid: req.params.userid,
  }

  try {
    const result = await axios.post('http://localhost:8000/api/usuario', {
      usuario,
    })

    usuario = {
      IDUSUA: result.data.IDUSUA,
      NOMUSU: result.data.NOMUSU,
      OFIUSU: result.data.OFIUSU,
      USERID: result.data.USERID,
      EMAUSU: result.data.EMAUSU,
      TELUSU: result.data.TELUSU,
    }

    const datos = {
      usuario,
      tiposRol,
    }

    res.render('admin/usuarios/perfil', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const insert = async (req, res) => {
  const user = req.user
  const randomString = Math.random().toString(36).substring(2, 10);
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(randomString, salt);
  const usuario = {
    NOMUSU: req.body.nomusu.toUpperCase(),
    OFIUSU: req.body.ofiusu,
    ROLUSU: req.body.rolusu,
    USERID: req.body.userid.toLowerCase(),
    EMAUSU: req.body.emausu,
    PERUSU: req.body.perusu,
    TELUSU: req.body.telusu,
    PWDUSU: passHash,
    STAUSU: req.body.stausu,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearUsuario,
  }

  try {
    const result = await axios.post(
      'http://localhost:8000/api/usuarios/insert',
      {
        usuario,
        movimiento,
      }
    )

    res.redirect('/admin/usuarios')
  } catch (error) {
    let msg = 'No se ha podido crear el nuevo usuario.'

    if (error.response.data.errorNum === 20100) {
      msg = 'El usuario ya está registrado'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const update = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: req.body.idusua,
    NOMUSU: req.body.nomusu.toUpperCase(),
    OFIUSU: req.body.ofiusu,
    ROLUSU: req.body.rolusu,
    USERID: req.body.userid.toLowerCase(),
    EMAUSU: req.body.emausu,
    PERUSU: req.body.perusu,
    TELUSU: req.body.telusu,
    STAUSU: req.body.stausu,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarUsuario,
  }

  try {
    await axios.post('http://localhost:8000/api/usuarios/update', {
      usuario,
      movimiento,
    })

    res.redirect('/admin/usuarios')
  } catch (error) {
    let msg =
      'No se han podido modificar los datos del usuario. Verifique los datos introducidos'

    if (error.response.data.errorNum === 20100) {
      msg =
        'El usuario ya está registrado. Verifique el userID y la contraseña.'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: req.body.idusua,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarUsuario,
  }

  try {
    await axios.post('http://localhost:8000/api/usuarios/delete', {
      usuario,
      movimiento,
    })

    res.redirect('/admin/usuarios')
  } catch (error) {
    const msg = 'No se ha podido elminar la oficina.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const changePassword = async (req, res) => {
  const user = req.user
  const salt = await bcrypt.genSalt(10)
  const passHash = await bcrypt.hash(req.body.pwdusu, salt)
  const usuario = {
    idusua: req.body.idusua,
    pwdusu: passHash,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.cambioPassword,
  }

  try {
    const result = await axios.post(
      'http://localhost:8000/api/usuarios/cambio',
      {
        usuario,
        movimiento,
      }
    )

    res.redirect('/admin/usuarios')
  } catch (error) {
    res.redirect('/admin/usuarios')
  }
}
export const updatePerfil = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: req.body.idusua,
    NOMUSU: req.body.nomusu,
    OFIUSU: req.body.ofiusu,
    EMAUSU: req.body.emausu,
    TELUSU: req.body.telusu,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarPerfil,
  }

  try {
    const result = await axios.post(
      'http://localhost:8000/api/usuarios/perfil',
      {
        usuario,
        movimiento,
      }
    )

    const accessToken = jwt.sign(
      {
        id: user.id,
        userID: user.userID,
        rol: user.rol,
        oficina: usuario.OFIUSU,
      },
      `${secret}`,
      { expiresIn: '8h' }
    )
    const options = {
      path: '/',
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 8, // 8 horas
      httpOnly: true,
    }

    res.cookie('auth', accessToken, options)
    res.redirect('/admin')
  } catch (error) {
    res.redirect('/admin')
  }
}