import axios from "axios";
import bcrypt from "bcrypt";
import { tiposMovimiento } from "../public/js/enumeraciones";

// pages
export const loginPage = async (req, res) => {
  res.render("log/sign-in", { datos: {}, alerts: undefined });
};
export const forgotPage = async (req, res) => {
  res.render("log/forgot", { datos: {}, alerts: undefined });
};
export const okPage = async (req, res) => {
  res.render("log/ok");
};

// procs
export const verifyLogout = async (req, res) => {
  const options = {
    path: "/",
    sameSite: true,
    maxAge: 1,
    httpOnly: true,
  };

  res.clearCookie("x-access_token");
  res.cookie("auth", undefined, options);

  res.render("log/logout");
};
export const forgotPassword = async (req, res) => {
  const randomString = Math.random().toString(36).substring(2, 10);
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(randomString, salt);
  const usuario = {
    EMAUSU: req.body.emausu,
    PWDUSU: passHash,
    SALTUS: randomString,
  };
  const movimiento = {
    USUMOV: 'SYSTEM',
    TIPMOV: tiposMovimiento.olvidoPassword,
  };

  try {
    await axios.post("http://localhost:8000/api/usuarios/forgot", {
      usuario,
      movimiento,
    });

    res.render("log/okForgot");
  } catch (error) {
    const msg = "No se ha podido generar una nueva contraseña";

    res.render("log/sign-in", {
      datos: req.body,
      alerts: [{ msg }],
    });
  }
};
export const auth = async (req, res) => {
  let usuario = {
    USERID: req.body.userid.toLowerCase(),
    PWDUSU: req.body.pwdusu,
  }

  try {
    const result = await axios.post("http://localhost:8000/api/auth", {
      usuario,
    });

    if (result.data) {
      const token = result.data
      const options = {
        path: "/",
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 6, // 6 horas
        httpOnly: true,
      };

      res.cookie("auth", token, options);
      res.redirect("/admin");
    } else {
      res.render("log/sign-in", {
        datos: req.body,
        alerts: [{ msg: "El userID o la contraseña no son correctas" }],
      })
    }
  } catch (error) {
    res.render("log/sign-in", {
      datos: req.body,
      alerts: [{ msg: "No se ha podido verificar la identidad del usuario" }],
    });
  }
};