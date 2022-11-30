const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log(authorization)
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.slice(7);
    try {
      const payLoad = jwt.verify(token, "backend-secret");
      req.userData = payLoad;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: err.message,
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "unauthorized",
    });
  }
};

module.exports = authMiddleware;
