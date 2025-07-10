const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const sendEmail = require('../utils/mail');

exports.handleForgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('No user found with this email address');
    error.statusCode = 404;
    throw error;
  }

  const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const link = `${process.env.CLIENT_URL}/reset-password/${token}`;

  await sendEmail(
    user.email,
    'Reset Your Password',
    `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${link}">${link}</a></p><p>This link will expire in 15 minutes.</p>`
  );

  return 'Reset link sent to your registered email address';
};

exports.handleResetPassword = async (token, password) => {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    const error = new Error('Invalid or expired token');
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

  return 'Password updated successfully';
};
