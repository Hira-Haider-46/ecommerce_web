import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.json({ success: false, message: "No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];

    const token_decode = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { email?: string; id?: string };

    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      res.json({ success: false, message: "Not authorized" });
      return;
    }

    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;