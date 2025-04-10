// seed/seedAdmin.js
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await Admin.create({ username: 'admin', password: hashedPassword });
  console.log('Admin seeded');
  process.exit();
};

seedAdmin();
