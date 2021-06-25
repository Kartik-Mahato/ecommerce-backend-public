const Order = require('../../models/Order');

exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.updateOne(
            { _id: req.body.orderId, "orderStatus.status": req.body.status },
            {
                $set: {
                    "orderStatus.$": [{ status: req.body.status, date: new Date(), isCompleted: true }],
                },
            }
        )
        return res.status(201).json({ updatedOrder });

    } catch (error) {
        return res.status(500).json({ error })
    }
}

exports.getCustomerOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("items.productId", "name");
        if (orders) {
            return res.status(200).json({ orders });
        }
    } catch (error) {
        return res.status(500).json({ errror: error.message })
    }

}