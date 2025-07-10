const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config();
const connectDB = require('../src/db');
const cors = require('cors');

const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const productRoute = require('./routes/product');
const resetPasswordRoutes = require('./routes/resetPassword');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

//routes listed here
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoute);
app.use('/api', dashboardRoute);
app.use('/api/products', productRoute);
app.use('/api', resetPasswordRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
