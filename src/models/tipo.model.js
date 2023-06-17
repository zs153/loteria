import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from "../services/database.js";

const insertSql = "BEGIN FORMULARIOS_PKG.INSERTTIPO(:destip,:ayutip,:usumov,:tipmov,:idtipo); END;";
const updateSql = "BEGIN FORMULARIOS_PKG.UPDATETIPO(:idtipo,:destip,:ayutip,:usumov,:tipmov); END;";
const removeSql = "BEGIN FORMULARIOS_PKG.DELETETIPO(:idtipo,:usumov,:tipmov ); END;";

export const tipo = async (context) => {
  // bind
  const bind = context;
  let query = "SELECT * FROM tipos";

  if (context.IDTIPO) {
    query += " WHERE idtipo = :idtipo";
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const tipos = async (context) => {
  // bind
  let bind = {
    limit: context.limit,
    part: context.part,
  };
  let query = '';

  if (context.direction === 'next') {
    bind.idtipo = context.cursor.next;
    query = "WITH datos AS (SELECT * FROM tipos WHERE destip LIKE '%' || :part || '%' OR :part IS NULL) SELECT * FROM datos WHERE idtipo > :idtipo ORDER BY idtipo ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idtipo = context.cursor.prev;
    query = "WITH datos AS (SELECT * FROM tipos WHERE destip LIKE '%' || :part || '%' OR :part IS NULL) SELECT * FROM datos WHERE idtipo < :idtipo ORDER BY idtipo DESC FETCH NEXT :limit ROWS ONLY"
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
  bind.IDTIPO = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDTIPO = ret.outBinds.IDTIPO
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
