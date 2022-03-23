import Gente from "../models/gente.model";

let gente = new Gente();

export const getGente = async (req, res) => {
  gente.nif = req.body.nifgen + " 00";

  try {
    const { err, dat } = await gente.getGenteByNif();

    if (err) {
      res.status(403).json(err);
    } else {
      return res.status(202).json(gente);
    }
  } catch (error) {
    return res.status(404).json({ err });
  }
};
