import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
    iddocu,
    fecdoc,
    nifcon,
    nomcon,
    emacon,
    telcon,
    movcon,
    refdoc,
    tipdoc,
    ejedoc,
    ofidoc,
    obsdoc,
    fundoc,
    liqdoc,
    stadoc
  FROM documentos
`
const insertSql = `BEGIN FORMULARIOS_PKG.INSERTDOCUMENTO(
  :fecdoc,
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
const updateSql = `BEGIN FORMULARIOS_PKG.UPDATEDOCUMENTO(
  :iddocu,
  :fecdoc,
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
  :tipmov
); END;
`
const deleteSql = `BEGIN FORMULARIOS_PKG.DELETEDOCUMENTO(
  :iddocu,
  :usumov,
  :tipmov 
); END;
`
const asignarSql = `BEGIN FRAUDE_PKG.ASIGNARDOCUMENTO(
  :iddocu,
  :liqdoc,
  :stadoc,
  :usumov,
  :tipmov 
); END;
`
const unasignarSql = `BEGIN FRAUDE_PKG.UNASIGNARDOCUMENTO(
  :iddocu,
  :liqdoc,
  :stadoc,
  :usumov,
  :tipmov 
); END;
`
const resolverSql = `BEGIN FRAUDE_PKG.RESOLVERDOCUMENTO(
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

  if (context.iddocu) {
    binds.idofic = context.idofic
    query += `WHERE iddocu = :iddocu`
  }
  if (context.refdoc) {
    binds.codofi = context.codofi
    query += `WHERE refdoc = :refdoc`
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
export const unasingar = async (bind) => {
  let result

  try {
    await simpleExecute(unasignarSql, bind)

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
