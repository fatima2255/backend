const express = require('express');
const router = express.Router();
const {
  forgotPasswordController,
  resetPasswordController
} = require('../controllers/resetController');

router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password/:token', resetPasswordController);

module.exports = router;