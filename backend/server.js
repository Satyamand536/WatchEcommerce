const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

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

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/watches', watchRoutes);
app.use('/api/subscribe', subscribeRoutes);

// ✅ Serve frontend build (VERY IMPORTANT ORDER)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// ❗ Error handler AFTER routes
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// DB + Server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    const server = app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );

    process.on('unhandledRejection', (err) => {
      console.log(`Error: ${err.message}`);
      server.close(() => process.exit(1));
    });

    process.on('uncaughtException', (err) => {
      console.log(`Error: ${err.message}`);
      server.close(() => process.exit(1));
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
