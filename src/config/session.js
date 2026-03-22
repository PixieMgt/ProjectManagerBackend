module.exports = {
  password: process.env.SESSION_SECRET,
  cookieName: "projectmanager_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  },
};
