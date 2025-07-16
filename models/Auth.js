const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true }
});

module.exports = mongoose.models.Auth || mongoose.model("Auth", AuthSchema);
