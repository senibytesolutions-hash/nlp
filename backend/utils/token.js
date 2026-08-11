import jwt from "jsonwebtoken";

const COOKIE_NAME = "nlp_admin_token";

/**
 * Signs a JWT for the given admin id and sets it as an httpOnly cookie.
 * httpOnly + sameSite storage keeps the token out of reach of client-side JS (XSS-safer
 * than localStorage) while still working across the Vite dev server / API split.
 */
export const generateTokenAndSetCookie = (res, adminId) => {
  const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

export const clearTokenCookie = (res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
};

export const COOKIE_NAME_EXPORT = COOKIE_NAME;
