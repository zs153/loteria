import * as DAL from "../models/gente.model";

export const gente = async (req, res) => {
  let context = {
    nifgen: req.body.NIFGEN,
  }

  if (context.nifgen.length > 9) {
    context.disgen = context.nifgen.slice(-1);
    context.nifgen = context.nifgen.slice(0, 9);
  }

  try {
    const rows = await DAL.find(context);

    if (rows.length === 1) {
      return res.status(200).json(rows[0]);
    } else {
      return res.status(200).json(rows);
    }
  } catch (err) {
    res.status(500).end();
  }
}