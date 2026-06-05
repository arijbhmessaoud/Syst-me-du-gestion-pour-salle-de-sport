const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // tu peux plus tard hasher avec bcrypt
});

module.exports = mongoose.model('Admin', adminSchema);
