const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  deleteBooking,
  updateBooking
} = require('../controllers/bookingController');

const authMiddleware = require('../middleware/authMiddleware'); // if created

router.post('/', createBooking);
router.get('/', authMiddleware, getAllBookings); // Admin only
router.delete('/:id', authMiddleware, deleteBooking); // Admin only
router.put('/:id', authMiddleware, updateBooking);

module.exports = router;
