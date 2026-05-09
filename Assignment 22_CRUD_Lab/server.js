const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/product.routes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware — parse incoming JSON bodies
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Root health check
app.get('/', (req, res) => {
  res.json({ message: 'CRUD Lab API is running 🚀' });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
