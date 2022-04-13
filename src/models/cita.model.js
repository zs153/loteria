import oracledb from "oracledb";
import Movimiento from "./movimiento.model";
import { connectionString } from "../settings";

class Cita {
  constructor(
    id,
    origen,
    oficina,
    fecha,
    hora,
    nif,
    nombre,
    telefono,
    descripcion,
    notas,
    observaciones,
    estado
  ) {
    this.idcita = id;
    this.orgcit = origen;
    this.oficit = oficina;
    this.feccit = fecha;
    this.horcit = hora;
    this.nifcon = nif;
    this.nomcon = nombre;
    this.telcon = telefono;
    this.descit = descripcion;
    this.notcit = notas;
    this.obscit = observaciones;
    this.stacit = estado;

    this.movi = new Movimiento();
    this.ofic = {
      id: 0,
      descripcion: "",
    };
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
  get origen() {
    return this.orgcit;
  }
  set origen(value) {
    this.orgcit = value;
  }
  get oficina() {
    return this.oficit;
  }
  set oficina(value) {
    this.oficit = value;
  }
  get fecha() {
    return this.feccit;
  }
  set fecha(value) {
    this.feccit = value;
  }
  get hora() {
    return this.horcit;
  }
  set hora(value) {
    this.horcit = value;
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
  get descripcion() {
    return this.descit;
  }
  set descripcion(value) {
    this.descit = value;
  }
  get notas() {
    return this.notcit;
  }
  set notas(value) {
    this.notcit = value;
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

  // oficina
  get office() {
    return this.ofic;
  }
  set office(value) {
    this.ofic = value;
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
        "SELECT cc.*,oo.*,TO_CHAR(feccit,'DD/MM/YYYY') AS strfec FROM citas cc INNER JOIN oficinas oo ON oo.idofic = cc.oficit WHERE cc.idcita = :p_idcita",
        [this.id],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      );

      if (result) {
        this.id = result.rows[0].IDCITA;
        this.origen = result.rows[0].ORGCIT;
        this.oficina = result.rows[0].OFICIT;
        this.fecha = result.rows[0].STRFEC;
        this.hora = result.rows[0].HORCIT;
        this.nif = result.rows[0].NIFCON;
        this.nombre = result.rows[0].NOMCON;
        this.telefono = result.rows[0].TELCON;
        this.descripcion = result.rows[0].DESCIT;
        this.notas = result.rows[0].NOTCIT;
        this.observaciones = result.rows[0].OBSCIT;
        this.estado = result.rows[0].STACIT;
        // oficina
        this.office.id = result.rows[0].IDOFIC;
        this.office.descripcion = result.rows[0].DESOFI;

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

    let strSql =
      "SELECT cc.*,oo.desofi,TO_CHAR(cc.feccit,'DD/MM/YYYY') AS strfec,CASE WHEN gg.nifcog IS NULL THEN 'Sí' ELSE 'No' END AS comple FROM citas cc INNER JOIN oficinas oo ON oo.idofic = cc.oficit LEFT JOIN cognos gg ON gg.nifcog = cc.nifcon WHERE cc.stacit < :p_stacit AND cc.feccit >= TRUNC(SYSDATE) AND cc.feccit <= TRUNC(SYSDATE) + 7 ORDER BY cc.oficit, cc.feccit";
    if (this.estado === -1) {
      strSql =
        "SELECT cc.*,oo.desofi,TO_CHAR(cc.feccit,'DD/MM/YYYY') AS strfec, CASE WHEN gg.nifcog IS NULL THEN 'Sí' ELSE 'No' END AS comple FROM citas cc INNER JOIN oficinas oo ON oo.idofic = cc.oficit  LEFT JOIN cognos gg ON gg.nifcog = cc.nifcon ORDER BY cc.oficit, cc.feccit";
    }

    try {
      const conn = await oracledb.getConnection(connectionString);
      const result = await conn.execute(
        strSql,
        this.estado === -1 ? [] : [this.estado],
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
        "BEGIN FORMULARIOS_PKG.INSERTCITA(:p_orgcit, :p_oficit, TO_DATE(:p_feccit,'YYYY-MM-DD'), :p_horcit, :p_nifcon, :p_nomcon, :p_telcon, :p_descit, :p_notcit, :p_obscit, :p_stacit, :p_usumov, :p_tipmov, :p_idcita); END;",
        {
          // cita
          p_orgcit: this.origen,
          p_oficit: this.oficina,
          p_feccit: this.fecha,
          p_horcit: this.hora,
          p_nifcon: this.nif,
          p_nomcon: this.nombre,
          p_telcon: this.telefono,
          p_descit: this.descripcion,
          p_notcit: this.notas,
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
        "BEGIN FORMULARIOS_PKG.UPDATECITA(:p_idcita, :p_obscit, :p_usumov, :p_tipmov); END;",
        {
          // cita
          p_idcita: this.id,
          p_obscit: this.observaciones,
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
  async asignar(formulario) {
    let conn;
    let ret;

    try {
      conn = await oracledb.getConnection(connectionString);
      await conn.execute(
        "BEGIN FORMULARIOS_PKG.ASIGNARCITA(:p_idcita, :p_stacit, TO_DATE(:p_fecdoc, 'YYYY-MM-DD'), :p_nifcon, :p_nomcon, :p_emacon, :p_telcon, :p_movcon, :p_refdoc, :p_tipdoc, :p_ejedoc, :p_ofidoc, :p_obsdoc, :p_fundoc, :p_liqdoc, :p_stadoc, :p_usumov, :p_tipmov); END;",
        {
          // cita
          p_idcita: this.id,
          p_stacit: this.estado,
          // formulario
          p_fecdoc: formulario.fecdoc,
          p_nifcon: formulario.nifcon,
          p_nomcon: formulario.nomcon,
          p_emacon: formulario.emacon,
          p_telcon: formulario.telcon,
          p_movcon: formulario.movcon,
          p_refdoc: formulario.refdoc,
          p_tipdoc: formulario.tipdoc,
          p_ejedoc: formulario.ejedoc,
          p_ofidoc: formulario.ofidoc,
          p_obsdoc: formulario.obsdoc,
          p_fundoc: formulario.fundoc,
          p_liqdoc: formulario.liqdoc,
          p_stadoc: formulario.stadoc,
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
