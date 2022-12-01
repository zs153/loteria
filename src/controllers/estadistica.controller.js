import axios from 'axios'
import { tiposMovimiento } from '../public/js/enumeraciones'

// pages
export const mainPage = async (req, res) => {
  const user = req.user
  const fecha = new Date()
  const currentYear = fecha.getFullYear()
  const currentMonth = fecha.getMonth() + 1
  const lastDayMonth = new Date(currentYear, currentMonth, 0).getDate()

  let desde = new Date(yearMonthDayToUTCString(currentYear, currentMonth, 1)).toISOString().slice(0, 10)
  let hasta = new Date(yearMonthDayToUTCString(currentYear, currentMonth, lastDayMonth)).toISOString().slice(0, 10)

  try {
    const cargas = await axios.post('http://localhost:8000/api/cargas', {})
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
  const carga = {
    REFCAR: req.body.refdoc,
  }

  try {
    const situacion = await axios.post('http://localhost:8000/api/estadisticas/situacion', {
      formulario,
    })
    const oficinas = await axios.post('http://localhost:8000/api/estadisticas/oficinas', {
      carga,
    })
    const actuacion = await axios.post('http://localhost:8000/api/estadisticas/actuacion', {
      formulario,
      tiposMovimiento,
      periodo,
    })

    const serieA = []
    const serieR = []

    actuacion.data.map(itm => {
      serieA.push({ x: itm.FEC, y: itm.ASI })
      serieR.push({ x: itm.FEC, y: itm.RES })
    })

    const totalSituacion = situacion.data.TOT
    const ratios = {
      pendientes: Math.round((situacion.data.PEN * 100 / totalSituacion) * 100) / 100.0,
      asignadas: Math.round((situacion.data.ASI * 100 / totalSituacion) * 100) / 100.0,
      resueltas: Math.round((situacion.data.RES * 100 / totalSituacion) * 100) / 100.0,
    }

    const datos = {
      carga,
      strPeriodo: {
        desde: new Date(periodo.DESDE).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }),
        hasta: new Date(periodo.HASTA).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      },
      periodo,
      actuacion: actuacion.data,
      oficinas: oficinas.data,
      situacion: situacion.data,
      ratios,
      serieA: JSON.stringify(serieA),
      serieR: JSON.stringify(serieR),
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