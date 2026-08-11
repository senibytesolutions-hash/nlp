import Admin from "../models/Admin.js";
import { generateTokenAndSetCookie, clearTokenCookie } from "../utils/token.js";

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    generateTokenAndSetCookie(res, admin._id);

    res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      data: { id: admin._id, email: admin.email },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin logout
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  clearTokenCookie(res);
  res.status(200).json({ success: true, message: "Logged out successfully." });
};

// @desc    Get current authenticated admin (used for session persistence on page refresh)
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: { id: req.admin._id, email: req.admin.email },
  });
};
