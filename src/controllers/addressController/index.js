const UserAddress = require('../../models/Address');

exports.addAddress = async (req, res) => {
    const { payload } = req.body;
    try {
        if (payload.address) {
            const address = await UserAddress.findOneAndUpdate({ user: req.user._id }, {
                "$push": {
                    "address": payload.address
                }
            }, { new: true, upsert: true });

            if (!address) {
                return res.status(400).json({ message: 'No data found' })
            }
            res.status(201).json({ address });
        } else {
            return res.status(400).json({ message: 'Params address required' })
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
}

exports.getAddress = async (req, res) => {
    try {
        const userAddress = await UserAddress.findOne({ user: req.user._id });
        if (!userAddress) {
            return res.status(404).json({ message: 'No data found' });
        }
        return res.status(200).json({ userAddress });
    } catch (error) {
        return res.status(500).json({ error })
    }
}