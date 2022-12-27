import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  oo.desofi,
  tt.destip,
  dd.*,
  TO_CHAR(dd.fecdoc, 'DD/MM/YYYY') STRFEC
FROM documentos dd
INNER JOIN tipos tt ON tt.idtipo = dd.tipdoc
INNER JOIN oficinas oo ON oo.idofic = dd.ofidoc
`
const insertSql = `BEGIN FORMULARIOS_PKG.INSERTFORMULARIO(
  TO_DATE(:fecdoc,'YYYY-MM-DD'),
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
const cambioEstadoSql = `BEGIN FORMULARIOS_PKG.CAMBIOESTADOFORMULARIO(
  :iddocu,
  :liqdoc,
  :stadoc,
  :usumov,
  :tipmov 
); END;
`
const resolverConSmsSql = `BEGIN FORMULARIOS_PKG.RESOLVERCONSMSFORMULARIO(
  :iddocu,
  :liqdoc,
  :stadoc,
  :movsms,
  :texsms,
  :stasms,
  :usumov,
  :tipmov 
); END;
`
const referenciasQuery = `SELECT 
  rr.*,
  tt.destip,
  TO_CHAR(rr.fecref, 'DD/MM/YYYY') AS STRFEC
FROM referencias rr
INNER JOIN referenciasdocumento rd ON rd.idrefe = rr.idrefe
INNER JOIN tipos tt ON tt.idtipo = rr.tipref
WHERE rd.iddocu = :iddocu
`
const insertReferenciaSql = `BEGIN FORMULARIOS_PKG.INSERTREFERENCIA(
  :iddocu,
  TO_DATE(:fecref,'YYYY-MM-DD'),
  :nifref,
  :desref,
  :tipref,
  :usumov,
  :tipmov,
  :idrefe
); END;
`
const updateReferenciaSql = `BEGIN FORMULARIOS_PKG.UPDATEREFERENCIA(
  :idrefe,
  :nifref,
  :desref,
  :tipref,
  :usumov,
  :tipmov
); END;
`
const deleteReferenciaSql = `BEGIN FORMULARIOS_PKG.DELETEREFERENCIA(
  :idrefe,
  :usumov,
  :tipmov 
); END;
`
const smssQuery = `SELECT 
  ss.*,
  TO_CHAR(ss.fecsms, 'DD/MM/YYYY') "STRFEC"
FROM smss ss
INNER JOIN smssdocumento sd ON sd.idsmss = ss.idsmss
WHERE sd.iddocu = :iddocu
`
const insertSmsSql = `BEGIN FORMULARIOS_PKG.INSERTSMS(
  :iddocu,
  TO_DATE(:fecsms, 'YYYY-MM-DD'),
  :texsms,
  :movsms,
  :stasms,
  :usumov,
  :tipmov,
  :idsmss
); END;
`
const updateSmsSql = `BEGIN FORMULARIOS_PKG.UPDATESMS(
  :idsmss,
  TO_DATE(:fecsms, 'YYYY-MM-DD'),
  :texsms,
  :movsms,
  :usumov,
  :tipmov
); END;
`
const deleteSmsSql = `BEGIN FORMULARIOS_PKG.DELETESMS(
  :idsmss,
  :usumov,
  :tipmov 
); END;
`

// formulario
export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.IDDOCU) {
    binds.iddocu = context.IDDOCU
    query += `WHERE dd.iddocu = :iddocu`
  } else if (context.REFDOC) {
    binds.refdoc = context.REFDOC
    query += `WHERE dd.refdoc = :refdoc`
  } else if (context.LIQDOC) {
    binds.liqdoc = context.LIQDOC
    binds.stadoc = context.STADOC
    if (context.STADOC === 1) {
      query += `WHERE (dd.liqdoc = :liqdoc AND dd.stadoc = :stadoc) OR dd.stadoc = 0
      ORDER BY dd.stadoc DESC`
    } else {
      query += `WHERE dd.liqdoc = :liqdoc 
        AND dd.stadoc = :stadoc`
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
    await simpleExecute(cambioEstadoSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const desasingar = async (bind) => {
  let result

  try {
    await simpleExecute(cambioEstadoSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const resolver = async (bind) => {
  let query = cambioEstadoSql
  let result

  if (bind.movsms) {
    query = resolverConSmsSql
  }

  try {
    await simpleExecute(query, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}

// referencia
export const findReferencia = async (context) => {
  let query = referenciasQuery
  let binds = {}

  binds.iddocu = context.IDDOCU
  const result = await simpleExecute(query, binds)

  return result.rows
}
export const insertReferencia = async (bind) => {
  bind.idrefe = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertReferenciaSql, bind)

    bind.idrefe = await result.outBinds.idrefe
  } catch (error) {
    bind = null
  }

  return bind
}
export const updateReferencia = async (bind) => {
  let result

  try {
    await simpleExecute(updateReferenciaSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const removeReferencia = async (bind) => {
  let result

  try {
    await simpleExecute(deleteReferenciaSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}

// sms
export const findSms = async (context) => {
  let query = smssQuery
  let binds = {}

  binds.iddocu = context.IDDOCU
  const result = await simpleExecute(query, binds)

  return result.rows
}
export const insertSms = async (bind) => {
  bind.idsmss = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSmsSql, bind)

    bind.idsmss = await result.outBinds.idsmss
  } catch (error) {
    bind = null
  }

  return bind
}
export const updateSms = async (bind) => {
  let result

  try {
    await simpleExecute(updateSmsSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const removeSms = async (bind) => {
  let result

  try {
    await simpleExecute(deleteSmsSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
