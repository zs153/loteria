import axios from "axios";
import jwt from "jsonwebtoken";
import {
  estadosDocumento,
  estadosSms,
  tiposMovimiento,
  tiposRol,
} from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;
  const documento = {
    LIQDOC: user.userID,
    STADOC: estadosDocumento.pendiente + estadosDocumento.asignado,
  };
  const verTodo = false

  try {
    const result = await axios.post("http://localhost:8000/api/formularios", {
      documento,
    });
    const datos = {
      documentos: JSON.stringify(result.data),
      estadosDocumento,
      tiposRol,
      verTodo,
    };

    res.render("admin/formularios", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const addPage = async (req, res) => {
  const user = req.user;
  const fecha = new Date();
  const documento = {
    STRFEC: fecha.toISOString().slice(0, 10),
    EJEFRA: fecha.getFullYear() - 1,
    OFIDOC: user.oficina,
    FUNDOC: user.userID,
    STADOC: estadosDocumento.pendiente,
  };

  try {
    const tipos = await axios.post("http://localhost:8000/api/tipos")
    const oficinas = await axios.post("http://localhost:8000/api/oficinas")
    const datos = {
      documento,
      tipos: tipos.data,
      oficinas: oficinas.data,
    }
console.log(datos)
    res.render("admin/formularios/add", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const editPage = async (req, res) => {
  const user = req.user;
  const documento = {
    IDDOCU: req.params.iddocu,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/formulario", {
      documento,
    });
    const datos = {
      documento: result.data,
      tiposRol,
    };

    res.render("admin/formularios/edit", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}

// otros
export const ejercicioPage = async (req, res) => {
  const user = req.user;
  const fecha = new Date();
  let documento = {
    IDDOCU: req.params.iddocu,
  };

  try {
    // fraude
    const result = await axios.post("http://localhost:8000/api/formulario", {
      documento,
    })

    documento = result.data
    documento.FECHA = fecha.toISOString().substring(0, 10)
    documento.EJEDOC = fecha.getFullYear()
    documento.FUNDOC = user.userID
    documento.LIQDOC = user.userID
    documento.STADOC = estadosDocumento.asignado

    const datos = {
      documento,
    };

    res.render("admin/formularios/ejercicio", { user, datos });
  } catch (error) {
    const msg =
      "No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const relacionPage = async (req, res) => {
  const user = req.user;
  const fecha = new Date();
  let documento = {
    IDDOCU: req.params.iddocu,
  };

  try {
    // formulario
    const result = await axios.post("http://localhost:8000/api/formulario", {
      documento,
    });

    documento = result.data
    documento.NIFCON = ''
    documento.NOMCON = ''
    documento.EMACON = ''
    documento.TELCON = ''
    documento.MOVCON = ''
    documento.OBSDOC = ''
    documento.EJEDOC = fecha.getFullYear()
    documento.FUNDOC = user.userID
    documento.LIQDOC = user.userID
    documento.STADOC = estadosDocumento.asignado

    const datos = {
      documento,
    };

    res.render("admin/formularios/relacion", { user, datos });
  } catch (error) {
    const msg =
      "No se ha podido acceder a los datos de la aplicación. Si persiste el error solicite asistencia.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}

// procs formulario
export const insert = async (req, res) => {
  const user = req.user;
  const referencia = "Z" + randomString(10, "1234567890YMGS");
  const documento = {
    FECDOC: req.body.fecdoc,
    NIFCON: req.body.nifcon.toUpperCase(),
    NOMCON: req.body.nomcon.toUpperCase(),
    EMACON: req.body.emacon,
    TELCON: req.body.telcon,
    MOVCON: req.body.movcon,
    REFDOC: referencia,
    TIPDOC: req.body.tipdoc,
    EJEDOC: req.body.ejedoc,
    OFIDOC: req.body.ofidoc,
    OBSDOC: req.body.obsdoc,
    FUNDOC: req.body.fundoc,
    LIQDOC: "PEND",
    STADOC: estadosDocumento.pendiente,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearFormulario,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/formularios/insert",
      {
        documento,
        movimiento,
      }
    );

    res.redirect("/admin/formularios");
  } catch (error) {
    let msg = "No se ha podido crear el documento.";

    if (error.response.data.errorNum === 20100) {
      msg = "El documento ya existe.";
    }

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const update = async (req, res) => {
  const user = req.user;
  const documento = {
    IDDOCU: req.body.idfrau,
    FECDOC: req.body.fecdoc,
    NIFCON: req.body.nifcon.toUpperCase(),
    NOMCON: req.body.nomcon.toUpperCase(),
    EMACON: req.body.emacon,
    TELCON: req.body.telcon,
    MOVCON: req.body.movcon,
    TIPDOC: req.body.tipdoc,
    EJEDOC: req.body.ejedoc,
    OFIDOC: req.body.ofidoc,
    OBSDOC: req.body.obsdoc,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarFormulario,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/formularios/update",
      {
        documento,
        movimiento,
      }
    );

    res.redirect("/admin/formularios");
  } catch (error) {
    let msg = "No se ha podido actualizar el documento.";

    if (error.response.data.errorNum === 20100) {
      msg = "El documento ya existe. Verifique los datos introducidos";
    }

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const remove = async (req, res) => {
  const user = req.user;
  const documento = {
    IDDOCU: req.body.iddocu,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarFormulario,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/formularios/delete",
      {
        documento,
        movimiento,
      }
    );

    res.redirect("/admin/formularios");
  } catch (error) {
    const msg = "No se ha podido elminar el documento.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const asignar = async (req, res) => {
  const user = req.user;
  let documento = {
    IDDOCU: req.body.iddocu,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/formulario", {
      documento,
    });

    documento = {
      IDDOCU: result.data.IDDOCU,
      LIQDOC: user.userID,
      STADOC: estadosDocumento.asignado,
    };
    const movimiento = {
      USUMOV: user.id,
      TIPMOV: tiposMovimiento.asignarFormulario,
    };

    if (result.data.STADOC === estadosDocumento.pendiente) {
      const result = await axios.post(
        "http://localhost:8000/api/fraudes/cambio",
        {
          documento,
          movimiento,
        }
      );

      res.redirect("/admin/formularios");
    }
  } catch (error) {
    const msg = "No se ha podido asignar el documento.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const resolver = async (req, res) => {
  const user = req.user;
  let documento = {
    IDDOCU: req.body.iddocu,
    LIQDOC: user.userID,
    STADOC: estadosDocumento.resuelto,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.resolverFormulario,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/formulario", {
      documento,
    });

    if (result.data.STADOC === estadosDocumento.asignado) {
      const result = await axios.post(
        "http://localhost:8000/api/formularios/resolver",
        {
          documento,
          movimiento,
        }
      );
    }

    res.redirect("/admin/fraudes");
  } catch (error) {
    const msg = "No se ha podido resolver el documento.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const unasignar = async (req, res) => {
  const user = req.user;
  const documento = {
    IDDOCU: req.body.iddocu,
    LIQDOC: "PEND",
    STADOC: estadosDocumento.pendiente,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.desasignarFormulario,
  };

  try {
    const resul = await axios.post("http://localhost:8000/api/formulario", {
      documento,
    });

    if (
      resul.data.STADOC === estadosDocumento.asignado ||
      resul.data.STADOC === estadosDocumento.resuelto
    ) {
      await axios.post("http://localhost:8000/api/formularios/unasignar", {
        documento,
        movimiento,
      });
    }

    res.redirect("/admin/fraudes");
  } catch (error) {
    const msg = "No se ha podido desasignar el documento.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const verTodo = async (req, res) => {
  const user = req.user;
  const documento = {
    LIQDOC: user.userID,
    STADOC: estadosDocumento.resuelto,
  };
  const verTodo = true;

  if (user.rol === tiposRol.admin) {
    delete documento.LIQDOC
  }

  try {
    const result = await axios.post("http://localhost:8000/api/formularios", {
      documento,
    });
    const datos = {
      documento: JSON.stringify(result.data),
      estadosDocumento,
      tiposRol,
      verTodo,
    };

    res.render("admin/formularios", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const sms = async (req, res) => {
  const user = req.user;
  const documento = {
    IDDOCU: req.body.iddocu,
  };
  const sms = {
    TEXSMS: req.body.texsms,
    MOVSMS: req.body.movsms,
    STASMS: estadosSms.pendiente,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearSms,
  };

  try {
    await axios.post("http://localhost:8000/api/sms/insert", {
      documento,
      sms,
      movimiento,
    });

    res.redirect("/admin/formularios");
  } catch (error) {
    const msg = "No se ha podido enviar el sms.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}

// procs otros
export const ejercicio = async (req, res) => {
  const user = req.user;
  const fecha = new Date()
  const documento = {
    FECDOC: fecha.toISOString().slice(0, 10),
    NIFCON: req.body.nifcon,
    NOMCON: req.body.nomcon,
    EMACON: req.body.emacon,
    TELCON: req.body.telcon,
    MOVCON: req.body.movcon,
    REFDOC: req.body.refdoc,
    TIPDOC: req.body.tipdoc,
    EJEDOC: req.body.ejedoc,
    OFIDOC: user.oficina,
    OBSDOC: req.body.obsdoc,
    FUNDOC: user.userID,
    LIQDOC: user.userID,
    STADOC: estadosDocumento.asignado,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.nuevoEjercicioFormularios,
  };

  try {
    await axios.post("http://localhost:8000/api/formularios/insert", {
      documento,
      movimiento,
    });

    res.redirect("/admin/formularios");
  } catch (error) {
    const msg = "No se ha podido insertar el nuevo ejercicio.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}
export const relacion = async (req, res) => {
  const user = req.user;
  const fecha = new Date()
  const documento = {
    FECDOC: fecha.toISOString().slice(0, 10),
    NIFCON: req.body.nifcon,
    NOMCON: req.body.nomcon,
    EMACON: req.body.emacon,
    TELCON: req.body.telcon,
    MOVCON: req.body.movcon,
    REFDOC: req.body.refdoc,
    TIPDOC: req.body.tipdoc,
    EJEDOC: req.body.ejedoc,
    OFIDOC: user.oficina,
    OBSDOC: req.body.obsdoc,
    FUNDOC: user.userID,
    LIQDOC: user.userID,
    STADOC: estadosDocumento.asignado,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.nuevoRelacionadoFormularios,
  };

  try {
    await axios.post("http://localhost:8000/api/formularios/insert", {
      documento,
      movimiento,
    });

    res.redirect("/admin/formularios");
  } catch (error) {
    const msg = "No se ha podido insertar el relacionado.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}

// helpers
function randomString(long, chars) {
  let result = "";

  for (let i = long; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}