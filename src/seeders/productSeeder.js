const mongoose = require('mongoose');
const Product = require('../models/Product');

const categories = ['Electronics', 'Books', 'Clothing', 'Home', 'Beauty'];

const generateDummyProducts = () => {
  const products = [];

  for (let i = 1; i <= 50; i++) {
    products.push({
      name: `Product ${i}`,
      description: `This is the description for product ${i}.`,
      price: Math.floor(Math.random() * 5000) + 100,
      category: categories[Math.floor(Math.random() * categories.length)],
      stockQuantity: Math.floor(Math.random() * 100) + 1,
    });
  }

  return products;
};

const seedProducts = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }

    // ✅ Connect fresh
    await mongoose.connect('mongodb://localhost:27017/user');

    const dummyData = generateDummyProducts();
    await Product.insertMany(dummyData);

    console.log('✅ Inserted 50 dummy products!');
    await mongoose.disconnect(); // Gracefully close the connection
    process.exit();
  } catch (err) {
    console.error('❌ Error inserting dummy products:', err);
    process.exit(1);
  }
};

seedProducts();
