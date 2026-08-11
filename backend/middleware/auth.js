import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { COOKIE_NAME_EXPORT as COOKIE_NAME } from "../utils/token.js";

// Verifies the JWT cookie and attaches the authenticated admin to req.admin.
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.[COOKIE_NAME];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please log in.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-passwordHash");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please log in.",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session expired or invalid. Please log in again.",
    });
  }
};
