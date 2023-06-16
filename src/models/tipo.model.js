import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseFraudeQuery = "SELECT * FROM tipos";
const insertFraudeSql = "BEGIN FORMULARIOS_PKG.INSERTTIPO(:destip,:usumov,:tipmov,:idtipo); END;";
const updateFraudeSql = "BEGIN FORMULARIOS_PKG.UPDATETIPO(:idtipo,:destip,:usumov,:tipmov); END;";
const removeFraudeSql = "BEGIN FORMULARIOS_PKG.DELETETIPO(:idtipo,:usumov,:tipmov ); END;";

export const fraude = async (context) => {
  // bind
  let query = baseFraudeQuery;
  const bind = context;

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
export const fraudes = async (context) => {
  // bind
  let query = '';
  let bind = {
    limit: context.limit,
    part: context.part,
  };

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
  const ret = await simpleExecute(insertFraudeSql, bind)

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
  const ret = await simpleExecute(updateFraudeSql, bind)

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
  const ret = await simpleExecute(removeFraudeSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};
