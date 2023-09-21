const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                res.status(403).json('invalid token');
            } else {
                req.user = user;
                next(); // Continue processing the request
            }
        });
    } else {
        return res.status(401).json('you are not authenticated');
    }
}

const verifyTokenAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next();
        } else {
            res.status(403).json('not allowed');
        }
    });
}

const verifyTokenAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('not allowed');
        }
    });
}

module.exports = { verifyToken, verifyTokenAuth, verifyTokenAdmin };
