const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const cookieParser = require('cookie-parser');

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
app.use(cookieParser());

// ---------------- API Routes ----------------
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/watches', watchRoutes);
app.use('/api/subscribe', subscribeRoutes);

// ---------------- Serve Frontend (Vite build) ----------------
const distPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(distPath));

// SPA fallback for Express v5 (IMPORTANT)
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(path.join(distPath, 'index.html'));
});

// ---------------- Error Handler (LAST) ----------------
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// ---------------- DB + Server ----------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    process.on('unhandledRejection', (err) => {
      console.error(`Unhandled Rejection: ${err.message}`);
      server.close(() => process.exit(1));
    });

    process.on('uncaughtException', (err) => {
      console.error(`Uncaught Exception: ${err.message}`);
      server.close(() => process.exit(1));
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
