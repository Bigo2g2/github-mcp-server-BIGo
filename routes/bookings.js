const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Booking, User, Photographer } = require('../models');
const { authMiddleware } = require('../middleware/auth');

// Validation middleware
const bookingValidation = [
  body('photographerId').isInt().withMessage('Valid photographer ID is required'),
  body('packageName').notEmpty().withMessage('Package name is required'),
  body('packagePrice').isFloat({ min: 0 }).withMessage('Valid package price is required'),
  body('bookingDate').isISO8601().withMessage('Valid booking date is required')
];

// Create booking
router.post('/', authMiddleware, bookingValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { photographerId, packageName, packagePrice, bookingDate, notes } = req.body;
    const userId = req.user.id;

    // Verify photographer exists
    const photographer = await Photographer.findByPk(photographerId);
    if (!photographer) {
      return res.status(404).json({ error: 'Photographer not found' });
    }

    const booking = await Booking.create({
      userId,
      photographerId,
      packageName,
      packagePrice,
      bookingDate,
      notes
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get user's bookings
router.get('/my-bookings', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.findAll({
      where: { userId },
      include: [
        {
          model: Photographer,
          as: 'photographer',
          attributes: ['id', 'name', 'email', 'portfolioUrl']
        }
      ],
      order: [['bookingDate', 'DESC']]
    });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Update booking status
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Verify user owns the booking or is the photographer
    if (booking.userId !== req.user.id && booking.photographerId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// Cancel booking
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Verify user owns the booking
    if (booking.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Only allow cancellation of pending bookings
    if (booking.status !== 'pending') {
      return res.status(400).json({ error: 'Cannot cancel confirmed bookings' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

module.exports = router;