import axios from "axios";
import { tiposMovimiento } from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;
  const tipo = {}

  try {
    const result = await axios.post("http://localhost:8000/api/tipos", {
      tipo,
    });
    const datos = {
      tipos: JSON.stringify(result.data),
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

  try {
    res.render("admin/tipos/add", { user });
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
export const insert = async (req, res) => {
  const user = req.user;
  const tipo = {
    DESTIP: req.body.destip.toUpperCase(),
    AYUTIP: req.body.ayutip,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearTipo,
  };

  try {
    await axios.post("http://localhost:8000/api/tipos/insert", {
      tipo,
      movimiento,
    });

    res.redirect("/admin/tipos");
  } catch (error) {
    let msg = "No se ha podido crear el tipo.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const update = async (req, res) => {
  const user = req.user;
  const tipo = {
    IDTIPO: req.body.idtipo,
    DESTIP: req.body.destip.toUpperCase(),
    AYUTIP: req.body.ayutip,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarTipo,
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

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const remove = async (req, res) => {
  const user = req.user;
  const tipo = {
    IDTIPO: req.body.idtipo,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarTipo,
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
