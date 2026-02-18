const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { createHmac, randomBytes } = require('crypto');
const { createTokenForUser } = require('../services/authentication');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false, // Don't return password by default
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const salt = randomBytes(16).toString('hex');
  const hashedPassword = createHmac('sha256', salt)
    .update(user.password)
    .digest('hex');

  this.salt = salt;
  this.password = hashedPassword;
  next();
});

// Static method to match password and generate token
userSchema.statics.matchPasswordAndGenerateToken = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) throw new Error("User not found!");

  const salt = user.salt;
  const hashedPassword = user.password;

  // Check if it's an HMAC hash (requires salt) or old bcrypt hash
  if (salt) {
    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== userProvidedHash) throw new Error("Incorrect password");
  } else {
    // Backward compatibility for bcrypt
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) throw new Error("Incorrect password");

    // Auto-migrate to HMAC on next save if needed
    user.password = password;
    await user.save();
  }

  return createTokenForUser(user);
};

module.exports = mongoose.model('User', userSchema);
