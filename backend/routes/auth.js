const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { validateToken } = require('../services/authentication');
const { publicKey, decryptPassword, encryptCookie } = require('../utils/crypto');

// ----------------------------
// RSA PUBLIC KEY ENDPOINT
// ----------------------------
router.get("/public-key", (req, res) => {
  res.json({ publicKey });
});

// ----------------------------
// VALIDATION REGEX
// ----------------------------
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// ----------------------------
// EMAIL CHECK
// ----------------------------
router.get("/check-email", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: "Email required" });

    if (!emailRegex.test(email))
      return res.status(400).json({ error: "Invalid email format" });

    const user = await User.findOne({ email: email.toLowerCase() });
    res.json({ exists: !!user });
  } catch (err) {
    console.error("Email check error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ----------------------------
// SIGNUP
// ----------------------------
router.post('/signup', async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    // Handle obfuscated payload from frontend
    if (req.body.d) {
      try {
        const decoded = JSON.parse(Buffer.from(req.body.d, 'base64').toString());
        name = decoded.name;
        email = decoded.email;
        password = decoded.password;
      } catch (e) {
        return res.status(400).json({ error: "Invalid protocol data" });
      }
    }

    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields required" });

    // RSA Decryption for Password
    try {
      password = decryptPassword(password);
    } catch (err) {
      return res.status(400).json({ error: "Identity verification failed (Decryption)" });
    }

    if (name.trim().length < 3)
      return res.status(400).json({ error: "Name must be at least 3 characters" });

    if (!emailRegex.test(email))
      return res.status(400).json({ error: "Invalid email format" });

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: "Password must be 8+ chars, include uppercase, lowercase, number & special char",
      });
    }

    const normalizedEmail = email.toLowerCase();
    
    // ⛔ BLOCKED PATTERNS
    if (normalizedEmail.includes("testuser") || name.toLowerCase().includes("testuser")) {
      return res.status(400).json({ error: "Registration with 'testuser' patterns is not allowed." });
    }
    if (password === "password@123") {
      return res.status(400).json({ error: "This password is too common and not allowed." });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser)
      return res.status(409).json({ error: "User already exists" });

    const user = new User({
      name,
      email: normalizedEmail,
      password,
    });

    await user.save();

    return res.status(201).json({ 
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
});

// ----------------------------
// LOGIN
// ----------------------------
router.post('/login', async (req, res, next) => {
  let { email, password } = req.body;

  // Handle obfuscated payload from frontend
  if (req.body.d) {
    try {
      const decoded = JSON.parse(Buffer.from(req.body.d, 'base64').toString());
      email = decoded.email;
      password = decoded.password;
    } catch (e) {
      return res.status(400).json({ success: false, message: "Invalid protocol data" });
    }
  }

  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password required" });

  try {
    // RSA Decryption for Password
    try {
      password = decryptPassword(password);
    } catch (err) {
      return res.status(400).json({ success: false, message: "Identity verification failed (Decryption)" });
    }

    // Note: User.matchPasswordAndGenerateToken handles both new and old passwords
    const token = await User.matchPasswordAndGenerateToken(
      email.toLowerCase(),
      password
    );

    // Fetch user for response (excluding password)
    const user = await User.findOne({ email: email.toLowerCase() });

    // AES Encrypt Token for Cookie
    const encryptedToken = encryptCookie(token);

    res.cookie("token", encryptedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.json({
      success: true,
      message: "Signin successful",
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role
      },
    });
  } catch (err) {
    if (err.message === "User not found!" || err.message === "User not found") {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (err.message === "Incorrect password") {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }
    next(err);
  }
});

// ----------------------------
// CHECK LOGIN
// ----------------------------
router.get("/check-login", async (req, res) => {
  try {
    return res.json({
      loggedIn: !!req.user,
      user: req.user ? { 
        id: req.user._id,
        name: req.user.name, 
        email: req.user.email,
        role: req.user.role
      } : null,
    });
  } catch (err) {
    return res.status(401).json({ loggedIn: false });
  }
});

// ----------------------------
// LOGOUT
// ----------------------------
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ success: true, message: "Logged out successfully" });
});

module.exports = router;
