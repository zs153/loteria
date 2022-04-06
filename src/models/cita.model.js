import oracledb from "oracledb";
import Movimiento from "./movimiento.model";
import { connectionString } from "../settings";

class Cita {
  constructor(
    id,
    fecha,
    nif,
    nombre,
    telefono,
    tipo,
    oficina,
    observaciones,
    estado
  ) {
    this.idcita = id;
    this.feccit = fecha;
    this.nifcon = nif;
    this.nomcon = nombre;
    this.telcon = telefono;
    this.tipcit = tipo;
    this.oficit = oficina;
    this.obscit = observaciones;
    this.stacit = estado;

    this.movi = new Movimiento();
    this.peri = {
      desde: "",
      hasta: "",
    };
  }

  get id() {
    return this.idcita;
  }
  set id(value) {
    this.idcita = value;
  }
  get fecha() {
    return this.feccit;
  }
  set fecha(value) {
    this.feccit = value;
  }
  get nif() {
    return this.nifcon;
  }
  set nif(value) {
    this.nifcon = value;
  }
  get nombre() {
    return this.nomcon;
  }
  set nombre(value) {
    this.nomcon = value;
  }
  get telefono() {
    return this.telcon;
  }
  set telefono(value) {
    this.telcon = value;
  }
  get tipo() {
    return this.tipcit;
  }
  set tipo(value) {
    this.tipcit = value;
  }
  get oficina() {
    return this.oficit;
  }
  set oficina(value) {
    this.oficit = value;
  }
  get observaciones() {
    return this.obscit;
  }
  set observaciones(value) {
    this.obscit = value;
  }
  get estado() {
    return this.stacit;
  }
  set estado(value) {
    this.stacit = value;
  }

  // periodo
  get periodo() {
    return this.peri;
  }
  set periodo(value) {
    this.peri = value;
  }

  // movimiento
  get movimiento() {
    return this.movi;
  }
  set movimiento(value) {
    this.movi = value;
  }

  // procedimientos
  async getCita() {
    let conn;
    let ret;

    try {
      const conn = await oracledb.getConnection(connectionString);
      const result = await conn.execute(
        "SELECT cc.*, TO_CHAR(feccit,'YYYY-MM-DD') AS strfec FROM citas cc WHERE cc.idcita = :p_idcita",
        [this.id],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      );

      if (result) {
        this.id = result.rows[0].IDCITA;
        this.fecha = result.rows[0].STRFEC;
        this.nif = result.rows[0].NIFCON;
        this.nombre = result.rows[0].NOMCON;
        this.telefono = result.rows[0].TELCON;
        this.oficina = result.rows[0].OFICIT;
        this.observaciones = result.rows[0].OBSCIT;
        this.estado = result.rows[0].STACIT;

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
  async getCitas() {
    let conn;
    let ret;

    const strSql =
      "SELECT cc.*,oo.desofi,TO_CHAR(cc.feccit,'DD-MM-YYYY') AS strfec from citas cc INNER JOIN oficinas oo ON oo.idofic = cc.oficit WHERE cc.stacit < :p_stacit AND cc.feccit >= TRUNC(SYSDATE) ORDER BY cc.oficit, cc.feccit";

    try {
      const conn = await oracledb.getConnection(connectionString);
      const result = await conn.execute(strSql, [this.estado], {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      });

      ret = {
        err: undefined,
        dat: result.rows,
      };
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
  async insert() {
    let conn;
    let ret;

    try {
      const conn = await oracledb.getConnection(connectionString);
      const result = await conn.execute(
        "BEGIN FORMULARIOS_PKG.INSERTCITA(TO_DATE(:p_feccit,'YYYY-MM-DD'), :p_nifcon, :p_nomcon, :p_telcon, :p_tipcit, :p_oficit, :p_obscit, :p_stacit, :p_usumov, :p_tipmov, :p_idcita); END;",
        {
          // cita
          p_feccit: this.fecha,
          p_nifcon: this.nif,
          p_nomcon: this.nombre,
          p_telcon: this.telefono,
          p_tipcit: this.tipo,
          p_oficit: this.oficina,
          p_obscit: this.observaciones,
          p_stacit: this.estado,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
          // retorno
          p_idcita: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        }
      );

      ret = {
        err: undefined,
        dat: result.outBinds,
      };
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
  async update() {
    let conn;
    let ret;

    try {
      const conn = await oracledb.getConnection(connectionString);
      await conn.execute(
        "BEGIN FORMULARIOS_PKG.UPDATECITA(:p_idcita, TO_DATE(:p_feccit,'YYYY-MM-DD'), :p_nifcon, :p_nomcon, :p_telcon, :p_tipcit, :p_oficit, :p_obscit, :p_usumov, :p_tipmov); END;",
        {
          // cita
          p_idcita: this.id,
          p_feccit: this.fecha,
          p_nifcon: this.nif,
          p_nomcon: this.nombre,
          p_telcon: this.telefono,
          p_tipcit: this.tipo,
          p_oficit: this.oficina,
          p_obscit: this.observaciones,
          p_stacit: this.estado,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
        }
      );

      ret = {
        err: undefined,
        dat: this.id,
      };
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
  async delete() {
    let conn;
    let ret;

    try {
      conn = await oracledb.getConnection(connectionString);
      await conn.execute(
        "BEGIN FORMULARIOS_PKG.DELETECITA(:p_idcita, :p_usumov, :p_tipmov); END;",
        {
          // cita
          p_idcita: this.id,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
        }
      );

      ret = {
        err: undefined,
        dat: this.id,
      };
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
  async cambioEstado() {
    let conn;
    let ret;

    try {
      conn = await oracledb.getConnection(connectionString);
      await conn.execute(
        "BEGIN FORMULARIOS_PKG.CAMBIOESTADOCITA(:p_idcita, :p_stacit, :p_usumov, :p_tipmov); END;",
        {
          // cita
          p_idcita: this.id,
          p_stacit: this.estado,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
        }
      );

      ret = {
        err: undefined,
        dat: this.id,
      };
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

export default Cita;
