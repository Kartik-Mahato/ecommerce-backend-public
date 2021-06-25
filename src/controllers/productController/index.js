const slugify = require('slugify');
const Product = require('../../models/Product');
const Category = require('../../models/Category');

exports.createProduct = async (req, res) => {
    // res.status(200).json({ file: req.files, body: req.body });
    try {
        const { name, price, description, category, quantity } = req.body;

        let productPictures = [];
        // console.log(req.body);

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

        return res.status(201).json({ product })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.getProductsBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const category = await Category.findOne({ slug }).select("_id type");
        if (!category) {
            return res.status(400).json({ message: 'No data found' });
        }

        const products = await Product.find({ category: category._id });
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }
        if (category.type) {
            if (products.length > 0) {
                return res.status(200).json({
                    products,
                    priceRange: {
                        under5k: 5000,
                        under10k: 10000,
                        under15k: 15000,
                        under20k: 20000,
                        under25k: 25000,
                        under30k: 30000
                    },
                    productsByPrice: {
                        under5k: products.filter(product => product.price <= 5000),
                        under10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                        under15k: products.filter(product => product.price > 10000 && product.price <= 15000)
                    }
                });
            }
        } else {
            return res.status(200).json({ products });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.getProductDetailsById = async (req, res) => {
    const { productId } = req.params;
    if (productId) {
        const productDetails = await Product.findOne({ _id: productId });
        if (productDetails) {
            return res.status(200).json({ productDetails });
        } else {
            return res.status(404).json({ message: 'No Product Details' });
        }
    } else {
        return res.status(400).json({ error: 'Not a valid request' });
    }
}

exports.deleteProductById = async (req, res) => {
    const productId = req.body.payload;

    try {
        const result = await Product.deleteOne({ _id: productId });
        return res.status(202).json({ result });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().select("_id name price quantity slug description productPictures category").populate({ path: "category", select: "_id name" });

        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ error });
    }
}