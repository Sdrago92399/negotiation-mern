const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: {type: String},
  role: { type: String, enum: ['buyer', 'seller'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

