const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Club = require("../models/Club"); // <-- Added

// Middleware to protect routes
// Only users with a valid JWT token can access routes using this middleware
const protect = async (req, res, next) => {
    try {

        // Variable to store token
        let token;

        // Check if Authorization header exists
        // Example:
        // Authorization: Bearer eyJhbGciOiJIUzI1Ni...
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            // Extract token from:
            // "Bearer abc.xyz.123"
            // Result -> "abc.xyz.123"
            token = req.headers.authorization.split(" ")[1];

            // FIX: token missing check
            if (!token) {
                return res.status(401).json({
                    message: "Not authorized, token missing"
                });
            }

            // Verify token using JWT_SECRET
            // If token is invalid or expired, jwt.verify throws an error
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // FIX: decoded id safety check
            if (!decoded || !decoded.id) {
                return res.status(401).json({
                    message: "Invalid token payload"
                });
            }

            let account;

            // ================= CLUB LOGIN =================
            if (decoded.role === "club") {

                account = await Club.findById(decoded.id).select("-password");

                if (!account) {
                    return res.status(401).json({
                        message: "Club not found"
                    });
                }

                account = account.toObject();
                account.role = "club";
            }

            // ================= USER LOGIN =================
            else {

                account = await User.findById(decoded.id).select("-password");

                if (!account) {
                    return res.status(401).json({
                        message: "User not found"
                    });
                }

                account = account.toObject();
                account.role = account.role || "student";
            }

            req.user = account;

            // Pass control to next middleware/route
            next();

        } else {

            // No token was provided
            return res.status(401).json({
                message: "Not authorized, no token"
            });
        }

    } catch (error) {

        console.log("AUTH ERROR:", error);

        // Token invalid, expired, tampered with, etc.
        return res.status(401).json({
            message: "Not authorized, token failed"
        });
    }
};

// Export middleware so routes can use it
module.exports = { protect };