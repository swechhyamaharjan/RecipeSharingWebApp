import jwt from "jsonwebtoken"

const createToken = (res, _id, rememberMe = false) => {
  const expiresIn = rememberMe ? "30d" : "1d";
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: process.env.NODE_ENV !== "development" ? "None" : "Lax", // "None" for cross-site
    maxAge: rememberMe
      ? 30 * 24 * 60 * 60 * 1000
      : 24 * 60 * 60 * 1000,
  });
}

export default createToken;