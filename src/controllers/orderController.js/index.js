const Order = require('../../models/Order');

exports.addOrder = async (req, res) => {
    try {
        req.body.user = req.user._id;
        const order = new Order(req.body);
        const newOrder = await order.save();
        return res.status(201).json({ newOrder });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .select("_id paymentStatus items")
            .populate("items.productId", "_id name productPictures");

        if (!orders) return res.json({});

        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}