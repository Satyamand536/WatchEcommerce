const JWT = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "$perumanu@123";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    name: user.name || user.fullName,
    email: user.email,
    role: user.role,
  };
  
  const token = JWT.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
  return token;
}

function validateToken(token) {
  try {
    const payload = JWT.verify(token, secret);
    return payload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

module.exports = {
  createTokenForUser,
  validateToken,
};
