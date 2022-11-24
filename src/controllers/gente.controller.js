import * as DAL from "../models/gente.model";

export const gentes = async (req, res) => {
  const nifgen = req.body.nifgen;

  const gente = {
    nifgen,
  }

  if (nifgen.length > 9) {
    gente.disgen = nifgen.slice(-1);
  }

  try {
    const rows = await DAL.find(gente);

    if (rows.length === 1) {
      return res.status(200).json(rows[0]);
    } else {
      return res.status(200).json(rows);
    }
  } catch (err) {
    res.status(500).end();
  }
}
