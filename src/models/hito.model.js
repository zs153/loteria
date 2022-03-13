import oracledb from 'oracledb'
import Movimiento from './movimiento.model'
import { connectionString } from '../settings'

class Hito {
  constructor(id, tipo, subtipo, observacion, importe) {
    this.idhito = id
    this.tiphit = tipo
    this.subthi = subtipo
    this.imphit = importe
    this.obshit = observacion

    // fraude
    this.idfrau = 0
    // movimiento
    this.movi = new Movimiento()
  }

  get id() {
    return this.idhito
  }
  set id(value) {
    this.idhito = value
  }
  get tipo() {
    return this.tiphit
  }
  set tipo(value) {
    this.tiphit = value
  }
  get subTipo() {
    return this.subthi
  }
  set subTipo(value) {
    this.subthi = value
  }
  get observaciones() {
    return this.obshit
  }
  set observaciones(value) {
    this.obshit = value
  }
  get importe() {
    return this.imphit
  }
  set importe(value) {
    this.imphit = value
  }

  // movimiento
  get movimiento() {
    return this.movi
  }
  set movimiento(value) {
    this.movi = value
  }
  // fraude
  get idFraude() {
    return this.idfrau
  }
  set idFraude(value) {
    this.idfrau = value
  }

  // procedimientos
  async getHito() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        'SELECT hh.*,TO_CHAR(hh.imphit) AS strimp FROM hitos hh WHERE hh.idhito = :p_idhito',
        [this.id],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      )
      if (result) {
        this.id = result.rows[0].IDHITO
        this.fecha = result.rows[0].FECHIT
        this.tipo = result.rows[0].TIPHIT
        this.subTipo = result.rows[0].SUBTHI
        this.importe = result.rows[0].STRIMP
        this.observaciones = result.rows[0].OBSHIT

        ret = {
          err: undefined,
          dat: result.rows,
        }
      } else {
        ret = {
          err: 1,
          dat: 'No hay registro',
        }
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
  async getHitos() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        'SELECT *,TO_CHAR(hh.imphit) AS strimp FROM hitos ORDER BY fechit',
        [],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      )

      ret = {
        err: undefined,
        dat: result.rows,
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
  async getHitosFraude() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        "SELECT hh.*,TO_CHAR(hh.imphit) AS strimp,tt.destip, TO_CHAR(hh.fechit, 'DD/MM/YYYY') AS strfec FROM hitosfraude hf INNER JOIN hitos hh ON hh.idhito = hf.idhito INNER JOIN tipos tt ON tt.idtipo = hh.tiphit WHERE hf.idfrau = :p_idfrau ORDER BY fechit",
        [this.idFraude],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      )

      ret = {
        err: undefined,
        dat: result.rows,
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
  async insert() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        'BEGIN FORMULARIOS_PKG.INSERTHITO(:p_tiphit, :p_subthi, :p_imphit, :p_obshit, :p_idfrau, :p_usumov, :p_tipmov, :p_idhito); END;',
        {
          // hito
          p_tiphit: this.tipo,
          p_subthi: this.subTipo,
          p_imphit: this.importe,
          p_obshit: this.observaciones,
          // fraude
          p_idfrau: this.idFraude,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
          // retorno
          p_idhito: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        }
      )

      ret = {
        err: undefined,
        dat: result.outBinds,
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
  async update() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      await conn.execute(
        'BEGIN FORMULARIOS_PKG.UPDATEHITO(:p_idhito, :p_tiphit, :p_subthi, :p_imphit, :p_obshit, :p_usumov, :p_tipmov); END;',
        {
          // hito
          p_idhito: this.id,
          p_tiphit: this.tipo,
          p_subthi: this.subTipo,
          p_imphit: this.importe,
          p_obshit: this.observaciones,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
        }
      )

      ret = {
        err: undefined,
        dat: this.id,
      }
    } catch (error) {
      console.log(error)
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
  async delete() {
    let conn
    let ret

    try {
      conn = await oracledb.getConnection(connectionString)
      await conn.execute(
        'BEGIN FORMULARIOS_PKG.DELETEHITO(:p_idhito, :p_usumov, :p_tipmov); END;',
        {
          // hito
          p_idhito: this.id,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
        }
      )

      ret = {
        err: undefined,
        dat: this.id,
      }
    } catch (error) {
      ret = {
        err: error,
        dat: undefined,
      }
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          ret = {
            err: error,
            dat: undefined,
          }
        }
      }
    }

    return ret
  }
}

export default Hito
