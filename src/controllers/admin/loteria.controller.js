import axios from "axios";
import { tiposMovimiento, estadosLoteria } from "../../public/js/enumeraciones";
import { serverAPI,puertoAPI } from '../../config/settings'

// pages loteria
export const mainPage = async (req, res) => {
  const user = req.user
  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 9

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevs = cursor ? true : false
  let part = ''

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/loterias`, {
      context: {
        limit: limit + 1,
        direction: dir,
        cursor: cursor ? JSON.parse(convertCursorToNode(JSON.stringify(cursor))) : {next: 0 , prev: 0},
        part,
      },
    });

    let loterias = result.data.data
    let hasNexts = loterias.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNexts) {
      nextCursor = dir === 'next' ? loterias[limit - 1].IDLOTE : loterias[0].IDLOTE
      prevCursor = dir === 'next' ? loterias[0].IDLOTE : loterias[limit - 1].IDLOTE

      loterias.pop()
    } else {
      nextCursor = dir === 'next' ? 0 : loterias[0]?.IDLOTE
      prevCursor = dir === 'next' ? loterias[0]?.IDLOTE : 0

      if (cursor) {
        hasNexts = nextCursor === 0 ? false : true
        hasPrevs = prevCursor === 0 ? false : true
      } else {
        hasNexts = false
        hasPrevs = false
      }
    }

    if (dir === 'prev') {
      loterias = loterias.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }

    const datos = {
      loterias,
      hasNexts,
      hasPrevs,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
      estadosLoteria,
    };

    res.render("admin/loterias", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const editPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/loteria`, {
      context: {
        IDLOTE: req.params.id,
      },
    });

    let loteria = result.data.data[0]
    loteria.FECLOT = loteria.FECLOT.slice(0, 10)
    const datos = {
      loteria,
    };

    res.render("admin/loterias/edit", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const changePage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/loteria`, {
      context: {
        IDLOTE: req.params.id,
      },
    });

    const loteria = result.data.data[0]
    const datos = {
      loteria,
    };

    res.render("admin/loterias/change", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const readonlyPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/loteria`, {
      context: {
        IDLOTE: req.params.id,
      },
    })

    let loteria = result.data.data[0]
    loteria.FECLOT = loteria.FECLOT.slice(0,10).split('-').reverse().join('/')
    const datos = {
      loteria,
    }

    res.render("admin/loterias/readonly", { user, datos });
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// procs loteria
export const update = async (req, res) => {
  const user = req.user;
  const loteria = {
    IDLOTE: req.body.idlote,
    DECLOT: req.body.declot,
    USULOT: req.body.usulot,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarLoteria,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/loterias/update`, {
      loteria,
      movimiento,
    });

    res.redirect(`/admin/loterias?part=${req.query.part}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const remove = async (req, res) => { 
  const user = req.user;
  const loteria = {
    IDLOTE: req.body.idlote,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarLoteria,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/loteria`, {
      context: {
        IDLOTE: req.body.idlote,
      }
    });

    if (result.data.stat) {
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/loterias/delete`, {
        loteria,
        movimiento,
      });
  
      res.redirect(`/admin/loterias?part=${req.query.part}`);
    } else {
      throw "El documento no existe."
    }
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};
export const change = async (req, res) => {
  const user = req.user;

  try {
    const loteria = { 
      IDLOTE: req.body.idlote,
      STALOT: req.body.stalot,
    }
    const movimiento = {
      USUMOV: user.id,
      TIPMOV: tiposMovimiento.resolverloteria,
    };

    await axios.post(`http://${serverAPI}:${puertoAPI}/api/loterias/change`, {
      loteria,
      movimiento,
    });

    res.redirect(`/admin/loterias?part=${req.query.part}`);
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
};

// helpers
const convertNodeToCursor = (node) => {
  return new Buffer.from(node, 'binary').toString('base64')
}
const convertCursorToNode = (cursor) => {
  return new Buffer.from(cursor, 'base64').toString('binary')
}
