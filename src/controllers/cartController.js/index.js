const Cart = require('../../models/Cart');

exports.addItemToCart = async (req, res) => {
    try {

        const _cart = await Cart.findOne({ user: req.user._id });

        if (_cart) {
            //updating the already existing cart
            const product = req.body.cartItems.product;
            const item = _cart.cartItems.find(c => c.product == product);
            if (item) {
                await Cart.findOneAndUpdate({ user: req.user._id, "cartItems.product": product }, {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                });
                return res.status(200).json({ message: "Cart Updated" });
            } else {
                await Cart.findOneAndUpdate({ user: req.user._id }, {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                });
                return res.status(200).json({ message: "New Item Added" });
            }

            // res.status(200).json({ message: _cart });
        } else {
            //creating a new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });

            await cart.save();

            return res.status(201).json({ cart });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}