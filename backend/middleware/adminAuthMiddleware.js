import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

const adminAuthMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not authorized. Login Again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(token_decode.id);
    if (!admin) {
      return res.json({ success: false, message: "Admin not found" });
    }
    req.body.adminId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default adminAuthMiddleware;
