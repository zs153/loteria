export const mainPage = async (req, res) => {
  const user = req.user;

  res.redirect('http://localhost:9000/auth')
};

export const logout = async (req, res) => {
  const options = {
    path: "/",
    sameSite: true,
    maxAge: 1,
    httpOnly: true,
  };

  res.clearCookie("x-access_token");
  res.cookie("auth", undefined, options);

  res.redirect('/')
};