import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not authorized Login Again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // extract the id from token and and attach to the req.body.userId
    // This req.body.userId can then use to access other properties in user table.
    req.body.userId = token_decode.id;
    // next(); Pass control to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;
