const express = require('express');
const path = require('path');
const { connectDB } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const frontendRoutes = require('./routes/frontendRoutes');
const scoreRoutes = require('./routes/scoreRoutes');

const submissionsRoutes = require('./routes/submissionsRoutes');
const questionsRoutes = require('./routes/questionRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to database
connectDB();

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/scores', scoreRoutes);

app.use('/api/submissions', submissionsRoutes);
app.use('/api/questions', questionsRoutes);

// Frontend Routes
app.use('/', frontendRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'Frontend')));

// Start the server
const PORT = process.env.PORT || 9009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));