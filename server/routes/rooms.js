const express = require('express');
const router = express.Router();
const { getAllRooms, getRoomById } = require('../controllers/roomController');

router.get('/', getAllRooms);         // GET /api/rooms
router.get('/:id', getRoomById);      // GET /api/rooms/:id

module.exports = router;
