import axios from 'axios'
import { estadosDocumento, tiposMovimiento } from '../public/js/enumeraciones'

// pages
export const mainPage = async (req, res) => {
  const user = req.user
  const fecha = new Date()
  const currentYear = fecha.getFullYear()
  const currentMonth = fecha.getMonth() + 1
  const lastDayMonth = new Date(currentYear, currentMonth, 0).getDate()
  const carga = {}

  let desde = new Date(yearMonthDayToUTCString(currentYear, currentMonth, 1)).toISOString().slice(0, 10)
  let hasta = new Date(yearMonthDayToUTCString(currentYear, currentMonth, lastDayMonth)).toISOString().slice(0, 10)

  try {
    const cargas = await axios.post('http://localhost:8000/api/cargas', {
      carga,
    })
    const datos = {
      desde,
      hasta,
      cargas: cargas.data,
    }

    res.render('admin/estadisticas', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// proc
export const generarEstadistica = async (req, res) => {
  const user = req.user
  const periodo = {
    DESDE: req.body.desde,
    HASTA: req.body.hasta,
  }
  const formulario = {
    REFDOC: req.body.refdoc,
  }
  const carga = {}

  try {
    const cargas = await axios.post('http://localhost:8000/api/cargas', {
      carga,
    })
    const usuarios = await axios.post('http://localhost:8000/api/estadisticas/usuarios', {
      formulario,
      tipos: {
        ASIDOC: estadosDocumento.asignado,
        RESDOC: estadosDocumento.resuelto,
      },
    })
    const oficinas = await axios.post('http://localhost:8000/api/estadisticas/oficinas', {
      formulario,
      tipos: {
        PENDOC: estadosDocumento.pendiente,
        ASIDOC: estadosDocumento.asignado,
        RESDOC: estadosDocumento.resuelto,
      },
    })
    const actuacion = await axios.post('http://localhost:8000/api/estadisticas/actuacion', {
      formulario,
      periodo,
      tipos: {
        ASIDOC: tiposMovimiento.asignarFormulario,
        RESDOC: tiposMovimiento.resolverFormulario,
        DESDOC: tiposMovimiento.desasignarFormulario,
      },
    })

    const serieA = []
    const serieR = []
    const serieD = []
    const contadores = oficinas.data.find(itm => itm.DESOFI === null)

    actuacion.data.map(itm => {
      serieA.push([new Date(itm.FECHA).getTime(), itm.ASI])
      serieR.push([new Date(itm.FECHA).getTime(), itm.RES])
      serieD.push([new Date(itm.FECHA).getTime(), itm.DES])
    })

    const ratios = {
      pendientes: Math.round((contadores.PEN * 100 / contadores.TOT) * 100) / 100.0,
      asignadas: Math.round((contadores.ADJ * 100 / contadores.TOT) * 100) / 100.0,
      resueltas: Math.round((contadores.RES * 100 / contadores.TOT) * 100) / 100.0,
    }

    const datos = {
      formulario,
      oficinas: oficinas.data,
      usuarios: usuarios.data,
      cargas: cargas.data,
      periodo,
      contadores,
      ratios,
      serieA: JSON.stringify(serieA),
      serieR: JSON.stringify(serieR),
      serieD: JSON.stringify(serieD),
    }

    res.render('admin/estadisticas/resultado', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// helpers
const yearMonthDayToUTCString = (year, month, day) => {
  const yearCDM = ('000' + year).slice(-4)
  const monthCDM = ('0' + month).slice(-2)
  const dayCDM = ('0' + day).slice(-2)

  const fecha = new Date(`${yearCDM}-${monthCDM}-${dayCDM}T00:00:00`)
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000

  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10)
}