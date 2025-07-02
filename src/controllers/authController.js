const { registerUser, loginUser } = require('../services/authService');
const { signupSchema } = require('../validations/authValidations');

const signup = async (req, res) => {
  
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  
  try {
    const tokens = await registerUser(req.body);

    res.status(201).json({
      message: 'User registered successfully',
      ...tokens
    });
  } catch (error) {
    console.error('Signup Error:', error.message);
    const status = error.message === 'User already exists' ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const tokens = await loginUser(req.body);

    res.status(200).json({
      message: 'Login successful',
      ...tokens
    });
  } catch (error) {
    console.error('Signin Error:', error.message);
    const status = error.message === 'Invalid credentials' ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

module.exports = {
  signup,
  signin
};
