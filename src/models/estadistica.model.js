import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const estadisticaSituacionSql = `SELECT 
  stadoc, count(*) numcta
FROM documentos
WHERE refdoc = :refdoc
  AND fecdoc BETWEEN TO_DATE(:desfec, 'YYYY-MM-DD') AND TO_DATE(:hasfec, 'YYYY-MM-DD') +24/24
GROUP BY ROLLUP(stadoc)
`
const estadisticaOficinaSql = `SELECT 
  oo.desofi,
  SUM(pen) "PEN",
  SUM(adj) "ADJ",
  SUM(res) "RES",
  SUM(pen+adj+res) "TOT"
  FROM (
      WITH vOficinas AS (
        SELECT oo.idofic FROM oficinas oo
      )
      SELECT v.idofic as ofi, 0 as pen, 0 as adj, 0 as res
      FROM vOficinas v
      UNION ALL
      SELECT dd.ofidoc,
        SUM(CASE WHEN dd.stadoc = 0 THEN 1 ELSE 0 END) as pen,
        SUM(CASE WHEN dd.stadoc = 1 THEN 1 ELSE 0 END) as adj,
        SUM(CASE WHEN dd.stadoc = 2 THEN 1 ELSE 0 END) as res
        FROM documentos dd
        WHERE dd.refdoc = :refcar
        GROUP BY dd.ofidoc
  ) p1
INNER JOIN oficinas oo ON oo.idofic = p1.ofi
GROUP BY ROLLUP(oo.desofi)
`
const estadisticaActuacionSql = `SELECT TO_CHAR(fec, 'yyyy-mm-dd') "FEC",
  SUM(CASE WHEN sta = 2 THEN 1 ELSE 0 END) "LIQ",
  SUM(CASE WHEN sta = 4 THEN 1 ELSE 0 END) "SAN",
  SUM(CASE WHEN sit > 0 THEN 1 ELSE 0 END) "COR"
  FROM
  (
  WITH vDates AS (
    SELECT TO_DATE(:desfec,'YYYY-MM-DD') + ROWNUM - 1 AS fecha
    FROM dual
    CONNECT BY rownum <= TO_DATE(:hasfec,'YYYY-MM-DD') - TO_DATE(:desfec,'YYYY-MM-DD') + 1
  )
  SELECT v.fecha as fec, -1 as sta, -1 as sit
  FROM vDates v
  UNION ALL
  SELECT TRUNC(fc.feccie) as fec, hh.stahit as sta, 0 AS sit    
      FROM fcierres fc
      INNER JOIN fraudes ff ON ff.idfrau = fc.idfrau
      INNER JOIN hitosfraude hf ON hf.idfrau = ff.idfrau
      INNER JOIN hitos hh ON hh.idhito = hf.idhito
      WHERE ff.tipfra = :tipfra
        AND fc.feccie BETWEEN TO_DATE(:desfec, 'YYYY-MM-DD') AND TO_DATE(:hasfec, 'YYYY-MM-DD') +24/24
      UNION ALL
      SELECT TRUNC(fc.feccie) as fec, 0 as sta, sitcie as sit
      FROM fcierres fc
      INNER JOIN fraudes ff ON ff.idfrau = fc.idfrau
      WHERE ff.tipfra = :tipfra
        AND ff.reffra = :reffra
        AND fc.feccie BETWEEN TO_DATE(:desfec, 'YYYY-MM-DD') AND TO_DATE(:hasfec, 'YYYY-MM-DD') +24/24
  ) p1
GROUP BY fec
ORDER BY fec
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

  delete bind.fecfra
  try {
    result = await simpleExecute(estadisticaActuacionSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows
}
