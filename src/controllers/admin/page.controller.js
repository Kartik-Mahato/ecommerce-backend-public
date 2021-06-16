const Page = require('../../models/Page');

exports.createPage = async (req, res) => {
    try {
        const { banners, products } = req.files;
        if (banners.length > 0) {
            req.body.banners = banners.map((banner) => ({
                img: `${process.env.API}public/${banner.filename}`,
                navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
            }))
        } else {
            return res.status(500).json({ message: 'Banner Array should not be empty' })
        }
        if (products.length > 0) {
            req.body.products = products.map((product) => ({
                img: `${process.env.API}public/${product.filename}`,
                navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
            }))
        } else {
            return res.status(500).json({ message: 'Products Array should not be empty' })
        }
        req.body.createdBy = req.user._id;
        const page = new Page(req.body);
        await page.save();

        res.status(201).json({ page });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
