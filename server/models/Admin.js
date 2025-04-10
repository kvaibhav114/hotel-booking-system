// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: String,
  password: String, // store hashed password
});

module.exports = mongoose.model('Admin', adminSchema);
