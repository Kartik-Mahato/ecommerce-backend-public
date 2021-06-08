const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {

    const { firstname, lastname, email, password } = req.body;
    try {
        const adminExist = await User.findOne({ email });
        if (adminExist) {
            return res.status(400).json({ message: "Admin already registered!!" });
        }
        if (password.length < 5) {
            return res.json({ message: "Password must be atleast 5 characters long." })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const _adminUser = new User({
            firstname,
            lastname,
            password: hashedPassword,
            email,
            username: Math.random().toString(),
            role: 'admin'
        });

        await _adminUser.save();

        return res.status(201).json({
            message: "Admin Registration Successfull...",
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

}

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await User.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: "Admin does not exists." });
        }

        //password checking
        const isPasswordCorrect = await bcrypt.compare(password, admin.password);

        if (!isPasswordCorrect) {
            return res.status(403).json({ message: "Incorrect Password." });
        }

        if (admin.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized..." })
        }

        const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({
            message: "Login Success",
            token,
            adminId: admin._id
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
