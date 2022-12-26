import * as DAL from "../models/referencia.model";

const insertFromRec = (req) => {
  const referencia = {
    fecref: req.body.referencia.FECREF,
    nifref: req.body.referencia.NIFREF,
    desref: req.body.referencia.DESREF,
    tipref: req.body.referencia.TIPREF,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };

  return Object.assign(referencia, movimiento);
};
const updateFromRec = (req) => {
  const referencia = {
    idrefe: req.body.referencia.IDREFE,
    fecref: req.body.referencia.FECREF,
    nifref: req.body.referencia.NIFREF,
    desref: req.body.referencia.DESREF,
    tipref: req.body.referencia.TIPREF,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };

  return Object.assign(referencia, movimiento);
};
const deleteFromRec = (req) => {
  const referencia = {
    idrefe: req.body.referencia.IDREFE,
  };
  const movimiento = {
    usumov: req.body.movimiento.USUMOV,
    tipmov: req.body.movimiento.TIPMOV,
  };

  return Object.assign(referencia, movimiento);
};

export const referencia = async (req, res) => {
  const context = req.body.referencia;

  try {
    const result = await DAL.find(context);

    if (result.length === 1) {
      return res.status(200).json(result[0]);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
export const referencias = async (req, res) => {
  const bind = req.body

  try {
    const result = await DAL.find(bind);

    if (result !== null) {
      res.status(200).json(result);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};

export const crear = async (req, res) => {
  try {
    const result = await DAL.insert(insertFromRec(req));

    if (result !== null) {
      res.status(200).json(result);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
export const modificar = async (req, res) => {
  try {
    const result = await DAL.update(updateFromRec(req));

    if (result !== null) {
      res.status(200).json(result);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
export const borrar = async (req, res) => {
  try {
    const result = await DAL.remove(deleteFromRec(req));

    if (result !== null) {
      res.status(200).json(result);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};