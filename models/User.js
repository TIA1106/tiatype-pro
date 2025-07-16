const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  bio: String,
});


module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
