import axios from "axios";
import {tiposMovimiento} from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post("http://localhost:8000/api/tipos", {});
    const datos = {
      tipos: result.data
    }

    res.render("admin/tipos", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  const tipo = {
    IDTIPO: 0,
    DESTIP: "",
    AYUTIP: "",
  };

  try {
    const datos = {
      tipo,
    };

    res.render("admin/tipos/add", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const editPage = async (req, res) => {
  const user = req.user;
  const tipo = {
    IDTIPO: req.params.id,
  }

  try {
    const result = await axios.post("http://localhost:8000/api/tipo", {
      tipo,
    });

    const datos = {
      tipo: result.data,
    };

    res.render("admin/tipos/edit", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const insertTipo = async (req, res) => {
  const user = req.user;
  const tipo = {
    DESTIP: req.body.destip.toUpperCase(),
    AYUTIP: req.body.ayutip,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearOficina,
  };

  try {
    await axios.post("http://localhost:8000/api/tipos/insert", {
      tipo,
      movimiento,
    });

    res.redirect("/admin/tipos");
  } catch (error) {
    let msg = "No se ha podido crear el tipo.";

    if (error.response.data.errorNum === 20100) {
      msg = "El tipo ya existe.";
    }

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const updateTipo = async (req, res) => {
  const user = req.user;
  const tipo = {
    IDTIPO: req.body.idtipo,
    DESTIP: req.body.destip,
    AYUTIP: req.body.ayutip,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarOficina,
  };

  try {
    axios.post("http://localhost:8000/api/tipos/update", {
      tipo,
      movimiento,
    });

    res.redirect("/admin/tipos");
  } catch (error) {
    let msg =
      "No se ha podido actualizar el tipo. Verifique los datos introducidos";

    if (error.response.data.errorNum === 20100) {
      msg = "El tipo ya existe";
    }

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const deleteTipo = async (req, res) => {
  const user = req.user;
  const tipo = {
    IDTIPO: req.body.idtipo,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarOficina,
  };

  try {
    await axios.post("http://localhost:8000/api/tipos/delete", {
      tipo,
      movimiento,
    });

    res.redirect("/admin/tipos");
  } catch (error) {
    const msg = "No se ha podido elminar el tipo.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
