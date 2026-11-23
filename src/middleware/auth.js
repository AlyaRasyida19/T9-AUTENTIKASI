
import jwt from "jsonwebtoken";

const butuhLogin = (req, res, next) => {
  const authorization = req.headers.authorization;

  // Memeriksa apakah token tersedia
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      code: "TOKEN_DIPERLUKAN",
      message: "Token diperlukan"
    });
  }

  // Mengambil token dari header Authorization
  const token = authorization.split(" ")[1];

  try {
    // Memverifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Menyimpan data pengguna ke request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      code: "TOKEN_TIDAK_VALID",
      message: "Token tidak valid"
    });
  }
};

export default butuhLogin;
