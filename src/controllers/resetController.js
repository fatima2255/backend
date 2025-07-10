const {
  handleForgotPassword,
  handleResetPassword
} = require('../services/resetService');

exports.forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await handleForgotPassword(email);
    return res.status(200).json({ message: result });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

exports.resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const result = await handleResetPassword(token, password);
    return res.status(200).json({ message: result });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};
