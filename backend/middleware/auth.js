const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateToken } = require('../services/authentication');
const { decryptCookie } = require('../utils/crypto');

const protect = async (req, res, next) => {
  let token;

  // Check for token in cookies first
  if (req.cookies && req.cookies.token) {
    token = decryptCookie(req.cookies.token);
  } 
  // Then check Authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    // Verify token
    const decoded = validateToken(token);

    // Get user from the token
    req.user = await User.findById(decoded._id).select('-password');
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
    }

    next();
  } catch (error) {
    console.error('Auth protect error:', error.message);
    res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

function checkForAuthenticationCookie(cookieName) {
  return async (req, res, next) => {
    let tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      // Decrypt cookie
      const decryptedToken = decryptCookie(tokenCookieValue);
      const payload = validateToken(decryptedToken);
      const user = await User.findById(payload._id);
      if (user) {
        req.user = user;
      }
    } catch (error) {
      console.error('Auth error:', error.message);
    }
    next();
  };
}

module.exports = { protect, authorize, checkForAuthenticationCookie };
