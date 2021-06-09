const slugify = require('slugify');

const Category = require('../../models/Category');

exports.addCategory = async (req, res) => {
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
            children: createCategory(categories, cat._id)
        })
    }

    return categoryList;
};

exports.getCategory = async (req, res) => {
    try {
        const categories = await Category.find().select('-updatedAt -__v');

        const categoryList = createCategory(categories);

        // console.log(categoryList);
        return res.status(200).json({ categoryList });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}