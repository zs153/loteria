import oracledb from "oracledb";
import Movimiento from "./movimiento.model";
import { connectionString } from "../settings";

class Fraude {
  constructor(
    id,
    fecha,
    nif,
    nombre,
    email,
    telefono,
    movil,
    estado,
    referencia,
    tipo,
    ejercicio,
    oficina,
    observaciones,
    funcionario,
    liquidador
  ) {
    this.idfrau = id;
    this.fecfra = fecha;
    this.nifcon = nif;
    this.nomcon = nombre;
    this.emacon = email;
    this.telcon = telefono;
    this.movcon = movil;
    this.reffra = referencia;
    this.tipfra = tipo;
    this.ejefra = ejercicio;
    this.ofifra = oficina;
    this.obsfra = observaciones;
    this.funfra = funcionario;
    this.liqfra = liquidador;
    this.stafra = estado;

    this.movi = new Movimiento();
    this.peri = {
      desde: "",
      hasta: "",
    };
  }

  get id() {
    return this.idfrau;
  }
  set id(value) {
    this.idfrau = value;
  }
  get fecha() {
    return this.fecfra;
  }
  set fecha(value) {
    this.fecfra = value;
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
  get email() {
    return this.emacon;
  }
  set email(value) {
    this.emacon = value;
  }
  get telefono() {
    return this.telcon;
  }
  set telefono(value) {
    this.telcon = value;
  }
  get movil() {
    return this.movcon;
  }
  set movil(value) {
    this.movcon = value;
  }
  get referencia() {
    return this.reffra;
  }
  set referencia(value) {
    this.reffra = value;
  }
  get tipo() {
    return this.tipfra;
  }
  set tipo(value) {
    this.tipfra = value;
  }
  get ejercicio() {
    return this.ejefra;
  }
  set ejercicio(value) {
    this.ejefra = value;
  }
  get oficina() {
    return this.ofifra;
  }
  set oficina(value) {
    this.ofifra = value;
  }
  get observaciones() {
    return this.obsfra;
  }
  set observaciones(value) {
    this.obsfra = value;
  }
  get funcionario() {
    return this.funfra;
  }
  set funcionario(value) {
    this.funfra = value;
  }
  get liquidador() {
    return this.liqfra;
  }
  set liquidador(value) {
    this.liqfra = value;
  }
  get estado() {
    return this.stafra;
  }
  set estado(value) {
    this.stafra = value;
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
  async getFraude() {
    let conn;
    let ret;

    try {
      const conn = await oracledb.getConnection(connectionString);
      const result = await conn.execute(
        "SELECT ff.*, TO_CHAR(fecfra,'YYYY-MM-DD') AS strfec FROM fraudes ff WHERE ff.idfrau = :p_idfrau",
        [this.id],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      );

      if (result) {
        this.id = result.rows[0].IDFRAU;
        this.fecha = result.rows[0].STRFEC;
        this.nif = result.rows[0].NIFCON;
        this.nombre = result.rows[0].NOMCON;
        this.email = result.rows[0].EMACON;
        this.telefono = result.rows[0].TELCON;
        this.movil = result.rows[0].MOVCON;
        this.referencia = result.rows[0].REFFRA;
        this.tipo = result.rows[0].TIPFRA;
        this.ejercicio = result.rows[0].EJEFRA;
        this.oficina = result.rows[0].OFIFRA;
        this.observaciones = result.rows[0].OBSFRA;
        this.funcionario = result.rows[0].FUNFRA;
        this.liquidador = result.rows[0].LIQFRA;
        this.estado = result.rows[0].STAFRA;

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
  async getFraudeByRef() {
    let conn;
    let ret;

    try {
      const conn = await oracledb.getConnection(connectionString);
      const result = await conn.execute(
        "SELECT ff.*, TO_CHAR(fecfra,'YYYY-MM-DD') AS strfec FROM fraudes ff WHERE ff.reffra = :p_reffra",
        [this.referencia],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      );

      if (result) {
        this.id = result.rows[0].IDFRAU;
        this.fecha = result.rows[0].STRFEC;
        this.nif = result.rows[0].NIFCON;
        this.nombre = result.rows[0].NOMCON;
        this.email = result.rows[0].EMACON;
        this.telefono = result.rows[0].TELCON;
        this.movil = result.rows[0].MOVCON;
        this.referencia = result.rows[0].REFFRA;
        this.tipo = result.rows[0].TIPFRA;
        this.ejercicio = result.rows[0].EJEFRA;
        this.oficina = result.rows[0].OFIFRA;
        this.observaciones = result.rows[0].OBSFRA;
        this.funcionario = result.rows[0].FUNFRA;
        this.liquidador = result.rows[0].LIQFRA;
        this.estado = result.rows[0].STAFRA;

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
  async getFraudes() {
    let conn;
    let ret;

    let strSql =
      "SELECT oo.desofi,tt.destip,ff.idfrau,TO_CHAR(ff.fecfra, 'DD/MM/YYYY') AS strfec,ff.reffra,ff.nifcon,ff.nomcon,ff.movcon,ff.obsfra,ff.liqfra,ff.stafra FROM ";
    strSql +=
      "(SELECT ofifra, fecfra, idfrau FROM fraudes GROUP BY ofifra, fecfra, idfrau) zz ";
    strSql += "INNER JOIN fraudes ff ON ff.idfrau = zz.idfrau ";
    strSql += "INNER JOIN oficinas oo ON oo.idofic = zz.ofifra ";
    strSql += "INNER JOIN tipos tt ON tt.idtipo = ff.tipfra ";
    strSql += "WHERE ff.stafra < :p_stafra ORDER BY ff.ofifra, ff.fecfra";

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
  async estadistica() {
    let conn;
    let ret;

    let strSql = "SELECT desofi,";
    strSql += "SUM(CASE WHEN stafra = 0 THEN 1 ELSE 0 END) AS pend,";
    strSql += "SUM(CASE WHEN stafra = 1 THEN 1 ELSE 0 END) AS asig,";
    strSql += "SUM(CASE WHEN stafra = 2 THEN 1 ELSE 0 END) AS resu,";
    strSql += "SUM(CASE WHEN stafra = 3 THEN 1 ELSE 0 END) AS remi ";
    strSql += "FROM (SELECT idfrau FROM movimientos mm ";
    strSql += "INNER JOIN movimientosdocumento md ON md.idmovi = mm.idmovi ";
    strSql +=
      "WHERE tipmov = 0 AND mm.fecmov BETWEEN TO_DATE(:p_desfec,'YYYY-MM-DD') AND TO_DATE(:p_hasfec,'YYYY-MM-DD')) p1 ";
    strSql += "INNER JOIN fraudes ff ON ff.idfrau = p1.idfrau ";
    strSql += "INNER JOIN oficinas oo ON oo.idofic = ff.ofifra ";
    strSql += "GROUP BY desofi ORDER BY desofi";

    try {
      const conn = await oracledb.getConnection(connectionString);
      const result = await conn.execute(
        strSql,
        [this.periodo.desde, this.periodo.hasta],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      );

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
        "BEGIN FORMULARIOS_PKG.INSERTFRAUDE(TO_DATE(:p_fecfra,'YYYY-MM-DD'), :p_nifcon, :p_nomcon, :p_emacon, :p_telcon, :p_movcon, :p_reffra, :p_tipfra, :p_ejefra, :p_ofifra, :p_obsfra, :p_funfra, :p_liqfra, :p_stafra, :p_usumov, :p_tipmov, :p_idfrau); END;",
        {
          // fraude
          p_fecfra: this.fecha,
          p_nifcon: this.nif,
          p_nomcon: this.nombre,
          p_emacon: this.email,
          p_telcon: this.telefono,
          p_movcon: this.movil,
          p_reffra: this.referencia,
          p_tipfra: this.tipo,
          p_ejefra: this.ejercicio,
          p_ofifra: this.oficina,
          p_obsfra: this.observaciones,
          p_funfra: this.funcionario,
          p_liqfra: this.liquidador,
          p_stafra: this.estado,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
          // retorno
          p_idfrau: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
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
        "BEGIN FORMULARIOS_PKG.UPDATEFRAUDE(:p_idfrau, TO_DATE(:p_fecfra,'YYYY-MM-DD'), :p_nifcon, :p_nomcon, :p_emacon, :p_telcon, :p_movcon, :p_tipfra, :p_ejefra, :p_ofifra, :p_obsfra, :p_usumov, :p_tipmov); END;",
        {
          // fraude
          p_idfrau: this.id,
          p_fecfra: this.fecha,
          p_nifcon: this.nif,
          p_nomcon: this.nombre,
          p_emacon: this.email,
          p_telcon: this.telefono,
          p_movcon: this.movil,
          p_tipfra: this.tipo,
          p_ejefra: this.ejercicio,
          p_ofifra: this.oficina,
          p_obsfra: this.observaciones,
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
        "BEGIN FORMULARIOS_PKG.DELETEFRAUDE(:p_idfrau, :p_usumov, :p_tipmov); END;",
        {
          // fraude
          p_idfrau: this.id,
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
        "BEGIN FORMULARIOS_PKG.CAMBIOESTADOFRAUDE(:p_idfrau, :p_liqfra, :p_stafra, :p_usumov, :p_tipmov); END;",
        {
          // fraude
          p_idfrau: this.id,
          p_liqfra: this.liquidador,
          p_stafra: this.estado,
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
      console.log(error);
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

export default Fraude;
