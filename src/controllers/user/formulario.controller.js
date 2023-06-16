import axios from "axios";
import { estadosSms, tiposMovimiento, tiposRol, estadosDocumento } from "../../public/js/enumeraciones";
import { serverAPI,puertoAPI } from '../../config/settings'

// pages formulario
export const mainPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 9

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevs = cursor ? true : false
  let part = ''
  let rest = ''

  if (req.query.part) {
    const partes = req.query.part.split(',')

    part = partes[0].toUpperCase()
    if (partes.length > 1) {
      rest = partes[1].toUpperCase()
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formularios`, {
      context: {
        liquidador: user.userid,
        estado: estadosDocumento.asignado,
        pendientes: {oficina: user.oficina, estado: estadosDocumento.pendiente},
        limit: limit + 1,
        direction: dir,
        cursor: cursor ? JSON.parse(convertCursorToNode(JSON.stringify(cursor))) : {next: 0 , prev: 0},
        part,
        rest,
      },
    });

    let formularios = result.data.data
    let hasNexts = formularios.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNexts) {
      nextCursor = dir === 'next' ? formularios[limit - 1].IDFORM : formularios[0].IDFORM
      prevCursor = dir === 'next' ? formularios[0].IDFORM : formularios[limit - 1].IDFORM

      formularios.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : formularios[0]?.IDFORM
      prevCursor = dir === 'next' ? formularios[0]?.IDFORM : 0

      if (cursor) {
        hasNexts = nextCursor === 0 ? false : true
        hasPrevs = prevCursor === 0 ? false : true
      } else {
        hasNexts = false
        hasPrevs = false
      }
    }

    if (dir === 'prev') {
      formularios = formularios.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }

    const datos = {
      formularios,
      hasNexts,
      hasPrevs,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
      estadosDocumento,
    };

    res.render("user/formularios", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  const fecha = new Date();
  const formulario = {
    ISOFEC: fecha.toISOString().slice(0, 10),
    EJEFOR: fecha.getFullYear() - 1,
    OFIFOR: user.oficina,
    FUNFOR: user.userid,
  };

  try {
    const tipos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipo`, {
      context: {},
    })
    const oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficina`, {
      context: {
        IDOFIC: user.oficina,
      },
    })
    const datos = {
      formulario,
      tipos: tipos.data.data,
      oficinas: oficinas.data.data,
    };

    res.render("user/formularios/add", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const editPage = async (req, res) => {
  const user = req.user;

  try {
    const tipos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipo`, {
      context: {},
    })
    const oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficina`, {
      context: {},
    })
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formulario`, {
      context: {
        IDFORM: req.params.id,
      },
    });

    let formulario = result.data.data[0]
    formulario.FECFOR = formulario.FECFOR.slice(0, 10)
    const datos = {
      formulario,
      tipos: tipos.data.data,
      oficinas: oficinas.data.data,
      tiposRol,
    };

    res.render("user/formularios/edit", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const resolverPage = async (req, res) => {
  const user = req.user;
  
  try {
    const tipos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/tipo`, {
      context: {},
    });
    const formulario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formulario`, {
      context: {
        IDFORM: req.params.id,
      },
    });
    const datos = {
      formulario: formulario.data.data[0],
      tipos: tipos.data.data,
      hayLiquidacion,
    };

    res.render("user/formularios/resolver", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const resueltosPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 9

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevs = cursor ? true : false
  let part = ''
  let rest = ''

  if (req.query.part) {
    const partes = req.query.part.split(',')

    part = partes[0].toUpperCase()
    if (partes.length > 1) {
      rest = partes[1].toUpperCase()
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formularios`, {
      context: {
        liquidador: user.userid,
        estado: estadosDocumento.resuelto,
        limit: limit + 1,
        direction: dir,
        cursor: cursor ? JSON.parse(convertCursorToNode(JSON.stringify(cursor))) : {next: 0 , prev: 0},
        part,
        rest,
      },
    });

    let formularios = result.data.data
    let hasNexts = formularios.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNexts) {
      nextCursor = dir === 'next' ? formularios[limit - 1].IDFORM : formularios[0].IDFORM
      prevCursor = dir === 'next' ? formularios[0].IDFORM : formularios[limit - 1].IDFORM

      formularios.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : formularios[0]?.IDFORM
      prevCursor = dir === 'next' ? formularios[0]?.IDFORM : 0

      if (cursor) {
        hasNexts = nextCursor === 0 ? false : true
        hasPrevs = prevCursor === 0 ? false : true
      } else {
        hasNexts = false
        hasPrevs = false
      }
    }

    if (dir === 'prev') {
      formularios = formularios.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }

    const datos = {
      formularios,
      hasNexts,
      hasPrevs,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
      estadosDocumento,
    };

    res.render("user/formularios/resueltos", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};

// pages sms
export const smssPage = async (req, res) => {
  const user = req.user;

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 9
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevSms = cursor ? true : false
  let context = {}

  if (cursor) {
    context = {
      formulario: req.params.id,
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      formulario: req.params.id,
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: 0,
        prev: 0,
      },
      part,
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formularios/smss`, {
      context,
    })

    let smss = result.data.data
    let hasNextSms = smss.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNextSms) {
      nextCursor = dir === 'next' ? smss[limit - 1].IDSMSS : smss[0].IDSMSS
      prevCursor = dir === 'next' ? smss[0].IDSMSS : smss[limit - 1].IDSMSS

      smss.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : smss[0]?.IDSMSS
      prevCursor = dir === 'next' ? smss[0]?.IDSMSS : 0

      if (cursor) {
        hasNextSms = nextCursor === 0 ? false : true
        hasPrevSms = prevCursor === 0 ? false : true
      } else {
        hasNextSms = false
        hasPrevSms = false
      }
    }

    if (dir === 'prev') {
      smss = smss.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }

    const formulario = {
      IDFORM: req.params.id,
    };
    const datos = {
      formulario,
      smss,
      hasNextSms,
      hasPrevSms,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),      
      estadosSms,
    }

    res.render("user/formularios/smss", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const smssAddPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formulario`, {
      context: {
        IDFORM: req.params.id,
      },
    });
    const formulario = result.data.data[0]
    const sms = {
      MOVSMS: formulario.MOVCON,
    }
    const datos = {
      formulario,
      sms,
    };

    res.render("user/formularios/smss/add", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const smssEditPage = async (req, res) => {
  const user = req.user;
  const formulario = {
    IDFORM: req.params.idfra,
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formularios/sms`, {
      context: {
        IDSMSS: req.params.idsms,
      },
    });
    const sms = result.data.data[0]
    const datos = {
      formulario,
      sms,
    };

    res.render("user/formularios/smss/edit", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const smssReadonlyPage = async (req, res) => {
  const user = req.user;
  const formulario = {
    IDFORM: req.params.id,
  };

  try {
    const smss = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formularios/sms`, {
      context: {
        IDFORM: req.params.id,
      },
    })

    const datos = {
      formulario,
      smss: smss.data.data,
      estadosSms,
    }

    res.render("user/formularios/smss/readonly", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// pages otros
export const addReferenciasPage = async (req, res) => {
  const user = req.user;
  const fecha = new Date();

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formulario`, {
      context: {
        IDFORM: req.params.id,
      },
    });

    let formulario = result.data.data[0]
    formulario.EJEFOR = fecha.getFullYear()

    const datos = {
      formulario,
    };

    res.render("user/formularios/referencias/add", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};

// procs formulario
export const insert = async (req, res) => {
  const user = req.user;
  const referencia = "W" + randomString(10, "1234567890YMGS");
  const formulario = {
    FECFOR: req.body.fecfor,
    NIFCON: req.body.nifcon.toUpperCase(),
    NOMCON: req.body.nomcon.toUpperCase(),
    EMACON: req.body.emacon,
    TELCON: req.body.telcon,
    MOVCON: req.body.movcon,
    REFFOR: referencia,
    TIPFRA: req.body.tipfor,
    EJEFOR: req.body.ejefor,
    OFIFOR: req.body.ofifor,
    OBSFOR: req.body.obsfor,
    FUNFOR: req.body.funfor,
    LIQFOR: user.userid,
    STAFOR: estadosDocumento.asignado,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearFormulario,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/formularios/insert`, {
      formulario,
      movimiento,
    });

    res.redirect(`/user/formularios?part=${req.query.part}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const update = async (req, res) => {
  const user = req.user;
  const formulario = {
    IDFORM: req.body.idform,
    FECFOR: req.body.fecfor,
    NIFCON: req.body.nifcon.toUpperCase(),
    NOMCON: req.body.nomcon.toUpperCase(),
    EMACON: req.body.emacon,
    TELCON: req.body.telcon,
    MOVCON: req.body.movcon,
    TIPFRA: req.body.tipfor,
    EJEFOR: req.body.ejefor,
    OFIFOR: req.body.ofifor,
    OBSFOR: req.body.obsfor,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarFormulario,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/formularios/update`, {
      formulario,
      movimiento,
    });

    res.redirect(`/user/formularios?part=${req.query.part}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const remove = async (req, res) => { 
  const user = req.user;
  const formulario = {
    IDFORM: req.body.idform,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarFormulario,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formulario`, {
      context: {
        IDFORM: req.body.idform,
      }
    });

    if (result.data.stat) {
      if (result.data.data[0].FUNFOR === user.userid) {
        await axios.post(`http://${serverAPI}:${puertoAPI}/api/formularios/delete`, {
          formulario,
          movimiento,
        });
    
        res.redirect(`/user/formularios?part=${req.query.part}`);
      } else {
        throw "El documento no puede ser borrado."
      }
    } else {
      throw "El documento no existe."
    }
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const asignar = async (req, res) => {
  const user = req.user;
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.asignarFormulario,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formulario`, {
      context: {
        IDFORM: req.body.idform,
      },
    });

    let formulario = result.data.data[0]
    if (formulario.STAFOR === estadosDocumento.pendiente) {
      formulario.LIQFOR = user.userid
      formulario.STAFOR = estadosDocumento.asignado
        
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/formularios/asign`, {
        formulario,
        movimiento,
      });
    }

    res.redirect(`/user/formularios?part=${req.query.part}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const resolver = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formulario`, {
      context: {
        IDFORM: req.body.idform,
      },
    });

    if (result.data.data[0].STAFOR === estadosDocumento.asignado) {
      const formulario = {
        IDFORM: req.body.idform,
        LIQFOR: user.userid,
        STAFOR: estadosDocumento.resuelto
      }
      const movimiento = {
        USUMOV: user.id,
        TIPMOV: tiposMovimiento.resolverFraude,
      };
    
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/formularios/cierre`, {
        formulario,
        movimiento,
      });
    }

    res.redirect(`/user/formularios?part=${req.query.part}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const desasignar = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formulario`, {
      context : {
        IDFORM: req.body.idform,
      },
    });

    let formulario = result.data.data[0]
    if (formulario.STAFOR === estadosDocumento.asignado) {
      formulario.LIQFOR = "PEND"
      formulario.STAFOR = estadosDocumento.pendiente

      const movimiento = {
        USUMOV: user.id,
        TIPMOV: tiposMovimiento.desasignarFraude,
      };

      await axios.post(`http://${serverAPI}:${puertoAPI}/api/formularios/unasign`, {
        formulario,
        movimiento,
      });
    }

    res.redirect(`/user/formularios?part=${req.query.part}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};

// proc referencia
export const insertReferencia = async (req, res) => {
  const user = req.user;
  const referencia = {
    NIFREF: req.body.nifref,
    DESREF: req.body.desref,
    TIPREF: req.body.tipref,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearEjercicio,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/formularios/referencias/insert`, {
      referencia,
      movimiento,
    });

    res.redirect(`/user/formularios?part=${req.query.part}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};

// proc sms
export const insertSms = async (req, res) => {
  const user = req.user;
  const fecha = new Date()
  const formulario = {
    IDFORM: req.body.idform,
  }
  const sms = {
    FECSMS: fecha.toISOString().substring(0, 10),
    TEXSMS: req.body.texsms,
    MOVSMS: req.body.movsms,
    STASMS: estadosSms.pendiente,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearSms,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/formularios/smss/insert`, {
      formulario,
      sms,
      movimiento,
    });

    res.redirect(`/user/formularios/smss/${formulario.IDFORM}?part=${getCookie('filtro')}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const updateSms = async (req, res) => {
  const user = req.user;
  const formulario = {
    IDFORM: req.body.idform,
  }
  const sms = {
    IDSMSS: req.body.idsmss,
    FECSMS: new Date().toISOString().slice(0, 10),
    TEXSMS: req.body.texsms,
    MOVSMS: req.body.movsms,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarSms,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/formularios/smss/update`, {
      sms,
      movimiento,
    });

    res.redirect(`/user/formularios/smss/${formulario.IDFORM}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const removeSms = async (req, res) => {
  const user = req.user;
  const formulario = {
    IDFORM: req.body.idform,
  }
  const sms = {
    IDSMSS: req.body.idsmss,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarSms,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/formularios/smss/delete`, {
      formulario,
      sms,
      movimiento,
    });

    res.redirect(`/user/formularios/smss/${formulario.IDFORM}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// helpers
const convertNodeToCursor = (node) => {
  return new Buffer.from(node, 'binary').toString('base64')
}
const convertCursorToNode = (cursor) => {
  return new Buffer.from(cursor, 'base64').toString('binary')
}
const randomString = (long, chars) => {
  let result = "";
  for (let i = long; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
