const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    // check if the authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    // check if the authorization header is in the correct format
    const authHeaderParts = authHeader.split(' ');
    if (authHeaderParts.length !== 2 || authHeaderParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Authorization header format is incorrect' });
    }

    // verify the JWT token
    const token = authHeaderParts[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        // attach the decoded token to the request object
        req.user = decodedToken;
        next();
    });
}


const createTokenAccordingToRole = (user) => {
    return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET_KEY)
};

const checkAdminAccess = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied.' });
    }
    // If the user has admin role, continue to the next middleware or route handler
    next();
};

const checkUserAccess = (req, res, next) => {
    if (req.user.role !== 'User') {
        return res.status(403).json({ message: 'Access denied.' });
    }
    // If the user has admin role, continue to the next middleware or route handler
    next();
};


module.exports = {
    authMiddleware: authMiddleware,
    createTokenAccordingToRole: createTokenAccordingToRole,
    checkAdminAccess,
    checkUserAccess
};