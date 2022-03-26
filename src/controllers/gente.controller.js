import Gente from '../models/gente.model'

let gente = new Gente()

export const getGente = async (req, res) => {
  const nif = req.body.nifgen

  if (nif.length === 9) {
    gente.nif = nif
  } else {
    gente.nif = nif.slice(0, 9)
    gente.discrim = nif.slice(-1)
  }

  try {
    const { err, dat } =
      nif.length === 9
        ? await gente.getGenteByNif()
        : await gente.getGenteByNifDiscriminante()

    if (err) {
      res.status(403).json(err)
    } else {
      return res.status(200).json(dat)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
