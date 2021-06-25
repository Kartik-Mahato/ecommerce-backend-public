const Order = require('../../models/Order');
const Cart = require('../../models/Cart');
const UserAddress = require('../../models/Address');

exports.addOrder = async (req, res) => {
    try {
        const deleteCart = await Cart.deleteOne({ user: req.user._id });
        if (deleteCart) {
            req.body.user = req.user._id;
            req.body.orderStatus = [
                {
                    status: "ordered",
                    date: new Date(),
                    isCompleted: true
                },
                {
                    status: "packed",
                    isCompleted: false
                },
                {
                    status: "shipped",
                    isCompleted: false
                },
                {
                    status: "delivered",
                    isCompleted: false
                }
            ];
            const order = new Order(req.body);
            const newOrder = await order.save();
            return res.status(201).json({ newOrder });
        }
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

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.body.orderId }).populate("items.productId", "_id name productPictures").lean();
        if (order) {
            const address = await UserAddress.findOne({ user: req.user._id });
            if (address) {
                order.address = address.address.find(adr => adr._id.toString() === order.addressId.toString());
                return res.status(200).json({
                    order
                });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}