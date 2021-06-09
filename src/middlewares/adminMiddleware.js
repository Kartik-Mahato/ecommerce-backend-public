exports.adminMiddleware = async (req, res, next) => {
    // console.log(req.user.role);
    
    try {
        if (req.user.role !== 'admin') {
            return res.status(400).json({ message: "Access Denied" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}