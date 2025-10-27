const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productsRoute = require('./routes/products');
const authRoute = require('./routes/auth');
const ordersRoute = require('./routes/orders');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));

connectDB();

app.use('/api/products', productsRoute);
app.use('/api/auth', authRoute);
app.use('/api/orders', ordersRoute);

app.get('/', (req, res) => res.send('Ecommerce API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
