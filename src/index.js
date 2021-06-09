require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authUser');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/products');
const app = express();

//express middlewares
app.use(express.json());

//db configuration
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => console.log("Database Connected")).catch(err => console.log(err));

//routes middlewares
app.use('/ecommerce/api', authRoutes);
app.use('/ecommerce/api', adminRoutes);
app.use('/ecommerce/api', categoryRoutes);
app.use('/ecommerce/api', productRoutes);


//listening to server
app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});