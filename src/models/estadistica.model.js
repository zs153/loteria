import { simpleExecute } from '../services/database.js'

const estadisticaSituacionSql = `SELECT 
  refdoc,
  SUM(CASE WHEN stadoc = :pendoc THEN 1 ELSE 0 END) "PEN",
  SUM(CASE WHEN stadoc = :asidoc THEN 1 ELSE 0 END) "ASI",
  SUM(CASE WHEN stadoc = :resdoc THEN 1 ELSE 0 END) "RES",
  COUNT(*) "TOT"
FROM documentos
WHERE refdoc = :refdoc
GROUP BY refdoc
`
const estadisticaOficinaSql = `WITH
vOficinas AS (
  SELECT oo.idofic FROM oficinas oo
)
SELECT v.idofic "OFI", oo.desofi,
  SUM(CASE WHEN dd.stadoc = :pendoc THEN 1 ELSE 0 END) "PEN",
  SUM(CASE WHEN dd.stadoc = :asidoc THEN 1 ELSE 0 END) "ASI",
  SUM(CASE WHEN dd.stadoc = :resdoc THEN 1 ELSE 0 END) "RES"
FROM vOficinas v
LEFT JOIN (SELECT ofidoc,stadoc,refdoc FROM documentos) dd ON dd.ofidoc = v.idofic AND dd.refdoc = :refcar
LEFT JOIN oficinas oo ON oo.idofic = dd.ofidoc
GROUP BY v.idofic, oo.desofi
`
const estadisticaActuacionSql = `WITH 
vDates AS (
  SELECT TO_DATE(:desde,'YYYY-MM-DD') + ROWNUM - 1 AS fecha
FROM dual
CONNECT BY rownum <= TO_DATE(:hasta,'YYYY-MM-DD') - TO_DATE(:desde,'YYYY-MM-DD') + 1
)
SELECT v.fecha "FECHA",
  SUM(CASE WHEN mm.tipmov = :asidoc THEN 1 ELSE 0 END) "ASI",
  SUM(CASE WHEN mm.tipmov = :resdoc THEN 1 ELSE 0 END) "RES",
  SUM(CASE WHEN mm.tipmov = :desdoc THEN 1 ELSE 0 END) "DES"
FROM vDates v
LEFT JOIN movimientos mm ON TRUNC(mm.fecmov) = v.fecha
LEFT JOIN movimientosdocumento md ON md.idmovi = mm.idmovi
LEFT JOIN documentos dd ON dd.iddocu = md.iddocu AND dd.refdoc = :refdoc
GROUP BY v.fecha
`

export const statSituacion = async (bind) => {
  let result

  try {
    result = await simpleExecute(estadisticaSituacionSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows[0]
}
export const statOficinas = async (bind) => {
  let result

  try {
    result = await simpleExecute(estadisticaOficinaSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows
}
export const statActuacion = async (bind) => {
  let result

  try {
    result = await simpleExecute(estadisticaActuacionSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows
}
