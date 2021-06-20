const Cart = require('../../models/Cart');

function runUpdate(condition, updateData) {
    return new Promise((resolve, reject) => {

        Cart.findOneAndUpdate(condition, updateData, { upsert: true })
            .then(result => resolve())
            .catch(err => reject(err))
    })
}

exports.addItemToCart = async (req, res) => {
    try {

        const _cart = await Cart.findOne({ user: req.user._id });

        if (_cart) {
            //updating the already existing cart
            let promiseArray = [];
            const product = req.body.cartItems.forEach(cartItem => {
                const product = cartItem.product;
                const item = _cart.cartItems.find(c => c.product == product);
                let condition, update;
                if (item) {
                    condition = { "user": req.user._id, "cartItems.product": product };
                    update = {
                        "$set": {
                            "cartItems.$": cartItem
                        }
                    }
                } else {
                    condition = { user: req.user._id };
                    update = {
                        "$push": {
                            "cartItems": cartItem
                        }
                    }
                }
                promiseArray.push(runUpdate(condition, update));
            });
            Promise.all(promiseArray)
                .then(response => res.status(201).json({ response }))
                .catch(error => res.status(400).json({ error }))
        } else {
            //creating a new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: req.body.cartItems
            });
            await cart.save();
            return res.status(201).json({ cart });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getCartItems = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product', '_id name price productPictures');
        if (cart) {
            let cartItems = {};
            cart.cartItems.forEach((item, index) => {
                cartItems[item.product._id.toString()] = {
                    _id: item.product._id,
                    name: item.product.name,
                    img: item.product.productPictures[0].img,
                    price: item.product.price,
                    qty: item.quantity
                }
            })

            return res.status(200).json({ cartItems })
        } else {
            return res.json({ message: "Nothing Found" })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}