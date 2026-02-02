const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables immediately
dotenv.config();

const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const watchRoutes = require('./routes/watches');
const subscribeRoutes = require('./routes/subscribe');
const { errorHandler } = require('./middleware/error');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/watches', watchRoutes);
app.use('/api/subscribe', subscribeRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Pre-See-Jan API is running...');
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err, promise) => {
      console.log(`Error: ${err.message}`);
      // Close server & exit process
      server.close(() => process.exit(1));
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.log(`Error: ${err.message}`);
      server.close(() => process.exit(1));
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
