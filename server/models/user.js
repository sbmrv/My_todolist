const mongoose = require('mongoose');
const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model('z_user', userModel);
module.exports = User;

