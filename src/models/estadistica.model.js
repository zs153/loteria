import { simpleExecute } from '../services/database.js'

const usuariosSql = "SELECT p1.userid, p1.ADJ, p1.RES, ROUND(100 * p1.ADJ/s.TOT, 2) PORADJ, ROUND(100 * p1.RES/s.TOT, 2) PORRES FROM (SELECT uu.userid,SUM(CASE WHEN dd.stadoc = :asidoc THEN 1 ELSE 0 END) ADJ,SUM(CASE WHEN dd.stadoc = :resdoc THEN 1 ELSE 0 END) RES FROM usuarios uu LEFT JOIN documentos dd ON dd.liqdoc = uu.userid AND dd.refdoc = :refdoc GROUP BY uu.userid) p1, (SELECT COUNT(*) TOT FROM formularios WHERE reffor = :reffor) s"
const estadisticaOficinaSql = `SELECT 
  oo.desofi, 
  SUM(p1.pen) "PEN", 
  SUM(p1.adj) "ADJ", 
  SUM(p1.res) "RES",
  SUM(p1.pen + p1.adj + p1.res) "TOT"
FROM oficinas oo
LEFT JOIN (
SELECT dd.ofidoc,
  SUM(CASE WHEN dd.stadoc = :pendoc THEN 1 ELSE 0 END) "PEN",
  SUM(CASE WHEN dd.stadoc = :asidoc THEN 1 ELSE 0 END) "ADJ",
  SUM(CASE WHEN dd.stadoc = :resdoc THEN 1 ELSE 0 END) "RES"
FROM documentos dd
WHERE dd.refdoc = :refdoc
GROUP BY dd.ofidoc) p1 ON p1.ofidoc = oo.idofic
GROUP BY CUBE(desofi)
ORDER BY desofi
`
const actuacionSql = "WITH vDates AS (SELECT TO_DATE(:desde,'YYYY-MM-DD') + ROWNUM - 1 AS fecha FROM dual CONNECT BY rownum <= TO_DATE(:hasta,'YYYY-MM-DD') - TO_DATE(:desde,'YYYY-MM-DD') + 1) SELECT v.fecha,SUM(CASE WHEN mm.tipmov = :asidoc THEN 1 ELSE 0 END) ASI,SUM(CASE WHEN mm.tipmov = :resdoc THEN 1 ELSE 0 END) RES,SUM(CASE WHEN mm.tipmov = :desdoc THEN 1 ELSE 0 END) DES FROM vDates v LEFT JOIN documentos dd ON dd.refdoc = :refdoc LEFT JOIN movimientosdocumento md ON md.iddocu = dd.iddocu LEFT JOIN movimientos mm ON mm.idmovi = md.idmovi AND TRUNC(mm.fecmov) = v.fecha GROUP BY v.fecha"
const oficinasSql = "SELECT oo.desofi,SUM(p1.pen) PEN,SUM(p1.adj) ADJ,SUM(p1.res) RES,SUM(p1.pen + p1.adj + p1.res) TOT FROM oficinas oo LEFT JOIN (SELECT ff.ofifor,SUM(CASE WHEN ff.stafor = 0 THEN 1 ELSE 0 END) PEN,SUM(CASE WHEN ff.stafor = 1 THEN 1 ELSE 0 END) ADJ,SUM(CASE WHEN ff.stafor = 2 THEN 1 ELSE 0 END) RES FROM formularios ff WHERE ff.reffor = :reffor GROUP BY ff.ofifor) p1 ON p1.ofifor = oo.idofic GROUP BY CUBE(desofi) ORDER BY desofi"

export const statUsuarios = async (bind) => {
  let result

  try {
    result = await simpleExecute(usuariosSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows
}
export const statOficinas = async (bind) => {
  let result

  try {
    result = await simpleExecute(oficinasSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows
}
export const statActuacion = async (bind) => {
  let result

  try {
    result = await simpleExecute(actuacionSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows
}
