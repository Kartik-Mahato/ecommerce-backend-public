require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authUser');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const app = express();

//express middlewares
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));

//db configuration
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("Database Connected")).catch(err => console.log(err));

//routes middlewares
app.use('/ecommerce/api', authRoutes);
app.use('/ecommerce/api', adminRoutes);
app.use('/ecommerce/api', categoryRoutes);
app.use('/ecommerce/api', productRoutes);
app.use('/ecommerce/api', cartRoutes);
//listening to server
app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});