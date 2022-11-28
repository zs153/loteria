import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
    oo.desofi,
    tt.destip,
    dd.*
FROM documentos dd
INNER JOIN tipos tt ON tt.idtipo = dd.tipdoc
INNER JOIN oficinas oo ON oo.idofic = dd.ofidoc
`
const insertSql = `BEGIN FORMULARIOS_PKG.INSERTFORMULARIO(
  to_date(:fecdoc,'YYYY-MM-DD'),
  :nifcon,
  :nomcon,
  :emacon,
  :telcon,
  :movcon,
  :refdoc,
  :tipdoc,
  :ejedoc,
  :ofidoc,
  :obsdoc,
  :fundoc,
  :liqdoc,
  :stadoc,
  :usumov,
  :tipmov,
  :iddocu
); END;
`
const updateSql = `BEGIN FORMULARIOS_PKG.UPDATEFORMULARIO(
  :iddocu,
  TO_DATE(:fecdoc,'YYYY-MM-DD'),
  :nifcon,
  :nomcon,
  :emacon,
  :telcon,
  :movcon,
  :tipdoc,
  :ejedoc,
  :ofidoc,
  :obsdoc,
  :usumov,
  :tipmov
); END;
`
const deleteSql = `BEGIN FORMULARIOS_PKG.DELETEFORMULARIO(
  :iddocu,
  :usumov,
  :tipmov 
); END;
`
const asignarSql = `BEGIN FORMULARIOS_PKG.CAMBIOESTADOFORMULARIO(
  :iddocu,
  :liqdoc,
  :stadoc,
  :usumov,
  :tipmov 
); END;
`
const desasignarSql = `BEGIN FORMULARIOS_PKG.CAMBIOESTADOFORMULARIO(
  :iddocu,
  :liqdoc,
  :stadoc,
  :usumov,
  :tipmov 
); END;
`
const resolverSql = `BEGIN FORMULARIOS_PKG.CAMBIOESTADOFORMULARIO(
  :iddocu,
  :liqdoc,
  :stadoc,
  :usumov,
  :tipmov 
); END;
`

export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.IDDOCU) {
    binds.iddocu = context.IDDOCU
    query += `WHERE iddocu = :iddocu`
  } else if (context.REFDOC) {
    binds.refdoc = context.REFDOC
    query += `WHERE refdoc = :refdoc`
  } else if (context.LIQDOC) {
    binds.liqdoc = context.LIQDOC
    if (context.TIPVIS === 1) {
      // mostrar asignados al liquidador y todos los pendientes
      query += `WHERE dd.liqdoc = :liqdoc
          AND BITAND(dd.stadoc,1) > 0
        UNION
        SELECT
          oo.desofi,
          tt.destip,
          dd.*
        FROM documentos dd
        INNER JOIN tipos tt ON tt.idtipo = dd.tipdoc
        INNER JOIN oficinas oo ON oo.idofic = dd.ofidoc
        WHERE dd.stadoc = 0
      `
    } else {
      // mostrar los resueltos por el liquidador
      query += `WHERE dd.liqdoc = :liqdoc 
        AND BITAND(dd.stadoc,2) > 0
      `
    }
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const insert = async (bind) => {
  bind.iddocu = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.iddocu = await result.outBinds.iddocu
  } catch (error) {
    bind = null
  }

  return bind
}
export const update = async (bind) => {
  let result

  try {
    await simpleExecute(updateSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const remove = async (bind) => {
  let result

  try {
    await simpleExecute(deleteSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const asignar = async (bind) => {
  let result

  try {
    await simpleExecute(asignarSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const desasingar = async (bind) => {
  let result

  try {
    await simpleExecute(desasignarSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const resolver = async (bind) => {
  let result

  try {
    await simpleExecute(resolverSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
