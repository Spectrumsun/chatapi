import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const userSchema = mongoose.Schema({
  username: {
    type: String,
    tri: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  sex: {
    type: String,
    lowercase: true,
    required: true
  },
  lanuguage: {
    type: String,
    lowercase: true,
    required: true
  },
  hash_password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};


module.exports = mongoose.model('User', userSchema);

