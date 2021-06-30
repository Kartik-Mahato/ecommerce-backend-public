const Page = require('../../models/Page');

exports.createPage = async (req, res) => {
    try {
        const { banners, products } = req.files;
        if (banners && banners.length > 0) {
            req.body.banners = banners.map((banner) => ({
                img: `/public/${banner.filename}`,
                navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
            }))
        }
        if (products && products.length > 0) {
            req.body.products = products.map((product) => ({
                img: `/public/${product.filename}`,
                navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
            }))
        }
        req.body.createdBy = req.user._id;

        const isPageAlreadyExists = await Page.findOne({ category: req.body.category })

        if (isPageAlreadyExists) {
            const updatedPage = await Page.findOneAndUpdate({ category: req.body.category }, req.body);
            if (updatedPage) {
                return res.status(201).json({ updatedPage });
            } else {
                return res.status(500).json({ error: error.message });
            }
        } else {
            const page = new Page(req.body);
            await page.save();

            return res.status(201).json({ page });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.getPage = async (req, res) => {
    const { category, type } = req.params;
    try {
        if (type === 'page') {
            const page = await Page.findOne({ category: category });
            if (page) {
                return res.status(200).json({ page });
            } else {
                return res.status(404).json({ message: 'Page Not Found' });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}