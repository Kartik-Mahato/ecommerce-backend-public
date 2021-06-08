const User = require('../models/User');

exports.profile = async (req, res) => {
    const _id = req.params.id;
    // console.log(_id);
    const authUserId = req.userId;
    try {
        if (authUserId !== _id) {
            return res.json({ message: "Unauthorized" });
        }

        const user = await User.findOne({ _id }).select("-password -updatedAt -__v");
        // console.log(_user.fullName);

        return res.status(200).json({ userData: { user, fullName: user.fullName } });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}