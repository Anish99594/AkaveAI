const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();
require('dotenv').config();

// Debug akavecli availability
const { execSync } = require('child_process');
try {
  const akavecliPath = execSync('which akavecli').toString().trim();
  console.log('akavecli found at:', akavecliPath);
} catch (e) {
  console.error('akavecli not found in PATH:', e.message);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));