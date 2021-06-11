const slugify = require('slugify');
const Product = require('../../models/Product');

exports.createProduct = async (req, res) => {
    // res.status(200).json({ file: req.files, body: req.body });
    try {
        const { name, price, description, category, quantity } = req.body;

        let productPictures = [];
        console.log(req.body);
        
        if (req.files.length > 0) {
            productPictures = req.files.map(file => {
                return { img: file.filename };
            })
        }

        const product = new Product({
            name,
            slug: slugify(name),
            price,
            description,
            productPictures,
            category,
            createdBy: req.user._id,
            quantity
        });

        await product.save();

        return res.status(200).json({ product })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}