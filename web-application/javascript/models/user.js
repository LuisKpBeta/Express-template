const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  resetToken: String,
  resetTokenExpiration: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);