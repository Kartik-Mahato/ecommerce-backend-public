const slugify = require('slugify');
const shortid = require('shortid');

const Category = require('../../models/Category');

exports.addCategory = async (req, res) => {
    try {
        const categoryObject = {
            name: req.body.name,
            slug: `${slugify(req.body.name)}-${shortid.generate()}`
        }

        if (req.file) {
            categoryObject.categoryImage = `${process.env.API}public/` + req.file.filename;
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

        const categoryList = createCategory(categories);

        // console.log(categoryList);
        return res.status(200).json({ categoryList });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { _id, name, parentId, type } = req.body;

        const updatedCategories = []
        if (name instanceof Array) {
            for (let i = 0; i < name.length; i++) {
                const category = {
                    name: name[i],
                    type: type[i],
                    slug: slugify(name[i])
                };
                if (parentId[i] !== "") {
                    category.parentId = parentId[i];
                }

                const updatedCategory = await Category.findOneAndUpdate({ _id: _id[i] }, category, { new: true });
                updatedCategories.push(updatedCategory);
            }
            return res.status(201).json({ updatedCategories });
        } else {
            const category = {
                name,
                type,
                slug: slugify(name)
            };
            if (parentId !== "") {
                category.parentId = parentId;
            }
            const updatedCategory = await Category.findOneAndUpdate({ _id }, category, { new: true });

            return res.status(201).json({ updatedCategory })
        }
        // res.status(200).json({ body: req.body })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.deleteCategory = async (req, res) => {
    const { ids } = req.body.payload;
    const deletedCategories = [];
    try {
        for (let i = 0; i < ids.length; i++) {
            const deletedCategory = await Category.findOneAndDelete({ _id: ids[i]._id });
            deletedCategories.push(deletedCategory);
        }
        if (deletedCategories.length === ids.length) {
            return res.status(200).json({ message: "Categories removed" })
        }
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
            type: cat.type,
            children: createCategory(categories, cat._id)
        })
    }

    return categoryList;
};