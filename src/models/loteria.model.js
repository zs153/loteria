import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from '../services/database.js';

// loteria
const insertSql = "BEGIN LOTERIAS_PKG.INSERTLOTERIA(:declot,:usulot,:stalot,:usumov,:tipmov,:idlote); END;"
const updateSql = "BEGIN LOTERIAS_PKG.UPDATELOTERIA(:idlote,:declot,:usulot,:stalot,:usumov,:tipmov); END;"
const removeSql = "BEGIN LOTERIAS_PKG.DELETELOTERIA(:idlote,:usumov,:tipmov ); END;"
const cambioSql = "BEGIN LOTERIAS_PKG.CAMBIOESTADOLOTERIA(:idlote,:stalot,:usumov,:tipmov ); END;"

// proc loteria
export const loteria = async (context) => {
  let query = "SELECT ll.* FROM loterias ll"
  let bind = context

  if (context.IDLOTE) {
    query += " WHERE ll.IDLOTE = :idlote"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const loterias = async (context) => {
  // bind
  let query = "WITH datos AS (SELECT ll.* FROM loterias ll WHERE (ll.usulot LIKE '%' || :part || '%' OR :part IS NULL)"
  let bind = {
    limit: context.limit,
    part: context.part,
  };
  
  if (context.usulot) {
    bind.usulot = context.usulot
    query += " AND ll.usulot = :usulot"
  }
  if (context.stalot) {
    bind.stalot = context.stalot
    query += " AND ll.stalot = :stalot"
  } 
  if (context.direction === 'next') {
    bind.idlote = context.cursor.next;
    query += ")SELECT * FROM datos WHERE idlote > :idlote ORDER BY idlote ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idlote = context.cursor.prev;
    query += ")SELECT * FROM datos WHERE idlote < :idlote ORDER BY idlote DESC FETCH NEXT :limit ROWS ONLY"
  }

  // exec
  const ret = await simpleExecute(query, bind)
  
  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const insert = async (context) => {
  // bind
  let bind = context
  bind.idlote = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.idlote = ret.outBinds.idlote
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const update = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(updateSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const remove = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const change = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(cambioSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
