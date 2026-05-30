const jwt = require("jsonwebtoken");
const User = require("../models/user");

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

            // Verify token using JWT_SECRET
            // If token is invalid or expired, jwt.verify throws an error
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // decoded contains payload stored during login
            // Example:
            // {
            //   id: "6857a8f...",
            //   iat: 1712345678,
            //   exp: 1712950478
            // }

            // Find user in MongoDB using ID from token
            // select("-password") removes password from returned data
            req.user = await User.findById(decoded.id).select("-password");

            // Pass control to next middleware/route
            next();

        } else {

            // No token was provided
            return res.status(401).json({
                message: "Not authorized, no token"
            });
        }

    } catch (error) {

        // Token invalid, expired, tampered with, etc.
        return res.status(401).json({
            message: "Not authorized, token failed"
        });
    }
};

// Export middleware so routes can use it
module.exports = { protect };