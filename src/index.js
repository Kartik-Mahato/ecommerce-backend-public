require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authUser');
const adminRoutes = require('./routes/admin/auth');
const initialData = require('./routes/admin/initialData');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const cors = require('cors');
const app = express();

//express middlewares
app.use(express.json());
app.use(cors());

//db configuration
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("Database Connected")).catch(err => console.log(err));

//routes middlewares
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/ecommerce/api', authRoutes);
app.use('/ecommerce/api', adminRoutes);
app.use('/ecommerce/api', categoryRoutes);
app.use('/ecommerce/api', productRoutes);
app.use('/ecommerce/api', cartRoutes);
app.use('/ecommerce/api', initialData);
//listening to server
app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});