import oracledb from 'oracledb'
import Movimiento from './movimiento.model'
import { connectionString } from '../settings'

class Subtipo {
  constructor(id, descripcion) {
    this.idsubt = id
    this.dessub = descripcion

    // tipo
    this.idtipo = 0
    this.idtold = 0
    // movimiento
    this.movi = new Movimiento()
  }

  get id() {
    return this.idsubt
  }
  set id(value) {
    this.idsubt = value
  }
  get descripcion() {
    return this.dessub
  }
  set descripcion(value) {
    this.dessub = value
  }

  // tipo
  get idTipo() {
    return this.idtipo
  }
  set idTipo(value) {
    this.idtipo = value
  }
  get idTOld() {
    return this.idtold
  }
  set idTOld(value) {
    this.idtold = value
  }

  // movimiento
  get movimiento() {
    return this.movi
  }
  set movimiento(value) {
    this.movi = value
  }

  // procedimientos
  async getSubtipo() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        'SELECT ss.*,st.idtipo FROM stipos ss INNER JOIN stipostipo st ON st.idsubt = ss.idsubt WHERE ss.idsubt = :p_idsubt',
        [this.id],
        {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      )

      if (result) {
        this.id = result.rows[0].IDSUBT
        this.descripcion = result.rows[0].DESSUB
        this.idTipo = result.rows[0].IDTIPO

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
  async getSubtipos() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        'SELECT ss.*,tt.idtipo,tt.destip FROM stipos ss INNER JOIN stipostipo st ON st.idsubt = ss.idsubt INNER JOIN tipos tt ON tt.idtipo = st.idtipo ORDER BY ss.dessub',
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
  async getTiposSubtipos() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        'SELECT st.idtipo,ss.idsubt, ss.dessub FROM stipostipo st INNER JOIN stipos ss ON ss.idsubt = st.idsubt',
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
  async getSubtiposTipo() {
    let conn
    let ret

    try {
      const conn = await oracledb.getConnection(connectionString)
      const result = await conn.execute(
        'SELECT st.idtipo,ss.idsubt, ss.dessub FROM stipostipo st INNER JOIN stipos ss ON ss.idsubt = st.idsubt WHERE st.idtipo = :p_idtipo',
        [this.idTipo],
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
        'BEGIN FORMULARIOS_PKG.INSERTSTIPO(:p_dessub, :p_idtipo, :p_usumov, :p_tipmov, :p_idsubt); END;',
        {
          // subtipo
          p_dessub: this.descripcion,
          // tipo
          p_idtipo: this.idTipo,
          // movimiento
          p_usumov: this.movimiento.usuario,
          p_tipmov: this.movimiento.tipo,
          // retorno
          p_idsubt: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
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
        'BEGIN FORMULARIOS_PKG.UPDATESTIPO(:p_idsubt, :p_dessub, :p_idtold, :p_idtipo, :p_usumov, :p_tipmov); END;',
        {
          // subtipo
          p_idsubt: this.id,
          p_dessub: this.descripcion,
          // tipo
          p_idtold: this.idTOld,
          p_idtipo: this.idTipo,
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
  async delete() {
    let conn
    let ret

    try {
      conn = await oracledb.getConnection(connectionString)
      await conn.execute(
        'BEGIN FORMULARIOS_PKG.DELETESTIPO(:p_idsubt, :p_usumov, :p_tipmov); END;',
        {
          // tipo
          p_idsubt: this.id,
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

export default Subtipo
