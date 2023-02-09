import jwt from "jsonwebtoken";
// next allows our funciton to continue
export const verifyToken = async (req, res, next) => {
    try {
      let token = req.header("Authorization");
  
      if (!token) {
            // 403 status code indicates that a client is forbidden from accessing a valid URL
            return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
