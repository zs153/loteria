import oracledb from "oracledb";
import { connectionString } from "../settings";

class Gente {
  constructor(nif, nombre) {
    this.nifgen = nif;
    this.nomgen = nombre;
  }

  get nif() {
    return this.nifgen;
  }
  set nif(value) {
    this.nifgen = value;
  }
  get nombre() {
    return this.nomgen;
  }
  set nombre(value) {
    this.nomgen = value;
  }

  // procedimientos
  async getGenteByNif() {
    let conn;
    let ret;

    try {
      const conn = await oracledb.getConnection(connectionString);
      const result = await conn.execute(
        "SELECT gg.* FROM gentes gg WHERE gg.nifgen = :p_nifgen",
        [this.nif],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      );

      if (result) {
        this.nif = result.rows[0].NIFGEN;
        this.nombre = result.rows[0].NOMGEN;

        ret = {
          err: undefined,
          dat: result.rows,
        };
      } else {
        ret = {
          err: 1,
          dat: "No hay registro",
        };
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      };
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          };
        }
      }
    }

    return ret;
  }
}

export default Gente;
