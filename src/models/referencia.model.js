import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
  rr.*,
  TO_CHAR(rr.fecref, 'DD/MM/YYYY') "STRFEC"
FROM referencias rr
`;
const insertSql = `BEGIN FORMULARIOS_PKG.INSERTREFERENCIA(
  :fecref,
  :nifref,
  :desref,
  :tipref,
  :usumov,
  :tipmov,
  :idrefe
); END;
`;
const updateSql = `BEGIN FORMULARIOS_PKG.UPDATEREFERENCIA(
  :idrefe,
  :fecref,
  :nifref,
  :desref,
  :tipref,
  :usumov,
  :tipmov
); END;
`;
const removeSql = `BEGIN FORMULARIOS_PKG.DELETEREFERENCIA(
  :idrefe,
  :usumov,
  :tipmov 
); END;
`;

export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.IDREFE) {
    binds.idrefe = context.IDREFE;
    query += `WHERE rr.idrefe = :idrefe`;
  }

  console.log(query, binds)
  const result = await simpleExecute(query, binds);
  return result.rows;
};

export const insert = async (bind) => {
  bind.idrefe = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  try {
    const result = await simpleExecute(insertSql, bind);

    bind.idrefe = await result.outBinds.idrefe;
  } catch (error) {
    bind = null;
  }

  return bind;
};
export const update = async (bind) => {
  let result;

  try {
    await simpleExecute(updateSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
export const remove = async (bind) => {
  let result;

  try {
    await simpleExecute(removeSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};