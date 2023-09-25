const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).send({ message: "Unauthorized" });
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const userId = decodedToken._id;

    req.user = { _id: userId };

    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
