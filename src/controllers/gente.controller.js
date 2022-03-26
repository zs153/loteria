import Gente from '../models/gente.model'

let gente = new Gente()

export const getGente = async (req, res) => {
  gente.nif = req.body.nifgen + '%'

  try {
    const { err, dat } = await gente.getGenteByNif()

    if (err) {
      res.status(403).json(err)
    } else {
      return res.status(200).json(dat)
    }
  } catch (error) {
    res.status(500).json({ err })
  }
}
