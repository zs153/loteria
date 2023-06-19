import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from '../services/database.js';

// formulario
const insertSql = "BEGIN FORMULARIOS_PKG.INSERTFORMULARIO(TO_DATE(:fecfor, 'YYYY-MM-DD'),:nifcon,:nomcon,:emacon,:telcon,:movcon,:reffor,:tipfor,:ejefor,:ofifor,:obsfor,:funfor,:liqfor,:stafor,:usumov,:tipmov,:idform); END;"
const updateSql = "BEGIN FORMULARIOS_PKG.UPDATEFORMULARIO(:idform,TO_DATE(:fecfor,'YYYY-MM-DD'),:nifcon,:nomcon,:emacon,:telcon,:movcon,:tipfor,:ejefor,:ofifor,:obsfor,:usumov,:tipmov); END;"
const removeSql = "BEGIN FORMULARIOS_PKG.DELETEFORMULARIO(:idform,:usumov,:tipmov ); END;"
const cambioSql = "BEGIN FORMULARIOS_PKG.CAMBIOESTADOFORMULARIO(:idform,:liqfor,:stafor,:usumov,:tipmov ); END;"
const unasignSql = "BEGIN FORMULARIOS_PKG.UNASIGNFORMULARIO(:idform,:liqfor,:stafor,:usumov,:tipmov ); END;"
const cierreSql = "BEGIN FORMULARIOS_PKG.CIERREFORMULARIO(:idform,:liqfor,:stafor,:usumov,:tipmov ); END;"
// sms
const insertSmsSql = "BEGIN FORMULARIOS_PKG.INSERTSMSFORMULARIO(:idform,:texsms,:movsms,:stasms,:usumov,:tipmov,:idsmss); END;"
const updateSmsSql = "BEGIN FORMULARIOS_PKG.UPDATESMS(:idsmss,:texsms,:movsms,:usumov,:tipmov); END;"
const removeSmsSql = "BEGIN FORMULARIOS_PKG.DELETESMSFORMULARIO(:idsmss,:usumov,:tipmov ); END;"
// referencias
const insertReferenciaSql = "BEGIN FORMULARIOS_PKG.INSERTREFERENCIA(:idform,:nifref,:desref,:tipref,:usumov,:tipmov,:idrefe); END;"
const updateReferenciaSql = "BEGIN FORMULARIOS_PKG.UPDATEREFERENCIA(:idrefe,:nifref,:desref,:tipref,:usumov,:tipmov); END;"
const removeReferenciaSql = "BEGIN FORMULARIOS_PKG.DELETEREFERENCIA(:idrefe,:usumov,:tipmov ); END;"
// ades
const asignarUsuarioSql = "BEGIN FORMULARIOS_PKG.ASIGNARUSUARIOS(:liqfor,:stafor,:arrfor,:usumov,:tipmov); END;"
const desAsignarUsuarioSql = "BEGIN FORMULARIOS_PKG.DESASIGNARUSUARIOS(:liqfor,:stafor,:arrfor,:usumov,:tipmov); END;"

// proc formulario
export const formulario = async (context) => {
  let query = "SELECT ff.*,oo.desofi,tt.destip FROM formularios ff INNER JOIN tipos tt ON tt.idtipo = ff.tipfor INNER JOIN oficinas oo ON oo.idofic = ff.ofifor"
  let bind = context

  if (context.IDFORM) {
    query += " WHERE ff.idform = :idform"
  } else if (context.REFFOR) {
    query += " WHERE ff.reffor = :reffor"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const formularios = async (context) => {
  // bind
  let query = "WITH datos AS (SELECT ff.*,oo.desofi,tt.destip FROM formularios ff INNER JOIN oficinas oo ON oo.idofic = ff.ofifor INNER JOIN tipos tt ON tt.idtipo = ff.tipfor"
  let bind = {
    liqfor: context.liquidador,
    stafor: context.estado,
    limit: context.limit,
  };

  if (context.part) {
    bind.part = context.part
    query += " AND (ff.nifcon LIKE '%' || :part || '%' OR ff.nomcon LIKE '%' || :part || '%' OR ff.ejefor LIKE '%' || :part || '%' OR ff.reffor LIKE '%' || :part || '%' OR ff.liqfor LIKE '%' || LOWER(:part) || '%' OR tt.destip LIKE '%' || :part || '%' OR oo.desofi LIKE '%' || :part || '%')"
  }
  if (context.rest) {
    bind.rest = context.rest
    query += " AND (ff.nifcon LIKE '%' || :rest || '%' OR ff.nomcon LIKE '%' || :rest || '%' OR ff.ejefor LIKE '%' || :rest || '%' OR ff.reffor LIKE '%' || :part || '%' OR ff.liqfor LIKE '%' || LOWER(:rest) || '%' OR tt.destip LIKE '%' || :rest || '%' OR oo.desofi LIKE '%' || :rest || '%')"
  }
  query += " WHERE (ff.liqfor = :liqfor AND ff.stafor = :stafor)"
  if (context.pendientes) {
    bind.ofifor = context.pendientes.oficina
    bind.estado = context.pendientes.estado
    query += " OR (ff.ofifor = :ofifor AND ff.stafor = :estado)"
  }
  if (context.direction === 'next') {
    bind.idform = context.cursor.next;
    query += ")SELECT * FROM datos WHERE idform > :idform ORDER BY idform ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idform = context.cursor.prev;
    query += ")SELECT * FROM datos WHERE idform < :idform ORDER BY idform DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const extended = async (context) => {
  // bind
  let query = "WITH datos AS (SELECT ff.*,oo.desofi,tt.destip FROM formularios ff INNER JOIN oficinas oo ON oo.idofic = ff.ofifor INNER JOIN tipos tt ON tt.idtipo = ff.tipfor"
  let bind = {
    limit: context.limit,
  };

  if (context.part) {
    bind.part = context.part
    query += " AND (ff.nifcon LIKE '%' || :part || '%' OR ff.nomcon LIKE '%' || :part || '%' OR ff.ejefor LIKE '%' || :part || '%' OR ff.reffor LIKE '%' || :part || '%' OR ff.liqfor LIKE '%' || LOWER(:part) || '%' OR tt.destip LIKE '%' || :part || '%' OR oo.desofi LIKE '%' || :part || '%')"
  }
  if (context.rest) {
    bind.rest = context.rest
    query += " AND (ff.nifcon LIKE '%' || :rest || '%' OR ff.nomcon LIKE '%' || :rest || '%' OR ff.ejefor LIKE '%' || :rest || '%' OR ff.reffor LIKE '%' || :rest || '%' OR ff.liqfor LIKE '%' || LOWER(:rest) || '%' OR tt.destip LIKE '%' || :rest || '%' OR oo.desofi LIKE '%' || :rest || '%')"
  }
  if (context.stafor) {
    bind.stafor = context.stafor
    query += " WHERE BITAND(ff.stafor, 2) = :stafor"
  } 
  if (context.liqfor) {
    bind.liqfor = context.liqfor
    if (context.stafor) {
      query += " AND ff.liqfor = :liqfor"
    } else {
      query += " WHERE ff.liqfor = :liqfor"
    }
  }
  if (context.direction === 'next') {
    bind.idform = context.cursor.next;
    query += ")SELECT * FROM datos WHERE idform > :idform ORDER BY idform ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idform = context.cursor.prev;
    query += ")SELECT * FROM datos WHERE idform < :idform ORDER BY idform DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const insert = async (context) => {
  // bind
  let bind = context
  bind.idform = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.idform = ret.outBinds.idform
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
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
}
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
}
export const change = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(cambioSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const unasing = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(unasignSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const close = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(cierreSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}

// proc sms
export const sms = async (context) => {
  // bind
  let query = "SELECT ss.* FROM smss ss"
  const bind = context

  if (context.IDFORM) {
    query += " INNER JOIN smssformulario sf ON sf.idsmss = ss.idsmss WHERE sf.idform = :idform"
  } else if (context.IDSMSS) {
    query += " WHERE ss.idsmss = :idsmss"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const smss = async (context) => {
  // bind
  let query = ""
  let bind = {
    idform: context.formulario,
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.idsmss = context.cursor.next;
    query = "SELECT ss.*,sf.idform FROM smss ss INNER JOIN smssformulario sf ON sf.idsmss = ss.idsmss AND sf.idform = :idform WHERE ss.idsmss > :idsmss AND (ss.movsms LIKE '%' || :part OR ss.fecsms LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY ss.idsmss ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idsmss = context.cursor.prev;
    query = "SELECT ss.*,sf.idform FROM smss ss INNER JOIN smssformulario sf ON sf.idsmss = ss.idsmss AND sf.idform = :idform WHERE ss.idsmss < :idsmss AND (ss.movsms LIKE '%' || :part OR ss.fecsms LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY ss.idsmss DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const insertSms = async (context) => {
  // bind
  let bind = context
  bind.idsmss = {
    dir: BIND_OUT,
    type: NUMBER,
  }


  // proc
  const ret = await simpleExecute(insertSmsSql, bind)

  if (ret) {
    bind.idsmss = ret.outBinds.idsmss
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const updateSms = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(updateSmsSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const removeSms = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeSmsSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}

// proc referencia
export const referencia = async (context) => {
  // bind
  let query = "SELECT rr.*,tt.destip FROM referencias rr INNER JOIN tipos tt ON tt.idtipo = rr.tipref"
  const bind = context

  if (context.IDFORM) {
    query += " INNER JOIN referenciasformulario rf ON rf.idrefe = rr.idrefe WHERE rf.idform = :idform"
  } 
  if (context.IDREFE) {
    query += " WHERE rr.idrefe = :idrefe"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const referencias = async (context) => {
  // bind
  let query = ""
  let bind = {
    idform: context.formulario,
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.idrefe = context.cursor.next;
    query = "SELECT rr.*,rf.idform,tt.destip FROM referencias rr INNER JOIN referenciasformulario rf ON rf.idrefe = rr.idrefe AND rf.idform = :idform INNER JOIN tipos tt ON tt.idtipo = rr.tipref WHERE rr.idrefe > :idrefe AND (rr.nifref LIKE '%' || :part || '%' OR rr.desref LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY rr.idrefe ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idrefe = context.cursor.prev;
    query = "SELECT rr.*,rf.idform,tt.destip FROM referencias rr INNER JOIN referenciasformulario rf ON rf.idrefe = rr.idrefe AND rf.idform = :idform INNER JOIN tipos tt ON tt.idtipo = rr.tipref WHERE rr.idrefe < :idrefe AND (rr.nifref LIKE '%' || :part || '%' OR rr.desref LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY rr.idrefe DESC FETCH NEXT :limit ROWS ONLY"
  }

  console.log(query,bind);
  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const insertReferencia = async (context) => {
  // bind
  let bind = context
  bind.idrefe = {
    dir: BIND_OUT,
    type: NUMBER,
  }

  // proc
  const ret = await simpleExecute(insertReferenciaSql, bind)
  
  if (ret) {
    bind.idrefe = ret.outBinds.idrefe
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const updateReferencia = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(updateReferenciaSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const removeReferencia = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeReferenciaSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}

// ades
export const asignarFormulariosUsuario = async (context) => {
  // bind
  let bind = context

  // proc
  const ret = await simpleExecute(asignarUsuarioSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const desAsignarFormulariosUsuario = async (context) => {
  // bind
  let bind = context

  // proc
  const ret = await simpleExecute(desAsignarUsuarioSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}