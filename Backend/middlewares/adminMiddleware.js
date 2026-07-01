// This middleware checks if user is ADMIN

const adminOnly = (req, res, next) => {

  // req.user comes from JWT middleware
  // we check role

  // safety check
  if (!req.user) {
    return res.status(401).json({
      msg: "Not authorized"
    });
  }

  if (!req.user.role) {
    return res.status(401).json({
      msg: "User role missing"
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      msg: "Admin access only"
    });
  }

  // if admin → allow next function
  next();
};

module.exports = adminOnly;