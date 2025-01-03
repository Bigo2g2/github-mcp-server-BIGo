const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { Photographer } = require('../../models');

// Validation middleware
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('portfolioUrl').optional().isURL().withMessage('Must be a valid URL')
];

// Photographer registration
router.post('/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, portfolioUrl } = req.body;

    // Check if photographer already exists
    const existingPhotographer = await Photographer.findOne({ where: { email } });
    if (existingPhotographer) {
      return res.status(400).json({ error: 'Photographer already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create photographer
    const photographer = await Photographer.create({
      name,
      email,
      password: hashedPassword,
      portfolioUrl
    });

    // Generate token
    const token = jwt.sign(
      { id: photographer.id, email: photographer.email, role: 'photographer' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Photographer registered successfully',
      token,
      photographer: {
        id: photographer.id,
        name: photographer.name,
        email: photographer.email,
        portfolioUrl: photographer.portfolioUrl
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;