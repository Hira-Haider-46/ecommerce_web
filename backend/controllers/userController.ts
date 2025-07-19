import type { Request, Response } from "express";
import userModel from "../models/userModel.ts";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id: string) => {
  const secret = process.env.JWT_SECRET;
  if (secret) {
    return jwt.sign({ id }, secret, { expiresIn: "3d" });
  }
  throw new Error("JWT secret is not defined");
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.json({ success: false, message: "User dont exists" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.json({ success: false, message: error.message });
    } else {
      res.json({ success: false, message: "An unknown error occurred" });
    }
  }
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });

    if (exists) {
      res.status(409).json({ success: false, message: "User already exists" });
      return;
    }

    if (!validator.isEmail(email)) {
      res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });

    const user = await newUser.save();

    const token = createToken(user._id.toString());

    res.status(201).json({ success: true, token });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ success: false, message: err.message });
    } else {
      res
        .status(500)
        .json({ success: false, message: "An unknown error occurred" });
    }
  }
};

const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const secret = process.env.JWT_SECRET
        ? process.env.JWT_SECRET
        : "fnherugeyvcb";
      const token = jwt.sign({ email }, secret, { expiresIn: "3d" });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

export { loginUser, registerUser, adminLogin };
