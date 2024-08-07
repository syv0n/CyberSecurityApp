const express = require('express');
const path = require('path');

const router = express.Router();

// Define routes for HTML files
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend', 'signup.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend', 'login.html'));
});

router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend', 'dashboard.html'));
});

module.exports = router;
