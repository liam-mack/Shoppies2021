const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;
const Movie = require("./movie").schema;

// Define user object paramaters
const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  nominations: [Movie],
  nominationCount: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.addNom = function() {
  this.nominationCount +=1;
  return this.nominationCount;
}

userSchema.methods.removeNom = function() {
  this.nominationCount -=1;
  return this.nominationCount;
}

// "Hooks" to perform before saving to hash password using bcrypt
userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

const Model = mongoose.model('User', userSchema);

module.exports = Model;
