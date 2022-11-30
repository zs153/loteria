import axios from 'axios'

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
    const tipos = await axios.post('http://localhost:8000/api/tipos', {})
    const datos = {
      desde,
      hasta,
      cargas: cargas.data,
      tipos: tipos.data,
    }
    console.log(datos.desde, datos.hasta)
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
    REFDOC: req.bodu.refcar,
  }
  const carga = {
    refcar: req.body.refcar,
  }

  try {
    const situacion = await axios.post('http://localhost:8100/api/estadisticas/situacion', {
      periodo,
      formulario,
    })
    const oficinas = await axios.post('http://localhost:8100/api/estadisticas/oficinas', {
      carga,
    })
    const actuacion = await axios.post('http://localhost:8100/api/estadisticas/actuacion', {
      periodo,
    })

    const serieL = []
    const serieS = []
    const serieC = []

    actuacion.data.map(itm => {
      serieC.push({ x: itm.FEC, y: itm.COR })
      serieL.push({ x: itm.FEC, y: itm.LIQ })
      serieS.push({ x: itm.FEC, y: itm.SAN })
    })

    const totalSituacion = situacion.data.TOTAL
    const ratios = {
      // propuestaLiquidacion: Math.round((hitos.data.PROLIQ * 100 / totalSituacion) * 100) / 100.0,
      // propuestaSancion: Math.round((hitos.data.PROSAN * 100 / totalSituacion) * 100) / 100.0,
      correctas: Math.round((situacion.data.CORREC * 100 / totalSituacion) * 100) / 100.0,
      liquidacion: Math.round((hitos.data.LIQUID * 100 / totalSituacion) * 100) / 100.0,
      sancion: Math.round((hitos.data.SANCIO * 100 / totalSituacion) * 100) / 100.0,
      // anulacion: Math.round((hitos.data.ANUSAN * 100 / totalSituacion) * 100) / 100.0,
    }

    const datos = {
      fraude,
      periodo: { desde: new Date(periodo.desde).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }), hasta: new Date(periodo.hasta).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }) },
      tipo,
      hitos: hitos.data,
      oficinas: oficinas.data,
      situacion: situacion.data,
      ratios,
      serieC: JSON.stringify(serieC),
      serieL: JSON.stringify(serieL),
      serieS: JSON.stringify(serieS),
    }

    res.render('admin/estadisticas/fraudes', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// helpers
const formatDate = (day,month,year) => {
  return [
    padTo2Digits(day),
    padTo2Digits(month),
    year
  ].join('/')
}
const padTo2Digits = (num) => {
  return num.toString().padStart(2, '0');
}
const dateISOToUTCString = (date) => {
  const fecha = new Date(date)
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000

  return new Date(fecha.getTime() - userTimezoneOffset)
}
const yearMonthDayToUTCString = (year, month, day) => {
  const yearCDM = ('000' + year).slice(-4)
  const monthCDM = ('0' + month).slice(-2)
  const dayCDM = ('0' + day).slice(-2)

  const fecha = new Date(`${yearCDM}-${monthCDM}-${dayCDM}T00:00:00`)
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000

  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10)
}