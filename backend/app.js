const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const permitRoutes = require('./routes/permit');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api', permitRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Smart Permit Tracker API' });
});

module.exports = app;