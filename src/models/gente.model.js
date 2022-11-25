import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
  *
FROM gentes
`

export const find = async (context) => {
  let query = baseQuery;
  let binds = {}

  if (context.nifgen.lengtn === 9) {
    binds.nifgen = context.nifgen;
    query += `WHERE nifgen = :nifgen`;
  } else {
    binds.nifgen = context.nifgen
    binds.disgen = context.disgen
    query += `WHERE nifgen = :nifgen AND disgen = :disgen`;
  }

  const result = await simpleExecute(query, binds);

  return result.rows;
}
