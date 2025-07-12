const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes will be added later
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Smart Permit Tracker API' });
});

module.exports = app;