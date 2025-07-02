const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/authController');

router.post('/signup', signup); // for signing up 
router.post('/signin', signin); // for signing in 

module.exports = router;