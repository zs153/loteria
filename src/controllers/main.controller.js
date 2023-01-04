export const mainPage = async (req, res) => {
  const user = req.user;

  res.redirect('http://localhost:9000/auth')
};
