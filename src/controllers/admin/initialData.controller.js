const Category = require('../../models/Category');
const Product = require('../../models/Product');

exports.initialData = async (req, res) => {
    try {
        const categories = await Category.find().select("-updatedAt -__v");
        const products = await Product.find().select("-createdAt -updatedAt -__v");
        res.status(200).json({
            categories,
            products
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}