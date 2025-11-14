//backend/routes/authRoutes.js


import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import xss from "xss";

const router = express.Router();

/**
 * REGISTER ROUTE
 * Validations:
 * - Name: required, 3-30 chars
 * - Email: valid email
 * - Password: min 8 chars, at least 1 uppercase, 1 lowercase, 1 number
 * Sanitization applied for XSS
 */
router.post(
  "/register",
  [
    body("name")
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("Name must be 3-30 characters long")
      .customSanitizer((value) => xss(value)),
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail()
      .customSanitizer((value) => xss(value)),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .customSanitizer((value) => xss(value)),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return first validation error
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(409).json({ message: "Email already registered" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Registration failed" });
    }
  }
);

/**
 * LOGIN ROUTE
 * Validations:
 * - Email: must be valid format
 * - Password: required
 */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Login failed" });
    }
  }
);

export default router;
