const jwt = require('jsonwebtoken');

exports.requiresSignIn = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifiedUser;
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized user" });
    }
    // console.log(token);

    next();
}