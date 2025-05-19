import { Request, Response } from "express";
import userModel from "../models/userModel";
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
  res.status(200).json({ msg: "login api working" });
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 8 characters long",
        });
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
  res.status(200).json({ msg: "admin login api working" });
};

export { loginUser, registerUser, adminLogin };