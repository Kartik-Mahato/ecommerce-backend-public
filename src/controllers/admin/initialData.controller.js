const Category = require('../../models/Category');
const Product = require('../../models/Product');

exports.initialData = async (req, res) => {
    try {
        const categories = await Category.find().select("-updatedAt -__v");
        const products = await Product.find().select("-createdAt -updatedAt -__v");
        res.status(200).json({
            categories: createCategory(categories),
            products
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

function createCategory(categories, parentId = null) {
    const categoryList = [];
    let category;

    if (parentId === null) {
        category = categories.filter(category => category.parentId == undefined);
    } else {
        category = categories.filter(category => category.parentId == parentId);
    }

    for (let cat of category) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            children: createCategory(categories, cat._id)
        })
    }

    return categoryList;
};