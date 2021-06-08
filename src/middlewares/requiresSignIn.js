const jwt = require('jsonwebtoken');

exports.requiresSignIn = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);

    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verifiedUser._id;
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized user" });
    }

    next();
}