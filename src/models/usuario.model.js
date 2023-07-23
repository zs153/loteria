import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from "../services/database.js";

const insertSql = "BEGIN LOTERIAS_PKG.INSERTUSUARIO(:nomusu,:rolusu,:userid,:emausu,:telusu,:stausu,:usumov,:tipmov,:idusua); END;";
const updateSql = "BEGIN LOTERIAS_PKG.UPDATEUSUARIO(:idusua,:nomusu,:rolusu,:emausu,:telusu,:stausu,:usumov,:tipmov); END;";
const removeSql = "BEGIN LOTERIAS_PKG.DELETEUSUARIO(:idusua,:usumov,:tipmov); END;";
const perfilSql = "BEGIN LOTERIAS_PKG.UPDATEPERFILUSUARIO(:idusua,:nomusu,:emausu,:telusu, :usumov,:tipmov); END;";

export const usuario = async (context) => {
  // bind
  let query = "SELECT uu.* FROM usuarios uu";
  const bind = context

  if (context.IDUSUA) {
    query += " WHERE uu.idusua = :idusua";
  } else if (context.USERID) {
    query += " WHERE uu.userid = :userid";
  } else if (context.EMAUSU) {
    query += " WHERE uu.emausu = :emausu";
  } 

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const usuarios = async (context) => {
  // bind
  let query = '';
  let bind = {
    limit: context.limit,
    part: context.part,
  };

  if (context.oficina) {
    bind.ofiusu = context.oficina
    query = "WITH datos AS (SELECT uu.* FROM usuarios uu WHERE (uu.nomusu LIKE '%' || :part || '%' OR uu.userid LIKE '%' || LOWER(:part) || '%' OR :part IS NULL))"
  } else {
    query = "WITH datos AS (SELECT uu.* FROM usuarios uu WHERE (uu.nomusu LIKE '%' || :part || '%' OR uu.userid LIKE '%' || LOWER(:part) || '%' OR :part IS NULL))"
  }

  if (context.direction === 'next') {
    bind.nomusu = context.cursor.next === '' ? null : context.cursor.next;
    query += "SELECT * FROM datos WHERE nomusu > :nomusu OR :nomusu IS NULL ORDER BY nomusu ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.nomusu = context.cursor.prev === '' ? null : context.cursor.prev;
    query += "SELECT * FROM datos WHERE nomusu < :nomusu OR :nomusu IS NULL ORDER BY nomusu DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};

export const insert = async (context) => {
  // bind
  let bind = context
  bind.IDUSUA = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDUSUA = ret.outBinds.IDUSUA
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};
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
};
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
};
export const profile = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(perfilSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}