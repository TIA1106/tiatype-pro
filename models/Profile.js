const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  username: String,
  bio: String,
  profilePicUrl: String,
});

module.exports = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
