const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Organization = require("../models/Organization");
const Settings = require("../models/Settings");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const signup = async (req, res) => {
  try {
    const { email, password, organizationName } = req.body;

    console.log("Signup body:", req.body);

    if (!email || !password || !organizationName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const organization = await Organization.create({
      name: organizationName,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      organizationId: organization._id,
    });

    await Settings.create({
      organizationId: organization._id,
      defaultLowStockThreshold: 5,
    });

    res.status(201).json({
      message: "Signup successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        email: user.email,
        organizationId: user.organizationId,
      },
    });
  } catch (error) {
    console.error("Signup error full:", error);
    res.status(500).json({
      message: "Server error during signup",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login body:", req.body);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        email: user.email,
        organizationId: user.organizationId,
      },
    });
  } catch (error) {
    console.error("Login error full:", error);
    res.status(500).json({
      message: "Server error during login",
      error: error.message,
    });
  }
};

module.exports = { signup, login };