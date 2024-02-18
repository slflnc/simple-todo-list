const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Route for user registration
router.post('/register', usersController.registerUser);

// Route for user login
router.post('/login', usersController.loginUser);

module.exports = router;
