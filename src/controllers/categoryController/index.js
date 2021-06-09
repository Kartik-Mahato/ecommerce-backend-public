const slugify = require('slugify');

const Category = require('../../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const categoryObject = {
            name: req.body.name,
            slug: slugify(req.body.name)
        }
        if (req.body.parentId) {
            categoryObject.parentId = req.body.parentId;
        }

        const newCategory = new Category(categoryObject);

        const addedCategory = await newCategory.save();

        return res.status(201).json({ category: addedCategory });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getCategory = async (req, res) => {
    try {
        const categories = await Category.find().select('-updatedAt -__v');

        return res.status(200).json({ categories });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}