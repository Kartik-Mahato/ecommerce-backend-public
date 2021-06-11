const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

exports.signup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already registered!!" });
        }
        if (password.length < 5) {
            return res.json({ message: "Password must be atleast 5 characters long." })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const _user = new User({
            firstname,
            lastname,
            password: hashedPassword,
            email,
            username: email.split("@")[0]
        });

        await _user.save();

        return res.status(201).json({
            message: "Registration Successfull...",
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
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User does not exists." });
        }

        //password checking
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(403).json({ message: "Incorrect Password." });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({
            message: "Login Success",
            token,
            userId: user._id
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
